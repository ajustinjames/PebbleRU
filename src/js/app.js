var UI = require('ui');
var apiRequest = new XMLHttpRequest(); //http request to get active buses 
var ajax = require('ajax'); //ajax to get timings of buses

//url that gets list of active buses, but not timings
//this one returns an xml file
//this is just in case the other link ever stops working
//"http://webservices.nextbus.com/service/publicXMLFeed?a=rutgers&command=routeConfig";

//link to get buses, returns a json file
var jsonUrl = "http://runextbus.herokuapp.com/config"; 

//
var busList = []; //array to store list of active buses
var busTags = []; //array to store bus tags

//initial startup screen
var main = new UI.Card({
  title: "RUPebble",
  body: "Press select to get timings"
}); 

main.show();

//event listener for clicking select button
//after click, the api request is processed
main.on("click", "select", function(e){
  console.log("Select clicked");
  
  
  // get JSON file with bus names using ajax
  ajax({ url: jsonUrl, type: 'json' },
       function(data) {
  
         try {
  
           for(var i = 0; i < data.sortedRoutes.length; i++) {
             busList.push(data.sortedRoutes[i].title); //store bus names in array
             busTags.push(data.sortedRoutes[i].tag); //store bus tag in array, necessary for getting timings
           }
  
           for(var i = 0; i <  busList.length; i++) {
             console.log(busList[i]);
           }
  
           console.log("Successfully converted to JSON, JSON");
           
            
           //string to store buses in a format that the menu item will process it and show it in the app
           var menuBus = "{title:" + busList[0] + "}" ;
           console.log(menuBus);
           for(var i = 1; i < busList.length; i++){
             //if (busList[i] != "All Campuses"){
               menuBus += ",{title:" + busList[i] + "}";
            // }
             console.log(menuBus);
           }

           var menu = new UI.Menu({

             sections: [{
               title: "Buses",
               items: [{
                 title:"a"},{title:"b"},{title:"c"}]
               }]
           });


           menu.show();

           menu.on("select", function(e){
             console.log(e);
           });
  
         } catch(err) { 
            
           console.log("Could not convert to JSON, JSON"); 
         }
       }
  );
});
/*
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


var chooseBus = function() {
  var bus = "";
  return bus;
};
*/