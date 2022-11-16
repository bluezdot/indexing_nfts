const { Console } = require("console");
const fs = require("fs");

const myLogger = new Console({
  stdout: fs.createWriteStream("./logging/norLog.txt"),
  stderr: fs.createWriteStream("./logging/errLog.txt"),
});

module.exports = myLogger;