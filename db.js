require('dotenv').config()

const Pool = require('pg').Pool

let database;

if(process.env.NODE_ENV === "development") {
    database = process.env.DEV_DATABASE
} else if (process.env.NODE_ENV === "test") {
    database = process.env.TEST_DATABASE
}

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: database,
    password: process.env.DB_USER_PASSWORD,
    port: process.env.DB_PORT,
})

module.exports = pool;