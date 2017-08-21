var UI = require('ui');
var apiRequest = new XMLHttpRequest(); //http request to get buses 
var ajax = require('ajax'); //ajas to get timings

//url that gets list of buses, but not timings or stops
var urlBusList = "http://webservices.nextbus.com/service/publicXMLFeed?a=rutgers&command=routeConfig";
var busList = []; //array to store list of buses
var busTags = []; //array to store bus tags

var main = new UI.Card({
  title: "RUPebble",
  body: "Press select to get timings"
}); 

main.show();

main.on("click", "select", function(e){
  console.log("Select clicked");
  apiRequest.open('GET', urlBusList); // get list of buses
  apiRequest.send();
  apiRequest.onLoad = function() {
    try {
      var jsonBusList = JSON.parse(this.responseText);
      console.log("Successfully converted to JSON");
      for(var i = 0; i < jsonBusList.body.route.length; i++) {
        busList.push(jsonBusList.body.route[i]."-title");
        busTags.push(jsonBusList.body.route[i]."-tag");
      }
      
    } catch(err) {
        console.log("Could not convert to JSON");
    }
  
  };
  
  var menu = new UI.Menu({
    sections: [{
      title: "Newest posts",
      items: busList
    }]
  });
  
  menu.show();
});
/*

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
*/