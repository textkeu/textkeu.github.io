angular
	.module('TruongHe')
	.controller('TruongHe.core.books.bookList.bookGenreCtrl', ['$scope', '$stateParams', 'Book', function($scope, $stateParams, Book) {
		Book.getBookGenres().then(function(data){
			$scope.bookGenres = data;
		});
	}]);