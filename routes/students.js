var express = require('express');
var router = express.Router();
var db = require("../db/connection")
const bcrypt = require('bcryptjs');
router.get('/',async function(req,res){
    var students = await db.query("SELECT * FROM students");
    res.json(students)
})

router.get('/:id',async function(req,res){
    var student = await db.query("SELECT * FROM students WHERE id = $1",req.params.id)
    res.json(student)
})

router.post("/add",async function(req,res){
    const pwd = bcrypt.hashSync("password",8)
    const student = await db.query("INSERT INTO students (first_name,last_name,grade,DOB,address,email,pwd_hash) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING id",
    [req.body.first_name,req.body.last_name,req.body.grade,req.body.dob,req.body.address,req.body.email,pwd]
    )
    res.json(student)
})

router.post("/login",async function(req,res){
    console.log("login")
    const student = await db.query("SELECT * FROM students WHERE email = $1",req.body.email)
    if (student.length === 0){
        res.json({msg:"user does not exist"})
    }
    else if (!bcrypt.compareSync(req.body.password,student[0].pwd_hash)){
        res.json({msg:"password incorrect"})
    }
    else {
        res.json(student)
    }
  
})

module.exports = router