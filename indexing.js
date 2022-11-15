const { ethers } = require("ethers");

async function main() {

    console.log("-- START --");

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
    blockNumber = await provider.getBlockNumber();
    // balance = await provider.getBalance("0x6e143f784Cb160f10966096AB2aC4207D633d5d7");
    filter = knightContract.filters.Transfer(null, null); // filter all addresses to all addresses
    query = await knightContract.queryFilter(filter, 23072034, 23077034);

    // LOGGING //
    console.log(blockNumber);
    console.log(ethers.utils.formatEther(balance));
    console.log(query[1]);
    console.log(Object.keys(query).length);

    console.log("-- END --");

}

main();