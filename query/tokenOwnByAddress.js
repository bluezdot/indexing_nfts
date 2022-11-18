const {excuteQuery} = require("../query.js");

// INPUT ADDRESS // 
const ADDRESS = '0x83ff6c3e1fb04c5621399b4db9cabc00609d9abf';


query = `SELECT tokenId FROM
(SELECT *, 
COUNT (CASE WHEN (Receiver = '${ADDRESS}') THEN 1 END) OVER (PARTITION BY tokenId) AS receiverA,
COUNT(CASE WHEN (Sender = '${ADDRESS}') THEN 1 END) OVER (PARTITION BY tokenId) AS senderA
FROM Knights) AS bigTable
WHERE (receiverA - senderA >= 1) AND ((receiver = '${ADDRESS}') OR (sender = '${ADDRESS}'))`;
excuteQuery(query);