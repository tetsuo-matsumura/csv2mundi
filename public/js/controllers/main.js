angular.module('fileController', [])

	.controller('mainController', ['$scope','$http', '$rootScope','Files', 'Reports', 'Parse', 'Transaction', function($scope, $http, $rootScope, Files, Reports, Parse, Transaction) {
		
		$scope.loading = true;
		$scope.parsing = false;

		Files.get()
			.success(function(data) {
				$scope.files = data;
				$scope.waiting = [];
				$scope.ok = [];
				$scope.error = [];

				for (var i = 0, len = data.length; i < len; i++) {
					if(data[i].status == 0){
					$scope.waiting.push(data[i]);
					}
					if(data[i].status == 1){
					$scope.ok.push(data[i]);
					}
					if(data[i].status > 1 || typeof(data[i].status) != "number"){
					$scope.error.push(data[i]);
					}
				}
				console.log(data);
				$scope.loading = false;
				if ($scope.files.length == 0){
					$scope.isEmpty = false;
				}else{
					$scope.isEmpty = true;
				}
			});

		$rootScope.$on('RequestReload', function(){
			Files.get()
				.success(function(data) {
					$scope.files = data;
					$scope.waiting = [];
					$scope.ok = [];
					$scope.error = [];
					for (var i = 0, len = data.length; i < len; i++) {
						if(data[i].status == 0){
						$scope.waiting.push(data[i]);
						}
						if(data[i].status == 1){
						$scope.ok.push(data[i]);
						}
						if(data[i].status > 1 || typeof(data[i].status) != "number"){
						$scope.error.push(data[i]);
						}
					}

					$scope.loading = false;
					if ($scope.files.length == 0){
						$scope.isEmpty = false;
					}else{
						$scope.isEmpty = true;
					}
				});
		});

		$rootScope.$on('RequestReloadReport', function(event, opt){
		$scope.loading = true;
		$scope.parsing = false;
		Reports.get(opt.fileID)
			.success(function(data) {
				$scope.loading = false;
				$scope.report = data;
				///////////////////
				// PARSE STATUS 
				///////////////////
				if(data[0].parseStatus == 0){
					$scope.parseStatus = ['label-info','Waiting', false];
				};
				if (data[0].parseStatus == 1){
					$scope.parseStatus = ['label-success','OK', true];
				};
				if (data[0].parseStatus !== 0 && data[0].parseStatus !== 1){
					$scope.parseStatus = ['label-warning','Error', false];					
				};
				///////////////////
				// PROCESS STATUS 
				///////////////////
				if(data[0].processStatus == 0){
					$scope.processStatus = ['label-info','Waiting', false];
				};
				if (data[0].processStatus == 1){
					$scope.parseStatus = ['label-success','OK', true];
				};
				if (data[0].processStatus !== 0 && data[0].processStatus !== 1){
					$scope.processStatus = ['label-warning','Error', false];					
				};
				$scope.lastpage = false;
				$rootScope.$broadcast('getTransaction', {fileID: data[0].fileID,page: 1});
			});
		});

		$scope.deleteFile = function(fileID) {
			$scope.loading = true;

			Files.delete(fileID)
				.success(function(data) {
					$scope.loading = false;
					$scope.files = data;
					$rootScope.$broadcast('RequestReload');
				});
		};

		$rootScope.$on('getTransaction', function(event, opt){
			$scope.loading = true;
			Transaction.get(opt.fileID,0)
				.success(function(data){

					$scope.loading = false;
					$scope.transaction = data;
					$scope.page = opt.page;
			});
		});

		$scope.getTransaction = function(fileID, page) {
			if(page != 0){
				$rootScope.$broadcast('getTransaction', {fileID: fileID,page: 0});
			};
		};

		$scope.openReport = function(fileID) {
			$scope.loading = true;
			Reports.get(fileID)
				.success(function(data) {
					if (data[0].parseStatus > 0){
					$scope.loading = false;
					}
					$scope.report = data;
					///////////////////
					// PARSE STATUS 
					///////////////////
					if(data[0].parseStatus == 0){
						$scope.parseStatus = ['label-info','Waiting', false];
					};
					if (data[0].parseStatus == 1){
						$scope.parseStatus = ['label-success','OK', true];
					};
					if (data[0].parseStatus !== 0 && data[0].parseStatus !== 1){
						$scope.parseStatus = ['label-warning','Error', false];					
					};
					///////////////////
					// PROCESS STATUS 
					///////////////////
					if(data[0].processStatus == 0){
						$scope.processStatus = ['label-info','Waiting', false];
					};
					if (data[0].processStatus == 1){
						$scope.parseStatus = ['label-success','OK', true];
					};
					if (data[0].processStatus !== 0 && data[0].processStatus !== 1){
						$scope.processStatus = ['label-warning','Error', false];					
					};
					$scope.lastpage = false;
					$rootScope.$broadcast('getTransaction', {fileID: data[0].fileID,page: 0});
				});
		};

		$scope.parseFile = function(fileID) {
			$scope.loading = true;
			$scope.parsing = true;
			Parse.get(fileID)
				.success(function(data) {
					$scope.loading = false;
					$rootScope.$broadcast('RequestReloadReport', {fileID: fileID});
				});

		};
}]);