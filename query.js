const client = require("./connecting");

function excuteQuery(query) {
  client.connect()

  client.query(query, (err, res) => {
    if (!err) {
        console.log(res.rows);
    } else {
        console.log("Error occur: " + err.message)
    }
    client.end
    })
}

module.exports = {excuteQuery};