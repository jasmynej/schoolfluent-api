require('dotenv').config()
const pgp = require('pg-promise')(/* options */)
console.log(process.env.PORT)
const db = pgp(process.env.DEV_DATABASE)

module.exports = db;