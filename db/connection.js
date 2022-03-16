require('dotenv').config()
const pgp = require('pg-promise')(/* options */)
const db = pgp(process.env.DEV_DATABASE)

module.exports = db;