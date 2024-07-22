require('dotenv').config()

// db.js
const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: process.env.HOST,//'localhost', 
  user: process.env.DB_USER,//'todo_db_user', 
  password: process.env.PASSWORD,//'3475',
  database: process.env.DATABASE,//'todoDataBase',
  connectionLimit: 5
});

module.exports = pool;
