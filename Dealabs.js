var parser = require('rssparser');

var urlNews;
var urlHots = 'http://www.dealabs.com/rss/new.xml';

var items = [];

module.exports.loadDeals = function loadDeals(){
	console.log("Chargement des deals...");
	parser.parseURL('http://www.dealabs.com/rss/new.xml', {}, function(err, out){
		items = out.items;
		console.log(items.length + " deals chargés.");
	});
};

module.exports.getDeals = function($top, $skip, callback){
	var ret = [];
	if(!$skip && !$top)
    	ret = items;
  	else
  		ret = items.slice($skip, $skip+$top)
  	callback(ret);
}

module.exports.getDealInfo = function(url, callback){
	callback(undefined);
};