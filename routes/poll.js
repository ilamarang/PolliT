var express = require('express');
var router = express.Router();
var db = require("../models");

router.get('/:userId/:uuid',function(req, res){
console.log(req.params.userId);
console.log(req.params.uuid);

res.json({});

})


module.exports = router;
