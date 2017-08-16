var UI = require('ui');
var apiRequest = new XMLHttpRequest();
var ajax = require('ajax');

var menu = new UI.Menu({
  backgroundColor: "white",
  textColor: "black",
  highlightBackgroundColor: "blue",
  highlightTextColor: "white",
  sections: 
}); 

var rutgersBusList = "http://webservices.nextbus.com/service/publicXMLFeed?a=rutgers&command=routeConfig";
var XML_List = apiRequest.open('GET', rutgersBusList, true);

var arr_busList = [];

for(var i = 0; i < XML_List.length; i++) {
  arr_busList.push(XML_List.body[i]);
}

var printBuses = function() {
  for(var i = 0; i < arr_busList.length; i++) {
    console.log(arr_busList[i]);
  }
};

var chooseBus = function() {
  var bus = "";
  return bus;
};

var getBusTimes = function(route) {
  var rutgersBusTimes = "http://runextbus.herokuapp.com/route/" + route;
  var arr_busTimes = [];
  
  ajax({ url: rutgersBusTimes, type: 'json' },
    function(data) {
    }
  );
  
  for(var i = 0; i < JSON_Times.length; i++) {
    for(var j = 0; j < timesArr.predictions.length; j++) {
    }
  }
};

apiRequest.onLoad = function() {
  console.log("API Call was successful");
};

for(var i = 0; i < arr_busList.length; i++) {
    console.log(arr_busList[i].title);
}