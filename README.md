# indexing_nfts
You have to create .env file with these variables: HOST, DATABASE, PORT, USER, PASSWORD, KNIGHT_CONTRACT, KNIGHT_ABI, NODE, START_BATCH, LOG_PATH

## STAGE 1: INDEXING

0. Tạo Table
createTableQuery = `CREATE TABLE IF NOT EXISTS Knights (
	transactionHash varchar,
	sender varchar,
	receiver varchar,
  tokenId bigint,
	blockNumber bigint,
	blockHash varchar,
	logIndex int,
	removed bool,
	PRIMARY KEY(transactionHash)
)`;

1. query num_block

2. xác định số batch
num_batch = num_block // 5000

3. Loop query
for i in range (num_batch):
	start = 5000*i
	end = start + 5000
	do sthing

start = 5000 * (num_block // 5000)
end = num_block + 1
do sthing

4.  

## STAGE 2: QUERYING
Cho 1 địa chỉ ví A. Hỏi người đấy có những NFT FaraLand nào ?

1. Query tất cả Transfer có sender hoặc receiver là địa chỉ A
SELECT * FROM Knights 
WHERE sender == A OR receiver == A

2. List NFTs khả thi là A đang sở hữu: 
Select distict tokenId from (1)

3. NFTs hiện sỡ hữu:
For nft in tokenId:
If [count(receiver = A) - count(sender = A)] = 1:
=> A sở hữu nft.

