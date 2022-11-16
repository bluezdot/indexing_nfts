# indexing_nfts

## flow 

0. Tạo Table
CREATE TABLE Knights (
	transactionHash varchar,
	sender varchar,
	receiver varchar,
	tokenId int,
	blockNumber int,
	blockHash varchar,
	logIndex int,
	removed bool,
	PRIMARY KEY(transactionHash)
);

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