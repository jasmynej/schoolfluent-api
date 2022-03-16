const pgp = require('pg-promise')(/* options */)
const db = pgp('postgres://jasmynejean-remy@localhost:5432/schoolfluent-dev')
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');
var hash = bcrypt.hashSync('password', 8);

async function insertData () {
    var fname = faker.name.firstName()
    var lname = faker.name.lastName()
    var email = `${fname}${lname}@school.edu`
    var dob = '2006-06-23'
    const students = await db.query("INSERT INTO students (first_name,last_name,grade,DOB,address,email,pwd_hash) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING id",
    [fname,lname,"10",dob,"123 Clover St",email,hash]
    )
    console.log(students)
}

insertData()