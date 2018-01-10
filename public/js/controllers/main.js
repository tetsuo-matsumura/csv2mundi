angular.module('fileController', [])

	.controller('mainController', ['$scope','$http','Files', function($scope, $http, Files) {
		$scope.formData = {};
		$scope.loading = true;

		Files.get()
			.success(function(data) {
				$scope.files = data;
				console.log(data);
				$scope.loading = false;
				if ($scope.files.length == 0){
					$scope.isEmpty = false;
				}else{
					$scope.isEmpty = true;
				}
			});
}]);