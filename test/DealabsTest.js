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
		Dealabs.updateItems(function(){
			Dealabs.getDeals('hots', undefined, undefined, function(data){
				test.ok(data.length===2, "DealabsGetDeals - Nombre d'items OK");
				test.ok(data[0].title === 'Titre hot 1', "DealabsGetDeals - Propriété item ok");
				test.done();
			});	
		});
	},

	DealabsGetDealsSkipTop : function(test){
		Dealabs.updateItems(function(){
			Dealabs.getDeals('news', 1, 0, function(data){
				test.ok(data.length===1, "DealabsGetDealsSkipTop - Nombre d'items OK");
				test.ok(data[0].title === 'Titre new 1', "DealabsGetDealsSkipTop - Propriété item OK");
				test.done();
			})
		});
	}
};

setMock = function(){
	nock(dealabsConfig.news).get('').replyWithFile(200, __dirname + "/news.xml");
	nock(dealabsConfig.hot).get('').replyWithFile(200, __dirname + "/hots.xml");
}