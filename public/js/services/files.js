var app = angular.module('httpService', []);

	app.factory('Files', ['$http',function($http) {
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

	app.factory('Reports', ['$http',function($http) {
		return {
			get : function(fileID) {
				return $http.get('/api/reports/' + fileID);
			}
		}
	}]);