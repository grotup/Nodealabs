var module = angular.module('DealController', []);

module.controller('DealsController',['$scope', 'DealsService', '$interval', function($scope,DealsService,$interval){
	$scope.nbDealsPage = [10, 20, 50, 100];
	$scope.top = 10;
	$scope.skip = 0;
	$scope.deals= [];
	$scope.typeFlux = "news";
	$scope.canNext = $scope.top + $scope.skip < 500;
	$scope.canPrevious = $scope.skip > 0;

	

	updateDeals = function(){
		DealsService.getDeals($scope.typeFlux, $scope.top, $scope.skip, function(data){
			$scope.deals = data;
			$scope.deals.forEach(function(element, index, array){
				var date = new Date();
	        	date.setTime(element.published_at);
				element.date = date;
			});
		});
	};

	$scope.nextPage = function(){
		if($scope.top + $scope.skip < 500){
			$scope.skip = $scope.skip+10;
			updateDeals();
		}
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
		if(!type || (type != 'news' && type != 'hots'))
			return;

		$scope.skip = 0;
		$scope.typeFlux = type;

		updateDeals();
	};

	updateDeals();
}]);

