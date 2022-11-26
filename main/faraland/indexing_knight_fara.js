const { ethers } = require("ethers");
const { excuteQuery } = require("../../query/query.js");
const myLogger = require("/Savage/indexing_nfts/logging/logger.js");
require('dotenv').config();

// CREATE TABLE //
createTableQuery = `CREATE TABLE IF NOT EXISTS Knight_fara (
	transactionHash varchar,
	logIndex bigint,
	sender varchar,
  receiver varchar,
  value bigint,
  PRIMARY KEY(transactionHash, logIndex)
)`;
myLogger.log("Creating Table")
excuteQuery(createTableQuery);

async function main() {

    myLogger.log("-- START --");
    var url = process.env.NODE;
    const provider = new ethers.providers.JsonRpcProvider(url);
    
    // CONFIGURATION //
    const nftAddress = process.env.KNIGHT_CONTRACT;
    const nftAbi = process.env.KNIGHT_ABI_NFT;
    const nftContract = new ethers.Contract(nftAddress, nftAbi, provider);

    const tokenAddress = process.env.KNIGHT_FARA_CONTRACT;
    const tokenAbi = process.env.KNIGHT_ABI_FARA;
    const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, provider);

    // LOGGING //
    const numBlock = await provider.getBlockNumber();
    myLogger.log(`Number block: ${numBlock}`);
    myLogger.log(`NFTs address: ${process.env.KNIGHT_CONTRACT}`);
    myLogger.log(`Tokens address: ${process.env.KNIGHT_FARA_CONTRACT}`);
    const numBatch = (numBlock - (numBlock % 5000))/5000;

    // QUERY STATEMENT //
    nft_filter = nftContract.filters.Transfer(null, null); // filter all addresses to all addresses
    token_filter = tokenContract.filters.Transfer(null, null);

    for (let batch = process.env.KNIGHT_START_BATCH; batch < numBatch + 1; batch++) {
        start = 5000 * batch;
        end = start + 5000;
        if (batch == numBatch) {
            end = numBlock + 1;
        }
        nft_ev_query = await nftContract.queryFilter(nft_filter, start, end);
        token_ev_query = await tokenContract.queryFilter(token_filter, start, end);
        
        // LOGGING BATCH INFORMATION
        const nft_numTransaction = Object.keys(nft_ev_query).length;
        const token_numTransaction = Object.keys(token_ev_query).length;
        myLogger.log(`number of nfts transfer from ${start} to ${end}: ${nft_numTransaction}`);
        myLogger.log(`number of tokens transfer from ${start} to ${end}: ${token_numTransaction}`);

        // WRITE TO DATABASE
        if (token_numTransaction && nft_numTransaction) {
            for (var i = 0; i < nft_numTransaction; i++) {
                for (var j = 0; j < token_numTransaction; j++) {
                    if (nft_ev_query[i].transactionHash == token_ev_query[j].transactionHash) {
                        transactionHash = token_ev_query[j].transactionHash;
                        logIndex = token_ev_query[j].logIndex;
                        sender = String(token_ev_query[j].args).split(",")[0];
                        receiver = String(token_ev_query[j].args).split(",")[1];
                        value = String(token_ev_query[j].args).split(",")[2]/(10**18);
                        
                        writeQuery = `INSERT INTO Knight_fara
                                      VALUES ('${transactionHash}', ${logIndex}, '${sender}', '${receiver}', ${value})`;
                        myLogger.log(`Add Transfer FARA with (transactionHash - logIndex): (${transactionHash} - ${logIndex})`)
                        excuteQuery(writeQuery);
                    }
                }
            }
          }
        }
    myLogger.log("-- END --");
}

main();