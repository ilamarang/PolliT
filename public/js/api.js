$("#mainContent").on("click", "#submitbutton", function() {
  var newPollData = { };
      newPollData['question'] = $('#pollQuestion').val();
      newPollData['pollType'] = $('#newPollForm').data('polltype');
      console.log('PollType ' + $('#newPollForm').data('polltype'));
  $.post("/services/addPoll", newPollData).done(function(){
    alert('Poll Submitted!');
  });

})
