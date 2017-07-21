var validatePollSubmit = function() {

console.log('Hello!');

console.log($('#newPollForm').data('polltype'))

if($('#newPollForm').data('polltype')==='multipleChoice') {

}

return true
}


var createPoll = function(pollType) {

//Create a new Poll
var newPollForm = $("<form id='newPollForm'>");
var newPollQuestionFormGroup = $("<div class='form-group'> ")
var newPollLabel = $("<label for='pollQuestion'>Enter Poll Question:</label>").appendTo(newPollQuestionFormGroup);
var newPollQuestion = $("<input type='text' class='form-control' id='pollQuestion'> </div>").appendTo(newPollQuestionFormGroup);

var newPollSubmitButton = $("<input type='button' class='btn btn-primary' id='submitbutton' value='Submit Button'>");

if(pollType =='multipleChoice') {
  var newMultipleChoicePollTypeLabel = $("<div class='row text-center'> <label></label> </div>").appendTo(newPollQuestionFormGroup);
  var newChoiceColumn = $("<div class='col-md-4'>").appendTo(newPollQuestionFormGroup);
  var newPollChoice1= $("<label>Enter Choice1:</label> <input type='text' class='form-control pollChoice' id='pollChoice1'> </div>").appendTo(newChoiceColumn);
  var newPollChoice2 = $("<label>Enter Choice2:</label>  <input type='text' class='form-control pollChoice' id='pollChoice2'> </div>").appendTo(newChoiceColumn);
  var newPollChoice3 = $("<label>Enter Choice3:</label>  <input type='text' class='form-control pollChoice' id='pollChoice3'> </div>").appendTo(newChoiceColumn);
  var newPollChoice4 = $("<label>Enter Choice4:</label>  <input type='text' class='form-control pollChoice' id='pollChoice4'> </div>").appendTo(newChoiceColumn);
  var newRow = $("<div class='row'>").appendTo(newPollQuestionFormGroup);
}

newPollForm.append(newPollQuestionFormGroup).append(newPollSubmitButton);

//Add a data attribute that will be passed during service call.
$(newPollForm).attr('data-polltype',pollType)

//Append the poll to main content area
$("#mainContent").append(newPollForm);
}

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
