var express = require('express');
var router = express.Router();
var db = require("../db/connection")
const bcrypt = require('bcryptjs');

router.get('/',async function(req,res){
    var teachers = await db.query("SELECT * FROM teacher_admin")
    res.send(teachers)
})

router.get('/:id',async function(req,res){
    var teacher_admin = await db.query("SELECT * FROM teacher_admin WHERE id = $1",req.params.id)
    res.json(teacher_admin)
})

router.post("/add",async function(req,res){
    const pwd = bcrypt.hashSync("password",8)
    const teacher_admin = await db.query("INSERT INTO teacher_admin (first_name,last_name,email,pwd_hash,role,admin) VALUES($1,$2,$3,$4,$5,$6) RETURNING id",
    [req.body.first_name,req.body.last_name,req.body.email,pwd,req.body.role,req.body.isAdmin]
    )
    res.json(teacher_admin)
})

router.post("/login",async function(req,res){
    const teacher_admin = await db.query("SELECT * FROM teacher_admin WHERE email = $1",req.body.email)
    if (teacher_admin.length === 0){
        res.json({msg:"user does not exist"})
    }
    else if (!bcrypt.compareSync(req.body.pwd,teacher_admin[0].pwd_hash)){
        res.json({msg:"password incorrect"})
    }
    else {
        res.json(teacher_admin)
    }
  
})

module.exports = router