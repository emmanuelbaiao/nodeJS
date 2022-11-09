var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost:3306",
  user: "root",
  password: "ESB230192esb@"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});