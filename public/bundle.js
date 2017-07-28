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
/***/ (function(module, exports) {

throw new Error("Module parse failed: /Users/Blanco/Desktop/pollit/PolliT/public/js/pollHistory.js Unexpected token (105:3)\nYou may need an appropriate loader to handle this file type.\n|       chart.draw(data, options);\n|       }\n|    else {\n|       module.exports.showProfileContent();\n|    }");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var pollHistory = __webpack_require__(0)
var api= __webpack_require__(3)

google.charts.load('current', {'packages':['corechart']});

var validatePollSubmit = function() {

  console.log('Hello!');

  console.log($('#newPollForm').data('polltype'))

  if($('#newPollForm').data('polltype')==='multipleChoice') {

  }

  return true
};

var createPoll = function(pollType) {


var newPollForm = $("<form id='newPollForm'>");
var newPollQuestionFormGroup = $("<div class='form-group'> ");
var newPollLabel = $("<label for='pollQuestion'>Enter Poll Question:</label>").appendTo(newPollQuestionFormGroup);
var newPollQuestion = $("<input type='text' class='form-control' id='pollQuestion'> </div>").appendTo(newPollQuestionFormGroup);
var newPollSubmitButton = $("<input type='button' class='btn btn-primary' id='submitbutton' value='Submit Button'>");

  if(pollType =='multipleChoice') {
    // Create a multiple choice poll //
    var newPollForm = $("<form id='newPollForm'>");
    var newPollQuestionFormGroup = $("<div class='form-group'> ");
    var pollDescription = $("<h1 class='poll-description text-center'> This is a multiple answer poll. Please fill in your question and options below. </h1>").appendTo(newPollQuestionFormGroup);
    var newPollLabel = $("<label for='pollQuestion'>Enter Your Question:</label>").appendTo(newPollQuestionFormGroup);
    var newPollQuestion = $("<input type='text' class='form-control' id='pollQuestion'> </div>").appendTo(newPollQuestionFormGroup);
    var newMultipleChoicePollTypeLabel = $("<div class='row text-center'> <label></label> </div>").appendTo(newPollQuestionFormGroup);
    var newChoiceColumn = $("<div class='col-md-7 choices-column'>").appendTo(newPollQuestionFormGroup)
    var newPollChoice1= $("<input type='text' placeholder='Option One' class='form pollChoice' id='pollChoice1'>").appendTo(newChoiceColumn);
    var newPollChoice2 = $("<input type='text' placeholder='Option Two' class='form pollChoice' id='pollChoice2'>").appendTo(newChoiceColumn);
    var newPollChoice3 = $("<input type='text' placeholder='Option Three' class='form pollChoice' id='pollChoice3'> <button class='red-button-inline deleteOption' id='deleteOption3'> Delete </button>").appendTo(newChoiceColumn);
    var newPollChoice4 = $("<input type='text' placeholder='Option Four' class='form pollChoice' id='pollChoice4'> <button class='red-button-inline deleteOption' id='deleteOption4'> Delete </button>").appendTo(newChoiceColumn);
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


  $("#deleteOption3").on("click", function() {
    console.log("clicked 3");
    $("#pollChoice3").delete();
    $("#deleteOption3").delete();
    return false;
  });

  $("#deleteOption4").on("click", function() {
    console.log("clicked 4");
    $("#pollChoice4").delete();
    $("#deleteOption4").delete();
    return false;
  });

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
  $('.searchContent').hide();
});


$("#submitPollButton").on("click",function() {
      api.submitPoll();
});


$("#mainContent").on("click", "#submitbutton", function() {
  if (validatePollSubmit()) {

          api.createNewPoll();
}
});



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

$(".pollHistoryContent").on("click",".seeMoreButton", function() {
  console.log("clicked");
  $('#pollInformation').text(window.location.protocol + "//" + window.location.host + '/submitPoll/' + $('#profileColumn').data('userid') + '/' + $(this).data('uuid'));
  $('#pollResultOpener').modal('show');
});

$("#charDisplaySection").on("click", function() {

  $("#singlePollResult").modal('show');

});

$("#showProfile").on("click", function() {
  $('.searchContent').hide();
  pollHistory.showProfileContent();

});

$("#getPoll").on("click", function() {

  api.getAllPolls();

});

$(".pollSearchButton").on("click",function() {
  console.log($('#pollTextSearch').val());
  console.log($('#pollTypeOption option:selected').text());
  console.log($('#pollOrderOption option:selected').text());

  api.searchPoll();
  $('#filterResultsDropDown').dropdown("toggle");

})

$("#searchPolls").on("click",function() {
  $('.searchContent').show();

})


/***/ }),
/* 3 */
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
        if($('#pollChoice3').val().length > 0)
        {
            options['option3'] = $('#pollChoice3').val();
        }
        if($('#pollChoice4').val().length > 0) {
            options['option4'] = $('#pollChoice4').val();
        }

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

},

searchPoll: function() {
  console.log('Search Poll');
  var searchPollData = { };
  searchPollData['uuid'] = $("#submitPollForm").data("uuid");
  searchPollData['pollSearchTitle'] = $('#pollTextSearch').val();
  if($('#pollTypeOption option:selected').val() === '0') {
    searchPollData['pollSearchType'] = '';
  }
   else {
     searchPollData['pollSearchType'] = $('#pollTypeOption option:selected').val();
   }


  $.ajax ({
    url: '/services/searchPoll',
    type: "POST",
    data: JSON.stringify(searchPollData),
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    success: function(data){
      console.log('Render chart !! ' + data);
      pollHistory.renderSearchChart(data,'searchResults');

  }
})
}

}


/***/ })
/******/ ]);