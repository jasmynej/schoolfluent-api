var express = require('express');
var router = express.Router();
var db = require("../db/connection")
const bcrypt = require('bcryptjs');
router.get('/',async function(req,res){
    var parents = await db.query("SELECT * FROM parents")
    res.send(parents)
})

router.get('/:id',async function(req,res){
    var parent = await db.query("SELECT * FROM parents WHERE id = $1",req.params.id)
    res.json(parent)
})

router.post("/add",async function(req,res){
    const pwd = bcrypt.hashSync("password",8)
    const parent = await db.query("INSERT INTO parents (first_name,last_name,email,pwd_hash) VALUES($1,$2,$3,$4) RETURNING id",
    [req.body.first_name,req.body.last_name,req.body.email,pwd]
    )
    res.json(parent)
})

router.post("/login",async function(req,res){
    const parent = await db.query("SELECT * FROM parents WHERE email = $1",req.body.email)
    if (parent.length === 0){
        res.json({msg:"user does not exist"})
    }
    else if (!bcrypt.compareSync(req.body.pwd,parent[0].pwd_hash)){
        res.json({msg:"password incorrect"})
    }
    else {
        res.json(parent)
    }
  
})
module.exports = router