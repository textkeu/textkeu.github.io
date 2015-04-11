angular
	.module('TruongHe')
	.factory('Utils', function($mdToast, $animate){
		var DEBUG = true;
		var DEBUG_TAG = "TruongHe";
		return {
			convertStringToSlug : function(stringContent){
			    var slug = stringContent.trim();
			    //console.log("trim:"+slug);
			    slug = slug.toLowerCase();
			    //console.log("toLowerCase:"+slug);
			    slug = slug.replace(/\s{2,}/g, ' ');
			    //console.log("removeSpace:"+slug);
			    slug = slug.replace(/\s*-\s*/g, '-');
			    //console.log("sapceWithMinus:"+slug);
			    slug = slug.replace(/\s/g, '-');
			    //console.log("sapce2Minus:"+slug);
			    slug = slug.replace(/(á|à|ả|ã|ạ|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ)/g, "a");
			    //console.log("replace A:"+slug);
			    slug = slug.replace(/(đ)/g, "d");
			    //console.log("replace A:"+slug);
			    slug = slug.replace(/(é|è|ẻ|ẽ|ẹ|ế|ề|ể|ễ|ệ)/g, "e");
			    //console.log("replace E:"+slug);
			    slug = slug.replace(/(í|ì|ỉ|ĩ|ị)/g, "i");
			    //console.log("replace I:"+slug);
			    slug = slug.replace(/(ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ)/g, "o");
			    //console.log("replace O:"+slug);
			    slug = slug.replace(/(ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự)/g, "u");
			    //console.log("replace U:"+slug);
			    slug = slug.replace(/(ý|ỳ|ỷ|ỹ|ỵ)/g, "y");
			    //console.log("replace U:"+slug);
			    slug = slug.replace(/[^a-zA-Z0-9-]+/g, "");
			    //console.log("removeOther:"+slug);
			    return slug;
			},
			printLog : function(message){
				if(DEBUG){
					console.log(message);
				}	
			},
			printLogInfor : function(message, tag){
				if(DEBUG){
					if(tag == null || tag == ''){
						tag = DEBUG_TAG;
					}
					console.log(tag + " : " + message);
				}	
			},
			showToast : function(message, duration, where){
				$mdToast.show(
					$mdToast.simple()
					.content(message)
					.position(where != null? where : 'bottom right')
					.hideDelay(duration != null? duration : 3000)
				);
			},
			hideToast : function(){
				$mdToast.hide();
			}
		};
	});