const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "QLKTX"
})

db.connect(function(err){
  if (err) throw err;
  console.log("connection susscessly !!!")
});

module.exports = db;