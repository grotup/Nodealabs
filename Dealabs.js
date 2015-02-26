var parser = require('rssparser');
var config = require('config');

var dealabsConfig = config.get('dealabs.urls');

var urlNews = dealabsConfig.news;
var urlHots = dealabsConfig.hot;

var items = [];

module.exports.loadDeals = function loadDeals(callback){
	parser.parseURL(urlNews, {}, function(err, out){
		if(err)
			console.log(err);

		items = out.items;
		logNbDeals();
		callback();
	});
};

module.exports.getDeals = function($top, $skip, callback){
	var ret = [];

	if(!$skip)
		$skip = 0;
	if(!$top)
		$top = items.length;

	ret = items.slice($skip, $skip+$top)
  	callback(ret);
}

module.exports.upadteItems = function(){
	console.log("Mise à jour des items");

	parser.parseURL(urlNews, {}, function(err, out){
		if(!out)
			return;
		out.items.every(function(element, index, array){
			if(element.published_at <= items[0].published_at){
				console.log(index + " nouveau(x) élement(s)");
				return false;
			}
			items.unshift(element);
			return true;
		});
		logNbDeals();
	});
}

logNbDeals = function(){
	console.log(items.length + " deals en mémoire");
}

module.exports.getDealInfo = function(url, callback){
	callback(undefined);
};