const { ethers } = require("ethers");
const { excuteQuery } = require("./query.js");
const {hex_to_address, hex_to_decimal} = require("./typeConvert.js");
const myLogger = require("/Savage/indexing_nfts/logging/logger.js");
require('dotenv').config();

// OPEN A PORT //
// app.listen(3000, ()=> {
//     myLogger.log("Server is listening on port 3000");
// })

// CREATE TABLE //
createTableQuery = `CREATE TABLE IF NOT EXISTS Knights (
	transactionHash varchar,
	sender varchar,
	receiver varchar,
  tokenId bigint,
	blockNumber int,
	blockHash varchar,
	logIndex int,
	removed bool,
	PRIMARY KEY(transactionHash, logIndex)
)`;
myLogger.log("Creating Table")
excuteQuery(createTableQuery);

async function main() {

    myLogger.log("-- START --");
    // var url = "https://1rpc.io/bnb";
    var url = process.env.NODE;
    const provider = new ethers.providers.JsonRpcProvider(url);
    
    // CONFIGURATION //
    const knightAddress = process.env.KNIGHT_CONTRACT;
    const knightAbi = process.env.KNIGHT_ABI;
    const knightContract = new ethers.Contract(knightAddress, knightAbi, provider);

    // LOGGING //
    const numBlock = await provider.getBlockNumber();
    myLogger.log(`Number block: ${numBlock}`);
    myLogger.log(`NFTs address: ${process.env.KNIGHT_CONTRACT}`);
    const numBatch = (numBlock - (numBlock % 5000))/5000;

    // QUERY STATEMENT //
    filter = knightContract.filters.Transfer(null, null); // filter all addresses to all addresses
    for (let batch = process.env.START_BATCH; batch < numBatch + 1; batch++) {
        start = 5000 * batch;
        end = start + 5000;
        if (batch == numBatch) {
            end = numBlock + 1;
        }
        ev_query = await knightContract.queryFilter(filter, start, end);
        // LOGGING BATCH INFORMATION
        const numTransaction = Object.keys(ev_query).length;
        myLogger.log(`number of transfer from ${start} to ${end}: ${numTransaction}`);

        // WRITE TO DATABASE
        if (numTransaction) {
          for (let trans = 0; trans < numTransaction; trans++) {
            data = ev_query[trans];
            transactionHash = data.transactionHash;
            sender = hex_to_address(data.topics[1]);
            receiver = hex_to_address(data.topics[2]);
            tokenId = hex_to_decimal(data.topics[3]);
            blockNumber = data.blockNumber;
            blockHash = data.blockHash;
            logIndex = data.logIndex;
            removed = data.removed;
            writeQuery = `INSERT INTO Knights
                          VALUES ('${transactionHash}', '${sender}', '${receiver}', ${tokenId}, ${blockNumber}, '${blockHash}', ${logIndex}, ${removed})`;
            myLogger.log(`Add Transfer with (transactionHash - logIndex): (${transactionHash} - ${logIndex})`)
            excuteQuery(writeQuery);
          }
        }
      }
    myLogger.log("-- END --");

}

main();