var express = require('express');
var router = express.Router();
var db = require("../models");
const uuid = require('uuid/v4');
var sequelize = require('sequelize');
// Get Homepage
router.post('/addPoll',function(req, res){
	console.log(req.body);
	console.log(req.body.options)
  var newPoll = {};
  newPoll['UserId'] = req.user.id;
  newPoll['title'] = req.body.question;
  newPoll['PollTypeId'] = req.body.pollType;
  newPoll['options'] = JSON.stringify(req.body.optionCreated);
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

router.get('/getPollHistory/:userId',function(req,res) {
	console.log(req.params.userId)
	var userIdentifier = parseInt(req.params.userId);
	/*db.PollResult.findAll({
		attributes:['PollId','optionSelected',[sequelize.fn('count', sequelize.col('optionSelected')), 'count']],
		include: [{model: db.Poll,required: true,where:{userId:req.params.userId},attributes:['title','PollTypeId']}],
		group: ['PollId','optionSelected'],
		order:['PollId']
	}).then(function(data){
		res.json(data);
	})*/

	db.Poll.findAll({
		where: {
		UserId: req.params.userId
	},
	include: [db.PollResult]
	}).then(function(dbPolls) {
		res.json(dbPolls);
	});
})

router.get('/getAllPolls/:userId' , function(req,res) {
	console.log(req.params.userId)
	var userIdentifier = parseInt(req.params.userId);
	db.Poll.findAll({

	}).then(function(data) {
		res.json(data);
	});

})

router.post('/deactivatePoll',function(req, res){
	var deactivatePoll = {};
	deactivatePoll['uuid'] = req.body.uuid;
	db.Poll.update({
		isActive:false},
		{where: {
			uuid: req.body.uuid
		}}
	).then(function(data) {
			res.json({})
	})



});

module.exports = router;
