const { Console } = require("console");
const fs = require("fs");
require('dotenv').config();

const myLogger = new Console({
  stdout: fs.createWriteStream(process.env.LOG_PATH),
  stderr: fs.createWriteStream("./logging/errLog.txt"),
});

module.exports = myLogger;