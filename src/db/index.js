const pgp = require('pg-promise')();
const dbConnection = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 30 // use up to 30 connections
};

const db = pgp(dbConnection);

module.exports = {
  db
}