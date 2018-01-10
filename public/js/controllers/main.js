angular.module('fileController', [])

	.controller('mainController', ['$scope','$http', '$rootScope','Files', function($scope, $http, $rootScope, Files) {
		
		$scope.loading = true;

		function checkStatus(status) {
 		  return status >= 18;
		};


		Files.get()
			.success(function(data) {
				$scope.files = data;
				console.log(data);
				$scope.waiting= [];
				$scope.ok= [];
				for (var i = 0, len = data.length; i < len; i++) {
					if(data[i].status == 0){
					$scope.waiting.push(data[i]);
					console.log($scope.waiting);
					}
					if(data[i].status == 1){
					$scope.ok.push(data[i]);
					console.log($scope.ok);
					}
				}

				$scope.loading = false;
				if ($scope.files.length == 0){
					$scope.isEmpty = false;
				}else{
					$scope.isEmpty = true;
				}
			});
		$rootScope.$on('NewUploadEntry', function(){
			Files.get()
				.success(function(data) {
					$scope.files = data;
					console.log(data);
					$scope.waiting= [];
					$scope.ok= [];
					for (var i = 0, len = data.length; i < len; i++) {
						if(data[i].status == 0){
						$scope.waiting.push(data[i]);
						console.log($scope.waiting);
						}
						if(data[i].status == 1){
						$scope.ok.push(data[i]);
						console.log($scope.ok);
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
}]);