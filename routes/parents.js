var express = require('express');
var router = express.Router();
var db = require("../db/connection")
router.get('/',async function(req,res){
    var parents = await db.query("SELECT * FROM parents")
    res.send(parents)
})

router.get('/:id',async function(req,res){
    var parent = await db.query("SELECT * FROM parents WHERE id = $1",req.params.id)
    res.json(parent)
})

module.exports = router