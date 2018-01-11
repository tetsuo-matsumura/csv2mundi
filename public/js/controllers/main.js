angular.module('fileController', [])

	.controller('mainController', ['$scope','$http', '$rootScope','Files', 'Reports', function($scope, $http, $rootScope, Files, Reports) {
		
		$scope.loading = true;

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

		$scope.deleteFile = function(fileID) {
			$scope.loading = true;

			Files.delete(fileID)
				.success(function(data) {
					$scope.loading = false;
					$scope.files = data;
					$rootScope.$broadcast('RequestReload');
				});
		};
		$scope.openReport = function(fileID) {
			$scope.loading = true;
			Reports.get(fileID)
				.success(function(data) {
					$scope.loading = false;
					$scope.report = data;
				});

		}
}]);