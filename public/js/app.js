var module = angular.module('Dealabs', []);

module.controller('DealsController',['$scope', 'DealsService', function($scope,DealsService){
	$scope.nbDealsPage = [10, 20, 50, 100];
	$scope.top = 10;
	$scope.skip = 0;
	$scope.deals= [];
	$scope.typeFlux = "news";

	updateDeals = function(){
		DealsService.getDeals($scope.top, $scope.skip, function(data){
			$scope.deals = data;
			$scope.deals.forEach(function(element, index, array){
				var date = new Date();
	        	date.setTime(element.published_at);
				element.date = date;
			});
		});
	}

	$scope.nextPage = function(){
		$scope.skip = $scope.skip+10;
		updateDeals();
	};

	$scope.previousPage = function(){
		$scope.skip = $scope.skip-10;
		if($scope.skip <= 0) $scope.skip=0;
		updateDeals();
	};

	$scope.changeNbDeals = function(nb){
		$scope.top = nb;
		updateDeals();
	};

	$scope.changeTypeDeal = function(type){
		if(!type || (type != 'news' && type != 'hot'))
			return

		$scope.typeFlux = type;
	}

	updateDeals();
}]);

module.service('DealsService', ['$http', function($http){

	this.getDeals = function(top, skip, callback){
		$http.get('/deals?$top='+top+'&$skip='+skip).success(function(data, status, headers, config){
          callback(data);
        })
	};

}]);