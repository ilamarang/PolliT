
var submitPoll = function() {
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
}

var showProfileContent = function() {
    $('.profileContent').show();
}

var getPollHistory = function() {
  var pollUserId =  $('#profileColumn').data('userid');

  $.get('/services/getPollHistory/' + pollUserId).done(function(data){
    renderChart(data);

  })
}
