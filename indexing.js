const { ethers } = require("ethers");
const { client } = require("./connecting.js");
const express = require("express");
const app = express();

// openning a port
app.listen(3000, ()=> {
    console.log("Server is listening on port 3000");
})

// convert raw_hex to address/NFTs ID
function hex_to_address(raw_hex) {
    const clean_hex = raw_hex.substring(26,);
    const address = '0x'.concat(clean_hex);
    return address;
}
  
function hex_to_decimal(raw_hex) {
    const clean_hex = raw_hex.substring(2,);
    const decimal = parseInt(clean_hex, 16);
    return decimal
}

async function main() {

    console.log("-- START --");

    const start = 23045358;
    const end = 23050358;
    // var url = "https://1rpc.io/bnb";
    var url = "https://binance.nodereal.io";
    const provider = new ethers.providers.JsonRpcProvider(url);

    // CONFIGURATION //
    // const signer = provider.getSigner('0x06738d9af28053a58ddb92e7026682cbcf364a5fd')
    // const myAddress = await signer.getAddress()
    const knightAddress = "0xa7a9a8156C24C4B0ca910c3bA842D1F1ac7200ef";
    const knightAbi = [
        "function name() view returns (string)",
        "event Transfer(address,address,uint256)"
    ];
    const knightContract = new ethers.Contract(knightAddress, knightAbi, provider);

    // QUERY STATEMENT //
    // blockNumber = await provider.getBlockNumber();
    // balance = await provider.getBalance("0x6e143f784Cb160f10966096AB2aC4207D633d5d7");
    filter = knightContract.filters.Transfer(null, null); // filter all addresses to all addresses
    ev_query = await knightContract.queryFilter(filter, start, end);

    // LOGGING //
    // console.log(blockNumber);
    // console.log(ethers.utils.formatEther(balance));
    console.log(ev_query);
    console.log(`number of transfer from ${start} to ${end}: ${Object.keys(ev_query).length}`);

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