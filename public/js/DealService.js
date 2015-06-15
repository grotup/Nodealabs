var module = angular.module('DealServices', []);

module.service('DealsService', ['$http', function($http){

	this.getDeals = function(type, top, skip, callback){
		$http.get('/deals/'+type+'?$top='+top+'&$skip='+skip).success(function(data, status, headers, config){
          callback(data);
        });
	};

}]);