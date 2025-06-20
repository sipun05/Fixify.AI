const mysql = require('mysql2');
const pool = mysql.createConnection({
    host: 'localhost',
    user: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: 'GoogleSheets',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = { pool }