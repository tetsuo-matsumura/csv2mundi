angular.module('httpService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Files', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/files');
			},
			create : function(fileData) {
				return $http.post('/api/upload', fileData);
			},
			delete : function(id) {
				return $http.delete('/api/files/' + id);
			}
		}
	}]);