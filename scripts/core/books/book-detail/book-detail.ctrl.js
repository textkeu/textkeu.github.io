angular
	.module('TruongHe')
	.controller('TruongHe.core.books.bookDetail.bookDetailCtrl', ['$rootScope', '$scope', '$stateParams', 'Book', 'Utils', function($rootScope, $scope, $stateParams, Book, Utils) {
		$scope.title = "Chi tiết Sách";
		$rootScope.mainTitle = ($stateParams.slugBook==''?'Error':$stateParams.slugBook);
	
		Book.getBook($stateParams.slugBook).then(function(dataBook){
			if(dataBook != null){
				$scope.book = dataBook;
				$rootScope.mainTitle = $scope.book.attributes.title;

				Book.getCommentOfBook($scope.book).then(function(dataComments){
					if(dataComments != null){
						$scope.bookComments = dataComments;
					}
				});
			}else{
				$rootScope.mainTitle = "Không tồn tại sách này.";
			}
		});

		$scope.commentBook = function(comment){
			//var currComment = comment;
			$scope.comment = null;
			Book.commentBook(comment, $scope.book).then(function(dataComment){
				if(dataComment != null){
					Book.getCommentOfBook($scope.book).then(function(dataComments){
						if(dataComments != null){
							$scope.bookComments = dataComments;
						}
					});
					$scope.comment = null;
					Utils.showToast("Gửi nhận xét thành công.");
				}else{
					$scope.comment = comment;
					Utils.showToast("Gửi nhận xét thất bại.");
				}
			});
		}
	}]);