$("#mainContent").on("click", "#submitbutton", function() {
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

})
