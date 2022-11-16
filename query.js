const pg = require("pg");
const myLogger = require("/Savage/indexing_nfts/logging/logger.js");
require('dotenv').config();

const pool = new pg.Pool({
  host: process.env.HOST,
  user: process.env.USER,
  port: process.env.PORT,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

function excuteQuery(query) {
    pool.connect(function(err, client, done) {
        if(err) {
            myLogger.err('connection error', err)
            return console.error('connection error', err);
        }
        client.query(query, function(err, result) {
            done();
            if(err) {
                myLogger.err('error running query', err)
                return console.error('error running query', err);
            }
        });
    });
}

module.exports = {excuteQuery};