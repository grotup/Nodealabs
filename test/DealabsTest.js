var test = require('nodeunit');
var Dealabs = require('../Dealabs.js');
var config = require('config');
var nock = require('nock');
var dealabsConfig = config.get('dealabs.urls');

module.exports = {
	setUp : function(callback){
		callback();
		setMock();
	},

	DealabsGetDeals : function(test){
		Dealabs.loadDeals(function(data){
			Dealabs.getDeals(undefined, undefined, function(data){
				console.log("test");
				test.ok(data.length===2, "DealabsGetDeals - Nombre d'items OK");
				test.done();
			});	
		});
	},

	DealabsGetDealsSkipTop : function(test){
		Dealabs.loadDeals(function(data){
			Dealabs.getDeals(1, 0, function(data){
				console.log("test");
				test.ok(data.length===1);
				test.done();
			});
		});
	}
};

setMock = function(){
	nock(dealabsConfig.news).get('').replyWithFile(200, __dirname + "/news.xml");
}