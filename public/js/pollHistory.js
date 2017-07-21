function renderChart(data) {
  //Group result Arrays by Poll ID
  var groupPollArray = []
  var tempArray = []
  console.log(data);

  data.forEach(function(value,index) {
    if(index === 0) {
      tempArray.push(value)
    }

   else if(value.PollId == data[index-1].PollId) {
      tempArray.push(value)
    } else {
      groupPollArray.push([].concat(tempArray));
      tempArray.length=0;
      tempArray.push(value);
    }
  })
  groupPollArray.push([].concat(tempArray));
  for(var locationCounter=0;locationCounter < groupPollArray.length;locationCounter++)
  {
     var newChartColumnId = "chartItemDisplay" + locationCounter
     var newChartColumn = $("<div class='col-md-6 dynamicChart'> " ).attr("id",newChartColumnId).appendTo("#charDisplaySection")
     google.charts.setOnLoadCallback(drawChart(groupPollArray[locationCounter],newChartColumnId));
  }

}

function drawChart(resultData,location) {

  console.log(resultData[0].Poll)
  var chartArray = [['Task', 'Hours per Day']]

  resultData.forEach(function(value,index){
    var tempData = [];
    tempData.push(value.optionSelected);
    tempData.push(value.count)

    chartArray.push(tempData);

  })
  console.log(chartArray);
        var data = google.visualization.arrayToDataTable(chartArray);
        var options = {
          title: resultData[0].Poll.title
        };
        var chart = new google.visualization.PieChart(document.getElementById(location));
        chart.draw(data, options);

}
