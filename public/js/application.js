var pollHistory = require('./pollHistory.js')
var api= require('./api.js')

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
    var newPollChoice3 = $("<input type='text' placeholder='Option Three' class='form pollChoice' id='pollChoice3'>").appendTo(newChoiceColumn);
    var newPollChoice4 = $("<input type='text' placeholder='Option Four' class='form pollChoice' id='pollChoice4'>").appendTo(newChoiceColumn);
    var newPollChoice5= $("<input type='text' placeholder='Option Five' class='form pollChoice' id='pollChoice5'>").appendTo(newChoiceColumn);
    var newPollChoice6 = $("<input type='text' placeholder='Option Six' class='form pollChoice' id='pollChoice6'>").appendTo(newChoiceColumn);
    var newPollChoice7= $("<input type='text' placeholder='Option seven' class='form pollChoice' id='pollChoice7'>").appendTo(newChoiceColumn);
    var newPollChoice8= $("<input type='text' placeholder='Option eight' class='form pollChoice' id='pollChoice8'>").appendTo(newChoiceColumn);

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
    $("#pollChoice3").hide();
    $("#deleteOption3").hide();
    return false;
  });

  $("#deleteOption4").on("click", function() {
    console.log("clicked 4");
    $("#pollChoice4").hide();
    $("#deleteOption4").hide();
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

$("#charDisplaySection").on("click", ".dynamicChart", function() {
  console.log($(this).data('voted'));

  $("#singlePollResult").modal('show');
  $('#singlePollResultText').text('This Poll has received ' + $(this).data('voted') + ' votes!')
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
  $('.profileContent').hide();
  $('.searchContent').show();
  $('#charDisplaySection').empty();
})
