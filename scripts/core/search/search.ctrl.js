angular
	.module('TruongHe')
	.controller('TruongHe.core.search.searchCtrl', ['$rootScope', '$scope', '$stateParams', 'Book', 'Utils', function($rootScope, $scope, $stateParams, Book, Utils) {
		$rootScope.mainTitle = "Tìm kiếm";

		$scope.search = function(search){
			if(search.topic == "" || search.keyword == ""){
				Utils.showToast("Vui lòng chọn thông tin tìm kiếm");
			}
			if(search.topic == 'book'){
				Utils.showToast("Đang tìm kiếm");
				Book.searchBook(search.keyword).then(function(data){
					if(data != null || data.length > 0){
						Utils.showToast('Tìm kiếm thành công!');
						$scope.books = data;
					}else{
						Utils.showToast('Không tìm thấy sách!');
					}
				});
			}else{
				Utils.showToast("Xin lỗi, chúng tôi chưa hỗ trợ chủ đề bạn chọn...");
			}
		}
	}]);