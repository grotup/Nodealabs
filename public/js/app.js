var module = angular.module('Dealabs', []);

module.controller('DealsController',['$scope', 'DealsService', function($scope,DealsService){
	DealsService.getDeals(0, 10, function(data){

		$scope.deals = data;
		$scope.deals.forEach(function(element, index, array){
			console.log(element.published_at);
			var date = new Date();
        	date.setTime(element.published_at);
        	console.log(date);
			element.date = date;
		});
	})
}]);

module.service('DealsService', ['$http', function($http){

	this.getDeals = function(top, skip, callback){
		$http.get('/deals?top='+top+'&skip='+skip).success(function(data, status, headers, config){
          callback(data);
        })
	};

}]);