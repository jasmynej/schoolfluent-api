var express = require('express');
var router = express.Router();
var db = require("../db/connection")
router.get('/',async function(req,res){
    var parents = await db.query("SELECT * FROM parents")
    res.send(parents)
})

module.exports = router