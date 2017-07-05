angular.module('timeTrack')
.factory('timeTrackService',function($http){
	var service = {};
	
	var BASE_URL = 'http://localhost:8080/NgEventTracker/rest/games/'
	
		service.index = function(){
		return $http({
			method : 'GET',
			url : BASE_URL
		})

	};
	
	service.create = function(game){
		return $http({
			method : 'POST',
			url : BASE_URL,
		      headers : {
		          'Content-Type' : 'application/json'
		        },
		        data : game
		})
	};
	
	service.createTime = function(id){
		return $http({
			method : 'POST',
			url : BASE_URL + id + '/time',

		})
	};
	
	service.createEndTime = function(gid,tid){
		return $http({
			method : 'PUT',
			url : BASE_URL + gid + '/time/'+ tid,
			
		})
	};

	
	service.show= function(id){
		return $http({
			method : 'GET',
			url : BASE_URL + id,
		})
	}
	service.showTimeList= function(id){
		return $http({
			method : 'GET',
			url : BASE_URL + id +'/time',
		})
	}
	
	service.destroy = function (id){
		return $http({
			method : 'DELETE',
			url : BASE_URL + id,
		})
	}
	
	service.timeDestroy = function (gid,tid){
		return $http({
			method : 'DELETE',
			url : BASE_URL + gid +'/time/' + tid,
		})
	}
	
	service.update=function(game){
		return $http({
			method : 'PUT',
			url : BASE_URL+ game.id,
		      headers : {
		          'Content-Type' : 'application/json'
		        },
		        data : game
		})
	}
	
	
	
	
	return service;
});