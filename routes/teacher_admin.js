var express = require('express');
var router = express.Router();
var db = require("../db/connection")

router.get('/',async function(req,res){
    var teachers = await db.query("SELECT * FROM teacher_admin")
    res.send(teachers)
})

router.get('/:id',async function(req,res){
    var teacher_admin = await db.query("SELECT * FROM teacher_admin WHERE id = $1",req.params.id)
    res.json(teacher_admin)
})
module.exports = router