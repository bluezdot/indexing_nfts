const {excuteQuery} = require("../query.js");

// INPUT ADDRESS // 
const ADDRESS = '0x69e8d62c3d4002d1226dfccedf148a704f34170b';

query = `SELECT DISTINCT tokenId FROM
(SELECT *, 
COUNT (CASE WHEN (Receiver = '${ADDRESS}') THEN 1 END) OVER (PARTITION BY tokenId) AS receiverA,
COUNT(CASE WHEN (Sender = '${ADDRESS}') THEN 1 END) OVER (PARTITION BY tokenId) AS senderA
FROM Knights) AS bigTable
WHERE (receiverA - senderA = 0) AND ((receiver = '${ADDRESS}') OR (sender = '${ADDRESS}'))`;
excuteQuery(query);