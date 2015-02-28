var parser = require('rssparser');
var config = require('config');
var async = require('async');
var request = require('request');
var xpath = require('xpath')
var dom = require('xmldom-silent').DOMParser

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
				itemsNews = items.slice(0, 50);
				items = [];
				waterFallDone();
			});
		},
		function(waterFallDone){
			console.log("Update deals chauds");
			loadDeals(urlHots, function(items){
				itemsHot = items.slice(0, 50);
				items = [];
				waterFallDone();
			});
		}
	],
	function(err, responses){
		console.log("Mise à jour des items terminée");
		async.parallel([
			function(waterFallDone){
				itemsNews.forEach(function(element, index, array){
					if(!element.properties){
						getDealInfo(element, function(data){
							element.properties = data;
						});		
					}
				});
				waterFallDone();
			},
			function(waterFallDone){
				itemsHot.forEach(function(element, index, array){
					if(!element.properties){
						getDealInfo(element, function(data){
							element.properties = data;
							if(index > 50){
								return false;	
							}
						});
					}
				});
				waterFallDone();
			}
		]);
				
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

getDealInfo = function(element, callback){
	var ret = {};
	try{
		var doc = new dom().parseFromString(element.summary)		
		ret.image = parserImage(doc);
	}catch(exception){
		console.log(exception);
	}finally{
		callback(ret);	
	}
};

parserImage = function(doc){
	var element = xpath.select("//img", doc);
	return element[0].attributes[1].nodeValue;
};