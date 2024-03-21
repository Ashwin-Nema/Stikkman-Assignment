const mysql = require('mysql');
const logger = require('./config/logger');
const { sql } = require("./config/config");

const connection = mysql.createConnection({
  host: sql.host,
  user: sql.user,
  password: sql.password,
  database:'Coursesmanagement'
});
connection.connect((err) => {
  if (err) {
    logger.info('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to database');
});

module.exports = connection;
