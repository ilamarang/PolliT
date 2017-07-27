var pollHistory = require('./pollHistory.js')

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
