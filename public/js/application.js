
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

});


$("#submitPollButton").on("click",function() {
      submitPoll();
})

$("#mainContent").on("click", "#submitbutton", function() {
  if (validatePollSubmit()) {
          createNewPoll();
}
})
