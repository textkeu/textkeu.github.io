angular
	.module('TruongHe')
	.controller('TruongHe.core.homepage.homePageCtrl', ['$rootScope', '$scope', function($rootScope, $scope) {
		$scope.title = "Trang chủ";
		$rootScope.mainTitle = "Trang chủ";
	}]);