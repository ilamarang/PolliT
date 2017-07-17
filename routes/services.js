var express = require('express');
var router = express.Router();
var db = require("../models");

// Get Homepage
router.post('/addPoll',function(req, res){
	console.log(req.body);
  var newPoll = {}
  newPoll['UserId'] = req.user.id;
  newPoll['title'] = req.body.question;
  newPoll['TypeId'] = 1;
  newPoll['options'] = '1';
  console.log(newPoll);
  db.Poll.create(newPoll).then(function(resultSet){
  res.json(resultSet);
  });

});


module.exports = router;
