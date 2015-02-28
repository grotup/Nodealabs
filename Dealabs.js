var parser = require('rssparser');
var config = require('config');
var async = require('async');

var dealabsConfig = config.get('dealabs.urls');

var urlNews = dealabsConfig.news;
var urlHots = dealabsConfig.hot;

var itemsHot = [];
var itemsNews = [];

module.exports.getDeals = function(type, $top, $skip, callback){

	if(!$skip)
		$skip = 0;
	if(!$top)
		$top = 10;

	var sliceValue = parseInt($skip)+parseInt($top);

	var items = itemsNews;
	if(type == 'hots')
		items = itemsHot;

  	callback(items.slice($skip,sliceValue));
}

module.exports.updateItems = function(callback){
	console.log("Mise à jour des items");

	async.parallel([
		function(waterFallDone){
			console.log("Update nouveaux deals");
			loadDeals(urlNews, function(items){
				itemsNews = items;
				waterFallDone();
			});
		},
		function(waterFallDone){
			console.log("Update deals chauds");
			loadDeals(urlHots, function(items){
				itemsHot = items;
				waterFallDone();
			});
		}
	],
	function(err, responses){
		console.log("Mise à jour des items terminée");
		if(callback){

			callback();
		}
			
	});
};

loadDeals = function (url, callback){
	parser.parseURL(url, {}, function(err, out){
		if(!out)
			return;
		var items = out.items;
		callback(items);
	});
}

module.exports.getDealInfo = function(url, callback){
	callback(undefined);
};