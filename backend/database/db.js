const mysql = require('mysql2');

// Environment variables take precedence (Docker / CI / production).
// Fall back to the local credentials file for development.
let config = { database: {} };
try {
  config = require('../config/credentials');
} catch (_) {
  // credentials.js is absent (e.g. inside Docker) — env vars are used instead
}

const db = config.database || {};

// Create connection pool
const pool = mysql.createPool({
  host:     process.env.DB_HOST     || db.host     || 'localhost',
  user:     process.env.DB_USER     || db.user     || 'root',
  password: process.env.DB_PASSWORD || db.password || '',
  database: process.env.DB_NAME     || db.database || 'portfolio_db',
  port:     process.env.DB_PORT     || db.port     || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Get promise-based pool
const promisePool = pool.promise();

// Test connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
    return;
  }
  console.log('Database connected successfully!');
  connection.release();
});

module.exports = promisePool;
