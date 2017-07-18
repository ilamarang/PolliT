
var submitPoll = function() {
  var submitPollData = { };
  submitPollData['uuid'] = $("#submitPollForm").data("uuid");
  submitPollData['pollId'] = $("#submitPollForm").data("pollid");
  submitPollData['email'] = $("#pollSubmitEmail").val();
  submitPollData['optionSelected'] = $('#pollSelection :selected').text();
  $.post("/services/submitPoll",submitPollData).done(function(data){
    $('#submitPollRow').hide();
    var successMessage = $('<div class="center-text"><h1> Thank you! - Your choice has been successfully Registered! </h1></div>')
    $('#submitPollContainer').append(successMessage);
  })
}


var createNewPoll = function() {
  var newPollData = { };
      newPollData['question'] = $('#pollQuestion').val();

      switch($('#newPollForm').data('polltype')) {
        case 'yesOrNo':
        newPollData['pollType'] = 1;
        break;

        case 'multipleChoice':
        newPollData['pollType'] = 2;
        break;

        case 'points':
        newPollData['pollType'] = 3;
        break;

      }
      console.log('PollType ' + $('#newPollForm').data('polltype'));
  $.post("/services/addPoll", newPollData).done(function(data){
    console.log(data);

    $('#pollLink').text(window.location.protocol + "//" + window.location.host + '/submitPoll/' + data.UserId + '/' + data.uuid);
    $('#pollResult').modal('show');
  });

}
