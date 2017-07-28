
var dbdataConvert = require('./convert.js');
module.exports = {

  renderChart: function(dbdata,caller) {
    $('#charDisplaySection').empty();
    //Group result Arrays by Poll ID
    var groupPollArray = []
    console.log('Data Length: ' + dbdata.length);
    if(dbdata.length == 0 && caller == 'search')
    {
      $("#singlePollResult").modal('show');
      $('#singlePollResultText').text('This search has yielded no results!');
      return;
    }
    dbdata.forEach(function(value,index) {
    groupPollArray.push(dbdataConvert.convert(value));
    });

    for(var locationCounter=0;locationCounter < groupPollArray.length;locationCounter++)
    {
       var newChartColumnId = "chartItemDisplay" + locationCounter
       var newChartColumn = $("<div class='col-md-6 dynamicChart chart-panel'> " ).attr("id",newChartColumnId).appendTo("#charDisplaySection")
       google.charts.setOnLoadCallback(module.exports.drawChart(groupPollArray[locationCounter],newChartColumnId));
    }
  }
 ,

  drawChart: function(resultData,location,caller) {
    console.log(resultData);
    var numberOfPeopleVoted = 0
    if(resultData.length > 0)
    {

    var chartArray = [['Task', 'Hours per Day']]

    resultData.forEach(function(value,index){

      var tempData = [];
      tempData.push(value.optionSelected);
      tempData.push(value.count)
      numberOfPeopleVoted += value.count;
      chartArray.push(tempData);

    })

     $('#' + location).attr('data-voted', numberOfPeopleVoted);

    if(caller === 'searchResults') {
      var titleToDisplay = resultData[0]['Poll.title'];
    } else {
      var titleToDisplay = resultData[0].Poll.title;
    }
          var data = google.visualization.arrayToDataTable(chartArray);
          var options = {
          	backgroundColor: "#E8E8E8",
          	sliceVisibilityThreshold: .2,
          	fontSize: 14,
            fontColor: "#333333",
            title: titleToDisplay

          };
          var chart = new google.visualization.PieChart(document.getElementById(location));
          chart.draw(data, options);
   }
   else {
    //  module.exports.showProfileContent();
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
              $('<tr><td>' + value.title + '</td> <td>' +value.updatedAt.substring(0,10)+'</td><td> <button class="deactivateButton red-button-inline" data-uuid=' + value.uuid + '> Deactivate Poll </button> </td> <td> <button class="seeMoreButton red-button-inline" data-uuid=' + value.uuid + '> See More </button> </td></tr>' ).appendTo('#pollHistoryTableBody');
          } else {
            $('<tr><td>' + value.title + '</td> <td>' +value.updatedAt.substring(0,10)+'</td><td> <button disabled class="deactivateButton red-button-inline" data-uuid=' + value.uuid + '> Deactivated </button> </td> <td> <button class="seeMoreButton red-button-inline" data-uuid=' + value.uuid + '> See More </button> </td><tr>' ).appendTo('#pollHistoryTableBody');
          }

      })

  },
  showProfileContent : function() {
        $('.profileContent').show();
        $('.chartContent').hide();
        $('.pollHistoryContent').hide();

    }


  }
