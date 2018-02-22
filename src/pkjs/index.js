require('pebblejs');
var UI = require('pebblejs/ui');
var ajax = require('pebblejs/lib/ajax');

//url that gets list of active buses, but not timings
//this one returns an xml file
//this is just in case the other link ever stops working
//"http://webservices.nextbus.com/service/publicXMLFeed?a=rutgers&command=routeConfig";

//link to get buses, returns a json file
var jsonUrl = "http://runextbus.herokuapp.com/config";

//
var busList = []; //array to store list of active buses
var busTags = []; //array to store bus tags
var stopList = []; //array to store list of active stops
var stopTags = []; //array to store stop tags

var selectIndex;


//initial startup screen
var main = new UI.Menu({
	sections: [{
		title: 'Select a list',
		items: [
			{title:'Active Bus List'},
			{title:'Active Stop List'}
		]
	}]
});

var menu = new UI.Menu({
	sections: [{
		
	}]
});

main.show();

//event listener for clicking select button
//after click, the api request is processed
main.on('select', function(e) {
	console.log("selected: " + e.itemIndex);
	selectIndex = e.itemIndex;

	// get JSON file with bus names using ajax
	ajax({
			url: jsonUrl,
			type: 'json'
		},
		function(data) { //performs actions on selection
			if (selectIndex == 0){
				
				//need to populate list of active buses
				
				
				try {

					for (var i = 0; i < data.sortedRoutes.length; i++) {
						//store bus names in array
						busList.push(data.sortedRoutes[i].title);

						//store bus tag in array, necessary for getting timings
						busTags.push(data.sortedRoutes[i].tag);
					}

					console.log("Successfully converted to JSON, Bus List");

					//create menu to display buses
					menu = new UI.Menu({
						sections: [{
							title: "Active Buses",
							items: []
						}]
					});

					//add each bus to the menu item
					for (var i = 0; i < busList.length; i++) {

						//append the current bus to the items in menu section
						menu.item(0, i, {
							title: busList[i]
						});

					}

					menu.show();

					//check when select is pressed while on menu
					//then display timings for that specific bus
					menu.on("select", function(e) {

						//url to get predictions, returns a JSON object
						var urlPredict = "http://runextbus.herokuapp.com/route/" + busTags[e.itemIndex];
						ajax({
								url: urlPredict,
								type: 'json'
							},
							function(data) {
								if (data[0].predictions == null) {
									//new ui menu to show predictions
									var timeMenu = new UI.Menu({
										sections: [{
											title: "Predictions",
											items: [{
												title: "This bus has no predictions currently"
											}]
										}]
									});

									timeMenu.show();
								} else {
									//array to store stops
									var stopsArr = [];

									//array to store predictions
									var timesArr = new Array(data.length);

									//make timesArr 2d to hold specific amount of predictions depending on stop
									for (var i = 0; i < timesArr.length; i++) {
										timesArr[i] = [];
									}

									//store stops and times in respective arrays.
									for (i = 0; i < data.length; i++) {

										stopsArr.push(data[i].title);

										for (var j = 0; j < data[i].predictions.length; j++) {
											timesArr[i].push(data[i].predictions[j].minutes);
										}

									}

									//new ui menu to show predictions
									var timeMenu = new UI.Menu({
										sections: [{
											title: "Predictions",
											items: []
										}]
									});

									//add each bus to the menu item
									for (i = 0; i < stopsArr.length; i++) {

										//append the current bus to the items in menu section
										timeMenu.item(0, i, {
											title: stopsArr[i],
											subtitle: "Arriving in " + timesArr[i] + " min"
										});
									}

									timeMenu.show();
								}
							}
							);
					});

				} catch (err) {
					//menu to show in case there was an error in the data (i.e. was not retreieved)
					var errorMenu = new UI.Menu({
						sections: [{
							title: "Error",
							items: [{
								title: "Could not retrieve data"
							}]
						}]
					});

					errorMenu.show();
					console.log("Could not convert to JSON, Bus List");
				}
			} else if (selectIndex == 1){
				
				//need to populate list of active bus stops
				
				
				try {

				for (var i = 0; i < data.active.stops.length; i++) {
					//store bus names in array
					stopList.push(data.active.stops[i].title);

					//store bus tag in array, necessary for getting timings
					stopTags.push(data.active.stops[i].tag);
				}

				console.log("Successfully converted to JSON, Stop List");

				//create menu to display buses
				menu = new UI.Menu({
					sections: [{
						title: "Active Stops",
						items: []
					}]
				});

				//add each bus to the menu item
				for (var i = 0; i < busList.length; i++) {

					//append the current stop to the items in menu section
					menu.item(0, i, {
						title: stopList[i]
					});
          
				}

				menu.show();

				//check when select is pressed while on menu
				//then display buses for the specific stop
				menu.on("select", function(e) {

					//url to get predictions, returns a JSON object
					var urlPredict = "http://runextbus.herokuapp.com/route/" + stopTags[e.itemIndex];
					ajax({
							url: urlPredict,
							type: 'json'
						},
						function(data) {
							if (data[0].predictions == null) {
								//new ui menu to show predictions
								var timeMenu = new UI.Menu({
									sections: [{
										title: "Buses",
										items: [{
											title: "This stop has no predictions currently"
										}]
									}]
								});

								timeMenu.show();
							} else {
								//array to store stops
								var stopsArr = [];

								//array to store predictions
								var timesArr = new Array(data.length);

								//make timesArr 2d to hold specific amount of predictions depending on stop
								for (var i = 0; i < timesArr.length; i++) {
									timesArr[i] = [];
								}

								//store stops and times in respective arrays.
								for (var i = 0; i < data.length; i++) {

									stopsArr.push(data[i].title);

									for (var j = 0; j < data[i].predictions.length; j++) {
										timesArr[i].push(data[i].predictions[j].minutes);
									}

								}

								//new ui menu to show predictions
								var timeMenu = new UI.Menu({
									sections: [{
										title: "Stops",
										items: []
									}]
								});

								//add each bus to the menu item
								for (var i = 0; i < stopsArr.length; i++) {

									//append the current bus to the items in menu section
									timeMenu.item(0, i, {
										title: stopsArr[i],
										subtitle: "Arriving in " + timesArr[i] + " min"
									});
								}

								timeMenu.show();
							}
						});
				});

			} catch (err) {
				//menu to show in case there was an error in the data (i.e. was not retreieved)
				var errorMenu = new UI.Menu({
					sections: [{
						title: "Error",
						items: [{
							title: "Could not retrieve data"
						}]
					}]
				});

				errorMenu.show();
				console.log("Could not convert to JSON, Stop List");
			}
			}
		}
	);
});