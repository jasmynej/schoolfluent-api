var express = require('express');
var router = express.Router();
var db = require("../db/connection")
router.get('/',async function(req,res){
    var students = await db.query("SELECT * FROM students");
    res.json(students)
})

module.exports = router