angular
	.module('TruongHe')
	.controller('TruongHe.core.books.bookList.bookListCtrl', ['$rootScope', '$scope', '$state', '$stateParams', 'Book', function($rootScope, $scope, $state, $stateParams, Book) {
		if($stateParams.slugGenre){
			$rootScope.mainTitle = ($stateParams.slugGenre==''?'Thư viện sách':$stateParams.slugGenre);
		}else{
			$rootScope.mainTitle = "Thư viện sách";
		}

		var slugGenre = !$stateParams.slugGenre?'':$stateParams.slugGenre;
		var BOOK_PER_PAGE = 12;
		$scope.pageCurrent = 0;
		$scope.pageTotal = 0;

		var pageHistory = {};

		Book.getBookInGenre(slugGenre, BOOK_PER_PAGE, 0).then(function(data){
			$scope.books = data;
			if($scope.books != null && $scope.books.length > 0){
				$scope.pageCurrent = 1;
				pageHistory[$scope.pageCurrent] = $scope.books;
				Book.countBookInGenre(slugGenre).then(function(dataCount){
					$scope.pageTotal = Math.ceil(dataCount / BOOK_PER_PAGE);
				});
			}else{
				$scope.pageCurrent = 0;
			}
		});

		$scope.viewPage = function(page){
			if(page != $scope.pageCurrent){
        		$scope.pageCurrent = page;
        		$scope.books = {};
        		if(pageHistory[page] != null){
					$scope.books = pageHistory[page];
				}else{
					var skip = ($scope.pageCurrent - 1) * BOOK_PER_PAGE;
	        		Book.getBookInGenre(slugGenre, BOOK_PER_PAGE, skip).then(function(data){
						$scope.books = data;
						pageHistory[$scope.pageCurrent] = $scope.books;
					});
				}
		    }
		}
	}]);