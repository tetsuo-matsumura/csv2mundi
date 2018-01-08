angular.module('fileController', [])

	.controller('mainController', ['$scope','$http','Files', function($scope, $http, Files) {
		$scope.formData = {};
		$scope.loading = true;

		Files.get()
			.success(function(data) {
				$scope.files = data;
				$scope.loading = false;
				if ($scope.files.length == 0){
					$scope.isEmpty = false;
				}
			});

		$scope.uploadCSV = function() {

			if ($scope.fileData.name != undefined) {
				$scope.loading = true;
				if(fileData.type === 'text/csv'){

						Files.create($scope.fileData)
							.success(function(data) {
								$scope.loading = false;
								$scope.fileData = {};
								$scope.todos = data; 
							});
					}
			}
		};
}]);