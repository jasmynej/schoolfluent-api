var express = require('express');
var router = express.Router();
var db = require("../db/connection")

router.get('/',async function(req,res){
    var teachers = await db.query("SELECT * FROM teacher_admin")
    res.send(teachers)
})

module.exports = router