const mysql = require('mysql');
const logger = require('../src/config/logger');
const { sql } = require('../src/config/config');

async function main() {
  const connection = mysql.createConnection({
    host: sql.host,
    user: sql.user,
    password: sql.password,
  });

  await connection.connect();

  logger.info('Connection established');
  await connection.query('CREATE DATABASE IF NOT EXISTS CoursesManagement');

  logger.info('Database created');
  await connection.query(`USE CoursesManagement`)

  logger.info('Using database CoursesManagement')
  await connection.query(`CREATE TABLE IF NOT EXISTS Course (
    id INT AUTO_INCREMENT PRIMARY KEY,
    thumbnail VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    creation_date DATE
);

`);
  logger.info('course table created');
  connection.end();
}

main().catch((err) => {
  logger.info(`An error occurred while seeding database`, err);
});
