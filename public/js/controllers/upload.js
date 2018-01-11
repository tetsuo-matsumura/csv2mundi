angular.module('fileUpload', ['ngFileUpload'])

    .controller('uploadController', ['$scope', 'Upload', '$timeout', '$http', '$rootScope', function ($scope, Upload, $timeout, $http, $rootScope) {
        $scope.$watch('file', function () {
            $scope.upload($scope.file);
        });

        $scope.log = '';

        $scope.upload = function (file) {
            if (file && file.length) {
                for (var i = 0; i < file.length; i++) {
                  var file = file[i];
                  if (!file.$error) {
                    $scope.loading = true;
                    $scope.log = 'Received ' + file.name + '\n' + $scope.log;
                    Upload.upload({
                        url: '/api/upload',
                        method: 'POST',
                        file: file  
                    }).then(function (resp) {
                        $timeout(function() {
                            $scope.log = 'file: ' +
                            file.name +
                            ' was saved as: ' + JSON.stringify(resp.data.path) +
                            '\n' + $scope.log;
                            $scope.loading = false;
                            $scope.uploadPercentage = 0;
                            //$scope.log = $scope.log + JSON.stringify(resp.data); //DEBUG
                            var req = {
                                method: 'POST',
                                url: '/api/files',
                                data: {
                                    "name": resp.data.originalFilename,
                                    "path": resp.data.path
                                }
                            }

                            $http(req).then(function (res){
                                $scope.log = "Data saved to database.\n" + $scope.log;
                                $rootScope.$broadcast('RequestReload');
                            }, function(err){
                                $scope.log = "Failed to save data to database.\n" + $scope.log;
                            });
                        });

                    }, null, function (evt) {
                        var progressPercentage = parseInt(100.0 *
                        		evt.loaded / evt.total);
                        $scope.uploadPercentage = progressPercentage;
                    });
                  }
                }
            }
        };
    }]).filter("trust", ['$sce', function($sce) {
  return function(htmlCode){
    return $sce.trustAsHtml(htmlCode);
  }
}]);