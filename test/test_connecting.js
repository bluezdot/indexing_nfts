const pg = require("pg");
require('dotenv').config();

const pool = new pg.Pool({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  password: process.env.PASSWORD,
  database: 'postgres'
});

function excuteQuery(query) {
    pool.connect(function(err, client, done) {
        if(err) {
          return console.error('connection error', err);
        }
        client.query(query, function(err, result) {
          done();
          if(err) {
            return console.error('error running query', err.message);
          }
          console.log(result.rows)
        });
    });
}

transactionHash = 'abc';
sender = 'bcd';
receiver = 'cde';
tokenId = 213;
blockNumber = 4312;
blockHash = 'cdaassv';
logIndex = 123;
removed = true;

query = `INSERT INTO Knights
        VALUES ('${transactionHash}', '${sender}', '${receiver}', ${tokenId}, ${blockNumber}, '${blockHash}', ${logIndex}, ${removed})`;

excuteQuery(query)

module.exports = {excuteQuery};