module.exports = {
  convert: function(dbPollInfo){
    if(dbPollInfo.PollTypeId === 1){
      var optionAry = [["Yes",0],["No",0]];
      return getMultiOpsPollResult(optionAry, dbPollInfo);
    } else if(dbPollInfo.PollTypeId === 2){
      var options = JSON.parse(dbPollInfo.options);
      var optionAry = [];
      for(var i in options)
        optionAry.push([options[i], 0]);
      return getMultiOpsPollResult(optionAry, dbPollInfo);
    } else {
      var optionAry = [['1',0],['2',0],['3',0],['4',0],['5',0]];
      return getMultiOpsPollResult(optionAry, dbPollInfo);
    }
    console.log(data);
    return data;
  }
}

function getMultiOpsPollResult(options, dbPoll){
    var opsMap = new Map(options);
    for(var j = 0; j < dbPoll.PollResults.length; j++){
      var dbPollSelection = (dbPoll.PollResults)[j];
      var cnt = opsMap.get(dbPollSelection.optionSelected+'')+1;
      opsMap.set(dbPollSelection.optionSelected+'', cnt);
    }

    var data = [];
    for(var key of opsMap.keys()){
      var optionInfo = {
        Poll:{
          PollTypeId: dbPoll.PollTypeId,
          title: dbPoll.title
        },
        PollId: dbPoll.id,
        count: opsMap.get(key),
        optionSelected: key
      };
      console.log(optionInfo);
      data.push(optionInfo);
    }
    return data;
}

