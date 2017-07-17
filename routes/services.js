var express = require('express');
var router = express.Router();
var db = require("../models");
const uuid = require('uuid/v4');

// Get Homepage
router.post('/addPoll',function(req, res){
	console.log(req.body);
  var newPoll = {}
  newPoll['UserId'] = req.user.id;
  newPoll['title'] = req.body.question;
  newPoll['TypeId'] = req.body.pollType;
  newPoll['options'] = '1';
	newPoll['uuid'] = uuid();

  console.log(newPoll);
  db.Poll.create(newPoll).then(function(resultSet){
  res.json(newPoll);
  });

});


module.exports = router;
