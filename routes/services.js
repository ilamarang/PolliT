var express = require('express');
var router = express.Router();
var db = require("../models");
const uuid = require('uuid/v4');

// Get Homepage
router.post('/addPoll',function(req, res){
	console.log(req.body);
  var newPoll = {};
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

router.post('/submitPoll',function(req, res){
var submitPoll = {};
submitPoll['uuid'] = req.body.uuid;
submitPoll['PollId'] = req.body.pollId;
submitPoll['userEmail'] = req.body.email ;
submitPoll['optionSelected'] = req.body.optionSelected;
console.log(submitPoll)
db.PollResult.create(submitPoll).then(function(resultSet) {
	res.json(submitPoll);
})
});
module.exports = router;
