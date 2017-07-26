/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {


var dbdataConvert = __webpack_require__(3);
module.exports = {

  renderChart: function(dbdata) {
  //Group result Arrays by Poll ID
  var groupPollArray = []
  //var tempArray = []
  //console.log(data);

  dbdata.forEach(function(value,index) {
  /*  if(index === 0) {
      tempArray.push(value)
    }

   else if(value.PollId == data[index-1].PollId) {
      tempArray.push(value)
    } else {
      groupPollArray.push([].concat(tempArray));
      tempArray.length=0;
      tempArray.push(value);
    }
  })*/
  //groupPollArray.push([].concat(tempArray));
    groupPollArray.push(dbdataConvert.convert(value));
  });

  for(var locationCounter=0;locationCounter < groupPollArray.length;locationCounter++)
  {
     var newChartColumnId = "chartItemDisplay" + locationCounter
     var newChartColumn = $("<div class='col-md-6 dynamicChart chart-panel'> " ).attr("id",newChartColumnId).appendTo("#charDisplaySection")
     google.charts.setOnLoadCallback(module.exports.drawChart(groupPollArray[locationCounter],newChartColumnId));
  }

},

drawChart: function(resultData,location) {
  if(resultData.length > 0)
  {

  var chartArray = [['Task', 'Hours per Day']]

  resultData.forEach(function(value,index){
    var tempData = [];
    tempData.push(value.optionSelected);
    tempData.push(value.count)

    chartArray.push(tempData);

  })

        var data = google.visualization.arrayToDataTable(chartArray);
        var options = {
        	backgroundColor: "#E8E8E8",
        	sliceVisibilityThreshold: .2,
        	fontSize: 14,
          fontColor: "#333333",
          title: resultData[0].Poll.title

        };
        var chart = new google.visualization.PieChart(document.getElementById(location));
        chart.draw(data, options);
 }
 else {
    module.exports.showProfileContent();
 }
},

renderAllPolls: function(data) {
  console.log(data);
$('.chartContent').hide();
$('.profileContent').hide();
$('.pollHistoryContent').show();

    $(".table > tbody").html("");

    data.forEach(function(value,index){
        if(value.isActive) {
            $('<tr><td>' + value.title + '</td> <td>' +value.updatedAt.substring(0,10)+'</td><td> <button class="deactivateButton" data-uuid=' + value.uuid + '> Deactivate Poll </button> </td>' ).appendTo('#pollHistoryTableBody');
        } else {
          $('<tr><td>' + value.title + '</td> <td>' +value.updatedAt.substring(0,10)+'</td><td> <button disabled class="deactivateButton" data-uuid=' + value.uuid + '> Deactivated </button> </td>' ).appendTo('#pollHistoryTableBody');
        }

    })

},
showProfileContent : function() {
      $('.profileContent').show();
      $('.chartContent').hide();
      $('.pollHistoryContent').hide();
  }


}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var pollHistory = __webpack_require__(0)
var api= __webpack_require__(4)

google.charts.load('current', {'packages':['corechart']});

var validatePollSubmit = function() {

  console.log('Hello!');

  console.log($('#newPollForm').data('polltype'))

  if($('#newPollForm').data('polltype')==='multipleChoice') {

  }

  return true
};

// would have to make an if else statement to differenciate between the
// types of polls so i can have different messages pop up.
// potentially could also have a modal trigger but that might be harder.
// find out where that pollType variable is



var createPoll = function(pollType) {


var newPollForm = $("<form id='newPollForm'>");
var newPollQuestionFormGroup = $("<div class='form-group'> ");
var newPollLabel = $("<label for='pollQuestion'>Enter Poll Question:</label>").appendTo(newPollQuestionFormGroup);
var newPollQuestion = $("<input type='text' class='form-control' id='pollQuestion'> </div>").appendTo(newPollQuestionFormGroup);
var newPollSubmitButton = $("<input type='button' class='btn btn-primary' id='submitbutton' value='Submit Button'>");

  if(pollType =='multipleChoice') {

     // Create a multipe choice poll Poll //
     // make button on each option to get rid of some of the
     // multiple choice options
    var newPollForm = $("<form id='newPollForm'>");
    var newPollQuestionFormGroup = $("<div class='form-group'> ");
    var pollDescription = $("<h1 class='poll-description text-center'> This is a multiple answer poll. Please fill in your question and options below. </h1>").appendTo(newPollQuestionFormGroup);
    var newPollLabel = $("<label for='pollQuestion'>Enter Your Question:</label>").appendTo(newPollQuestionFormGroup);
    var newPollQuestion = $("<input type='text' class='form-control' id='pollQuestion'> </div>").appendTo(newPollQuestionFormGroup);
    var newMultipleChoicePollTypeLabel = $("<div class='row text-center'> <label></label> </div>").appendTo(newPollQuestionFormGroup);
    var newChoiceColumn = $("<div class='col-md-4 choices-column'>").appendTo(newPollQuestionFormGroup);
    var newPollChoice1= $("<label>Option 1:</label> <input type='text' class='form-control pollChoice' id='pollChoice1'> </div>").appendTo(newChoiceColumn);
    var newPollChoice2 = $("<label>Option 2:</label>  <input type='text' class='form-control pollChoice' id='pollChoice2'> </div>").appendTo(newChoiceColumn);
    var newPollChoice3 = $("<label>Option 3:</label>  <input type='text' class='form-control pollChoice' id='pollChoice3'> </div>").appendTo(newChoiceColumn);
    var newPollChoice4 = $("<label>Option 4:</label>  <input type='text' class='form-control pollChoice' id='pollChoice4'> </div>").appendTo(newChoiceColumn);
    var newRow = $("<div class='row'>").appendTo(newPollQuestionFormGroup);

  } else if(pollType =='points') {
     // Create a single Poll //
    var newPollForm = $("<form id='newPollForm'>");
    var newPollQuestionFormGroup = $("<div class='form-group'> ");
    var pollDescription = $("<h1 class='poll-description text-center'> This is a Preferential Question poll, meaning on a scale of 1 - 5. type of poll does not have editable options. Please type your question below. </h1>").appendTo(newPollQuestionFormGroup);
    var newPollLabel = $("<label for='pollQuestion'>Enter Your Question:</label>").appendTo(newPollQuestionFormGroup);
    var newPollQuestion = $("<input type='text' class='form-control' id='pollQuestion'> </div>").appendTo(newPollQuestionFormGroup);

  } else {
    // create a preferetial poll //
    var newPollForm = $("<form id='newPollForm'>");
    var newPollQuestionFormGroup = $("<div class='form-group'> ");
    var pollDescription = $("<h1 class='poll-description text-center'> This is a single question poll. type of poll does not have editable options. Please type your question below.</h1>").appendTo(newPollQuestionFormGroup);
    var newPollLabel = $("<label for='pollQuestion'>Enter Your Question:</label>").appendTo(newPollQuestionFormGroup);
    var newPollQuestion = $("<input type='text' class='form-control' id='pollQuestion'> </div>").appendTo(newPollQuestionFormGroup);

  }

  var newPollSubmitButton = $("<input type='button' class='red-button' id='submitbutton' value='Submit!'>");

  newPollForm.append(newPollQuestionFormGroup).append(newPollSubmitButton);

  //Add a data attribute that will be passed during service call.
  $(newPollForm).attr('data-polltype',pollType)

  //Append the poll to main content area
  $("#mainContent").append(newPollForm);
};

// on load its gunna hide the other div and show the corrisponding div
$(document).ready(function(){

  $(".createPollButton").click( function(){
    //hide div's and create a poll
    $('.profileContent').hide();
    createPoll($(this).data('polltype'));
  });

  api.getPollHistory();
  $('.profileContent').hide();
  $('.pollHistoryContent').hide();
});


$("#submitPollButton").on("click",function() {
      api.submitPoll();
});


$("#mainContent").on("click", "#submitbutton", function() {
  if (validatePollSubmit()) {
          api.createNewPoll();
}
})

$("#modalCloseButton").on("click",function() {
  console.log('Modal Close Button!!');
  $('#newPollForm').hide();
  $('.chartContent').show();

  getPollHistory();

})

$(".pollHistoryContent").on("click",".deactivateButton",function() {

  api.deactivatePoll($(this).data('uuid'));
  $("#pollHistoryTableBody").empty();
  api.getAllPolls();

})


$("#charDisplaySection").on("click", function() {

  $("#singlePollResult").modal('show');

});

$("#showProfile").on("click", function() {

  pollHistory.showProfileContent();

});

$("#getPoll").on("click", function() {

  api.getAllPolls();

});


/***/ }),
/* 3 */
/***/ (function(module, exports) {

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



/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var pollHistory = __webpack_require__(0)

module.exports = {

submitPoll: function() {
  var submitPollData = { };
  submitPollData['uuid'] = $("#submitPollForm").data("uuid");
  submitPollData['pollId'] = $("#submitPollForm").data("pollid");
  submitPollData['email'] = $("#pollSubmitEmail").val();
  //submitPollData['name'] = $("#pollSubmitName").val();
  submitPollData['optionSelected'] = $('#pollSelection :selected').text();
  $.post("/services/submitPoll",submitPollData).done(function(data){
    $('#submitPollRow').hide();
    // this is where you have to fix the last page
    var successMessage = $('<div class="success-message"><h1> Thank you!</h1> <h2 >Your choice has been successfully Registered! </h2> </div>')
    $('#submitPollContainer').append(successMessage);
  })
},

createNewPoll: function() {
  var newPollData = { };
      newPollData['question'] = $('#pollQuestion').val();

      switch($('#newPollForm').data('polltype')) {
        case 'yesOrNo':
        newPollData['pollType'] = 1;
        break;

        case 'multipleChoice':
        newPollData['pollType'] = 2;
        var options= {}
        options['option1'] = $('#pollChoice1').val();
        options['option2'] = $('#pollChoice2').val();
        options['option3'] = $('#pollChoice3').val();
        options['option4'] = $('#pollChoice4').val();
        newPollData['optionCreated'] = options;
        console.log(newPollData)
        break;

        case 'points':
        newPollData['pollType'] = 3;
        break;

      }
      console.log('PollType ' + $('#newPollForm').data('polltype'));
    $.ajax ({
      url: '/services/addPoll',
      type: "POST",
      data: JSON.stringify(newPollData),
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      success: function(data){
        $('#pollLink').text(window.location.protocol + "//" + window.location.host + '/submitPoll/' + data.UserId + '/' + data.uuid);
        $('#pollResult').modal('show');
    }
});
},
getPollHistory: function() {
    $('.profileContent').hide();
  var pollUserId =  $('#profileColumn').data('userid');

  $.get('/services/getPollHistory/' + pollUserId).done(function(data){
    pollHistory.renderChart(data);

  })
},

deactivatePoll: function (pollUUID) {
  var pollInfo = {};
  pollInfo['uuid'] = pollUUID;
  console.log(pollUUID);
  $.post('/services/deactivatePoll',pollInfo).done(function(data){
    console.log('Hello')
  })
},

getAllPolls: function() {
var pollUserId =  $('#profileColumn').data('userid');

$.get('/services/getAllPolls/' + pollUserId).done(function(data){

pollHistory.renderAllPolls(data);
})

}

}


/***/ })
/******/ ]);