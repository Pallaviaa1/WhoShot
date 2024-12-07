var mysql = require("mysql");

const connection = mysql.createConnection({
  host: "database-1.cruvxsz2aftm.eu-north-1.rds.amazonaws.com",
  user: "admin",
  password: "whoshotdbmaster",
  database: "whoshotdb",
  timeout: 100000
  // host: "localhost",
  // user: "root",
  // password: "",
  // database: "who_shot_app_db",
  // timeout: 100000
});

connection.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Database Connected Successfully");
  }
});

module.exports = connection;

