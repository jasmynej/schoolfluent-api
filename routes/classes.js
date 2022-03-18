var express = require('express');
var router = express.Router();
var db = require("../db/connection")

router.get('/',async function(req,res){
    const classes = await db.query("SELECT * FROM classes")
    res.json(classes)
})

router.post('/add',async function(req,res){
    const newClass = await db.query("INSERT INTO classes (name,section_code,period) VALUES ($1,$2,$3) RETURNING id",
    [req.body.name,req.body.code,req.body.period])

    res.json(newClass)
})
module.exports = router