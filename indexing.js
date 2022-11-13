const { ethers } = require("ethers");

async function main() {

    console.log("-- START --");

    var url = "https://bsc-dataseed4.binance.org";
    const provider = new ethers.providers.JsonRpcProvider(url);

    myAddress = await signer.getAddress('0x06738d9af28053a58ddb92e7026682cbcf364a5fd')
    const knightAddress = "0xa7a9a8156C24C4B0ca910c3bA842D1F1ac7200ef";
    const knightAbi = [
        "function name() view returns (string)",
        "event Transfer(address,address,uint256)"
    ];
    const knightContract = new ethers.Contract(knightAddress, knightAbi, provider);

    blockNumber = await provider.getBlockNumber();
    balance = await provider.getBalance("0x6e143f784Cb160f10966096AB2aC4207D633d5d7");
    filter = knightContract.filters.Transfer(myAddress, null);
    // query = await knightContract.queryFilter(filter);

    console.log(blockNumber);
    console.log(ethers.utils.formatEther(balance));
    console.log(query);

    console.log("-- END --");

}

main();