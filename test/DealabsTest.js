var test = require('nodeunit');
var Dealabs = require('../Dealabs.js');

exports.DealabsLoadDeals = function(test){
	Dealabs.loadDeals(function(data){
		Dealabs.getDeals(undefined, undefined, function(data){
			console.log(data.length);
			test.ok(data.length === 500, "Nombre d'items OK");
			test.done();
		});	
	});
};

exports.DealabsGetDeals = function(test){
	Dealabs.loadDeals(function(data){
		Dealabs.getDeals(2, 0, function(data){
			test.ok(data.length===2, "Nombre d'items OK");
			test.done();
		})
	});
};