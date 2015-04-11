angular
	.module('TruongHe')
	.factory('Book', ['$rootScope', '$q', 'Utils', function($rootScope, $q, Utils){
		return {
			countBookInGenre: function(slugGenre){
				var deferred = $q.defer();
				var BookObject = Parse.Object.extend("Book");
				var query = new Parse.Query(BookObject);
				query.descending("updatedAt");

				if(slugGenre && slugGenre!=''){
			        var BookGenreObject = Parse.Object.extend("BookGenre");
					var queryGenre = new Parse.Query(BookGenreObject);
			        queryGenre.equalTo("slug", slugGenre);
			        queryGenre.first({
					    success: function(bookGenre) {
					    	query.equalTo("genre", bookGenre);
					    	query.count({
							    success: function(count) {
							    	deferred.resolve(count);
							    },
							    error: function(count, error) {
							        deferred.reject(0);
							    }
							});
					    },
					    error: function(count, error) {
					        //console.log("Error: " + error.code + " " + error.message);
					        deferred.resolve(0);
					    }
					});
			    }else{
			    	query.count({
					    success: function(count) {
					    	deferred.resolve(count);
					    },
					    error: function(count, error) {
					        deferred.reject(0);
					    }
					});
			    }
				return deferred.promise;
			},
			getBookInGenre: function(slugGenre, limit, skip){
				//Utils.printLogInfor(slugGenre + "/"+limit+"/"+skip);
				var deferred = $q.defer();
				var BookObject = Parse.Object.extend("Book");
				var query = new Parse.Query(BookObject);
				query.limit(limit);
				query.skip(skip);
				query.descending("updatedAt");

				if(slugGenre && slugGenre!=''){
			        var BookGenreObject = Parse.Object.extend("BookGenre");
					var queryGenre = new Parse.Query(BookGenreObject);
			        queryGenre.equalTo("slug", slugGenre);
			        queryGenre.first({
					    success: function(bookGenre) {
					    	query.equalTo("genre", bookGenre);
					    	query.find({
							    success: function(books) {
							    	deferred.resolve(books);
							    },
							    error: function(books, error) {
							        deferred.reject(null);
							    }
							});
					    },
					    error: function(bookGenre, error) {
					        //console.log("Error: " + error.code + " " + error.message);
					        deferred.resolve(null);
					    }
					});
			    }else{
			    	query.find({
					    success: function(books) {
					    	deferred.resolve(books);
					    },
					    error: function(books, error) {
					        deferred.reject(null);
					    }
					});
			    }
				return deferred.promise;
			},
			getBook: function(slugBook){
				var deferred = $q.defer();
				var BookObject = Parse.Object.extend("Book");
				var query = new Parse.Query(BookObject);
		        query.equalTo("slug", slugBook);
		        query.include('genre');
		        query.include('series');
		        query.first({
				    success: function(book) {
				    	//console.log(book);
				    	deferred.resolve(book);
				    },
				    error: function(book, error) {
				        //console.log("Error: " + error.code + " " + error.message);
				        deferred.resolve(null);
				    }
				});
				return deferred.promise;
			},
			searchBook: function(keyword){
				var deferred = $q.defer();
				var BookObject = Parse.Object.extend("Book");
				var query = new Parse.Query(BookObject);
				query.limit(100);
				query.descending("updatedAt");
		        query.include('genre');
		        var regex = ".*"+Utils.convertStringToSlug(keyword)+".*";
		        query.matches("slug", regex);
		        query.find({
				    success: function(books) {
				    	deferred.resolve(books);
				    },
				    error: function(books, error) {
				        //console.log("Error: " + error.code + " " + error.message);
				        deferred.resolve(null);
				    }
				});
				return deferred.promise;
			},
			// comment
			getCommentOfBook: function(book){
				var deferred = $q.defer();
				var BookObject = Parse.Object.extend("BookComment");
				var query = new Parse.Query(BookObject);
				query.descending("updatedAt");
				query.equalTo("book", book);

			    query.find({
				    success: function(comments) {
				    	deferred.resolve(comments);
				    },
				    error: function(books, error) {
				        //console.log("Error: " + error.code + " " + error.message);
				        deferred.reject(error);
				    }
				});
				return deferred.promise;
			},
			commentBook: function(comment, book){
				var deferred = $q.defer();
				var BookCommentObject = Parse.Object.extend("BookComment");
				var bookCommentObject = new BookCommentObject();
				bookCommentObject.set("name", comment.attributes.name);
				bookCommentObject.set("email", comment.attributes.email);
				bookCommentObject.set("isPublic", true);
				bookCommentObject.set("content", comment.attributes.content);
				bookCommentObject.set("book", book);
				if($rootScope.currentUser != null){
					bookCommentObject.set("replyBy", $rootScope.currentUser);
				}
				bookCommentObject.save(null, {
					success: function(data) {
					    // Execute any logic that should take place after the object is saved.
					    deferred.resolve(data);
					},
					error: function(data, error) {
					    // Execute any logic that should take place if the save fails.
					    // error is a Parse.Error with an error code and message.
					    //Utils.printLog('Failed to create new object, with error code: ' + error.message);
						deferred.resolve(null);
					}
				});
				return deferred.promise;
			},
			//book genre
			getBookGenres: function(){
				var deferred = $q.defer();
				var BookGenreObject = Parse.Object.extend("BookGenre");
				var query = new Parse.Query(BookGenreObject);
				query.equalTo("isPublic", true);
				query.ascending("name");
		        query.find({
				    success: function(bookGenres) {
				    	deferred.resolve(bookGenres);
				    },
				    error: function(bookGenres, error) {
				        //console.log("Error: " + error.code + " " + error.message);
				        deferred.resolve(null);
				    }
				});
				return deferred.promise;
			}
		};
	}]);