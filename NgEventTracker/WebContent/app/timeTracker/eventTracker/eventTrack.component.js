angular.module('timeTrack').component('timeTracker',{
	templateUrl: 'app/timeTracker/eventTracker/eventTracker.component.html',
	controller : function(timeTrackService) {
		var vm = this;
		vm.gList = [];
		vm.currentPlay = null;
		vm.showMain=true;
		vm.showCreate=false;
		vm.showPlay=false;
		vm.showEdit = false;
		vm.currentTime = null;
		vm.editGame = null;
		
		
		vm.edit = function(){
			delete vm.editGame.hour;
			delete vm.editGame.minute;
			delete vm.editGame.second;
			console.log(vm.editGame);
			timeTrackService.update(vm.editGame).then(function(res){
				console.log(vm.editGame);
				vm.load();
			});
		};
		
		vm.load = function() {
			timeTrackService.index().then(function(response) {
				vm.gList = response.data.sort(function(a, b) {
					return a.id - b.id;
				});
				accumultatedTime();
				console.log(vm.gList);
			});
		};
		
		vm.load();
		
		var accumultatedTime = function(){
			vm.gList.forEach(function(val,index,array){
				var timeee= 0;
			
				val.timeList.forEach(function(tval,tindex,tarray){
					if(tval.endTime == null){
						timeee += 0;
					}
					else{
					timeee += tval.endTime - tval.startTime;
					}
				});
				
				console.log(timeee);
				
				var hr = Math.floor(timeee / 3600000);
				
				var remaining = timeee - (hr * 3600000);
				
				var min = Math.floor(remaining / 60000);
				
				remaining = remaining - (min * 60000);
				
				var sec = Math.floor(remaining / 1000);
				
				val.hour = hr;
				val.minute = min;
				val.second = sec;
				
			});
			
			
		}
		
		vm.startPlay = function(gid){
			
			timeTrackService.createTime(gid).then(function(res){
				vm.currentTime=res.data;
			});
		}
		
		vm.stopPlay = function(){
			
			timeTrackService.createEndTime(vm.currentPlay.id,vm.currentTime.id).then(function(res){
				vm.currentTime=null;
				vm.currentPlay=null;
				vm.load();
			});
		}
	
		vm.addGame = function(game){
			timeTrackService.create(game).then(function(res){
				vm.load();
			});
		}
		
		vm.deleteGame = function(gid){
			timeTrackService.destroy(gid).then(function(res){
				vm.load();
			})
		}
		
		
	},
	controllerAs : 'vm'
});