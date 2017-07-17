var express = require('express');
var router = express.Router();
var db = require("../models");

router.get('/:userId/:uuid',function(req, res){
console.log(req.params.userId);
console.log(req.params.uuid);

db.Poll.findOne({
  where: {
    UserId: req.params.userId,
    uuid: req.params.uuid
  }
}).then(function(resultSet) {
  console.log('Radar ' + resultSet.toJSON() );
  var pollDataSet = resultSet.toJSON();
  console.log(pollDataSet.TypeId)
  res.render('poll',{
    pollData : pollDataSet
  });
})

})


module.exports = router;
