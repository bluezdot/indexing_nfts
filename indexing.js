const { ethers } = require("ethers");
const express = require("express");
const app = express();
const {hex_to_address, hex_to_decimal } = require("../typeConvert.js");
const {excuteQuery} = require("./query.js");
require('dotenv').config();

// OPEN A PORT //
app.listen(3000, ()=> {
    console.log("Server is listening on port 3000");
})

// CREATE TABLE //
createTableQuery = `CREATE TABLE Knights (
	transactionHash varchar,
	sender varchar,
	receiver varchar,
	blockNumber int,
	blockHash varchar,
	logIndex int,
	removed bool,
	PRIMARY KEY(transactionHash)
)`;

excuteQuery(createTableQuery);

async function main() {

    console.log("-- START --");

    // var url = "https://1rpc.io/bnb";
    var url = process.env.NODE;
    const provider = new ethers.providers.JsonRpcProvider(url);

    // CONFIGURATION //
    const knightAddress = process.env.KNIGHT_CONTRACT;
    const knightAbi = process.env.KNIGHT_ABI;
    const knightContract = new ethers.Contract(knightAddress, knightAbi, provider);

    // LOGGING //
    const numBlock = await provider.getBlockNumber();
    console.log(`Number block: ${blockNumber}`);
    console.log(process.env.KNIGHT_CONTRACT);
    const numBatch = (numBlock - (numBlock % 5000))/5000;

    // QUERY STATEMENT //
    filter = knightContract.filters.Transfer(null, null); // filter all addresses to all addresses
    for (let batch = 0; batch < numBatch + 1; batch++) {
        const start = 5000 * batch;
        const end = start + 5000;
        ev_query = await knightContract.queryFilter(filter, start, end);
        
        // LOGGING BATCH INFORMATION
        const numTransaction = Object.keys(ev_query).length;
        console.log(`number of transfer from ${start} to ${end}: ${numTransaction}`);

        // WRITE TO DATABASE 
        for (let trans = 0; trans < numTransaction + 1; trans++) {
            data = ev_query[trans];
            transactionHash = data.transactionHash;
            sender = data.topics[1];
            receiver = data.topics[2];
            blockNumber = data.blockNumber;
            blockHash = data.blockHash;
            logIndex = data.logIndex;
            removed = data.removed;
            writeQuery = `INSERT INTO Knights
                          VALUES (${transactionHash}, ${sender}, ${receiver}, ${blockNumber}, ${blockHash}, ${logIndex}, ${removed})`;
            excuteQuery(writeQuery);
        }
    }

    
    


    // connecting to database
    // client.connect()
    // db_query = "CREATE TABLE test (id int, name varchar, age int)"
    // client.query(db_query, (err, res) => {
    // if (!err) {
    //     console.log(res.rows);
    // } else {
    //     console.log("Error occur: " + err.message)
    // }
    // client.end
    // })

    console.log("-- END --");

}

main();