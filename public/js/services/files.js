var app = angular.module('httpService', []);

	app.factory('Files', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/files');
			},
			create : function(fileData) {
				return $http.post('/api/upload', fileData);
			},
			delete : function(fileID) {
				return $http.delete('/api/files/' + fileID);
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