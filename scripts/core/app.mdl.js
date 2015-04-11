Parse.initialize("GyjxFpU7S5EdVZ29i9lKPuywEImOFu1SQKYX5mR3", "dFhNVjajGMHCu1POx8QxODnEtl49h6ckDalfPZ7z");

angular
	.module('TruongHe', [
		'ui.router',
		'ngMaterial',
		'ngSanitize'
		])
	.config(['$urlRouterProvider', '$stateProvider', '$mdThemingProvider', function($urlRouterProvider, $stateProvider, $mdThemingProvider){
		$mdThemingProvider.theme('blue');

		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('home', {
				title: 'Trang chủ',
				url: '/',
				views: {
			        "viewMainContent": { 
			        	templateUrl: 'scripts/core/homepage/homepage.tpl.html',
						controller: 'TruongHe.core.homepage.homePageCtrl'
			        },
			        "viewGenre": { 
			        	template: '',//'scripts/core/books/book-list/book-genre.tpl.html',
						controller: ''//'TruongHe.core.books.bookList.bookGenreCtrl'
			        },
			        "viewOther": { 
			        	template: '',//'scripts/core/books/book-list/book-other.tpl.html',
						controller: ''//'TruongHe.core.books.bookList.bookListCtrl'
			        }
			    }
			})
			// book
			.state('book', {
				title: 'Thư viện sách',
				url: '/sach',
				views: {
			        "viewMainContent": { 
			        	templateUrl: 'scripts/core/books/book-list/book-list.tpl.html',
						controller: 'TruongHe.core.books.bookList.bookListCtrl'
			        },
			        "viewGenre": { 
			        	templateUrl: 'scripts/core/books/book-list/book-genre.tpl.html',
						controller: 'TruongHe.core.books.bookList.bookGenreCtrl'
			        },
			        "viewOther": { 
			        	templateUrl: 'scripts/core/books/book-list/book-other.tpl.html',
						controller: ''
			        }
			    }
			})
			.state('book.list', {
				title: 'Liệt kê sách',
				url: '/the-loai/{slugGenre}',
				views: {
			        "viewMainContent@": { 
			        	templateUrl: 'scripts/core/books/book-list/book-list.tpl.html',
						controller: 'TruongHe.core.books.bookList.bookListCtrl'
			        },
			        "viewGenre@book": { 
			        	templateUrl: 'scripts/core/books/book-list/book-genre.tpl.html',
						controller: 'TruongHe.core.books.bookList.bookGenreCtrl'
			        },
			        "viewOther@book": { 
			        	templateUrl: 'scripts/core/books/book-list/book-other.tpl.html',
						controller: ''
			        }
			    }
			})
			.state('book-edit', {
				title: 'Thêm sách mới',
				url: '/cap-nhap/{slugBook}',
				views: {
			        "viewMainContent": { 
			        	templateUrl: 'scripts/core/books/book-edit/book-edit.tpl.html',
						controller: 'TruongHe.core.books.bookEdit.bookEditCtrl'
			        },
			        "viewGenre": { 
			        	templateUrl: 'scripts/core/books/book-list/book-genre.tpl.html',
						controller: 'TruongHe.core.books.bookList.bookGenreCtrl'
			        },
			        "viewOther": { 
			        	templateUrl: 'scripts/core/books/book-list/book-other.tpl.html',
						controller: ''
			        }
			    }
			})
			.state('book.detail', {
				title: 'Thông tin sách',
				url: '/{slugBook}',
				views: {
			        "viewMainContent@": { 
			        	templateUrl: 'scripts/core/books/book-detail/book-detail.tpl.html',
						controller: 'TruongHe.core.books.bookDetail.bookDetailCtrl'
			        },
			        "viewGenre@book": { 
			        	templateUrl: 'scripts/core/books/book-list/book-genre.tpl.html',
						controller: 'TruongHe.core.books.bookList.bookGenreCtrl'
			        },
			        "viewOther@book": { 
			        	templateUrl: 'scripts/core/books/book-list/book-other.tpl.html',
						controller: ''
			        }
			    }
			})
			// about
			.state('search', {
				title: 'Tìm kiếm',
				url: '/tim-kiem',
				views: {
			        "viewMainContent": { 
			        	templateUrl: 'scripts/core/search/search.tpl.html',
						controller: 'TruongHe.core.search.searchCtrl'
			        },
			        "viewGenre": { 
			        	template: '',
						controller: ''
			        },
			        "viewOther": { 
			        	template: '',
						controller: ''
			        }
			    }
			})
			// about
			.state('about', {
				title: 'Giới thiệu',
				url: '/gioi-thieu',
				views: {
			        "viewMainContent": { 
			        	templateUrl: 'templates/about.html',
						controller: ''
			        },
			        "viewGenre": { 
			        	template: '',
						controller: ''
			        },
			        "viewOther": { 
			        	template: '',
						controller: ''
			        }
			    }
			})
	}])
	.run(['$location', '$rootScope', '$state', 'Utils', function($location, $rootScope, $state, Utils) {
		$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams, error){
			if (toState.name=="book-list") {
				$rootScope.webtitle = "Trường Hệ : " + toState.title + " : " +toParams.slug;

			}else{
				$rootScope.webtitle = "Trường Hệ : " +  toState.title	
			}
		});
	}])
	.controller('mainCtrl', [ '$scope', '$mdSidenav', 'Utils', function($scope, $mdSidenav,  Utils) {
	  	$scope.toggleSlideNav = function(direction) {
	    	$mdSidenav(direction).toggle();
	  	};
	}])
	.controller('LeftCtrl', function($scope, $timeout, $mdSidenav, $log) {
	  	$scope.closeSlideNav = function() {
	    	$mdSidenav('left').close();
	  	};
	})
	.controller('RightCtrl', function($scope, $timeout, $mdSidenav, $log) {
	  	$scope.closeSlideNav = function() {
	    	$mdSidenav('right').close();
	  	};
	})
