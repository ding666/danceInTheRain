var app = angular.module('dance', []);
app.controller('danceCtrl', function($scope, $http) {
   $http.get("listProjects.php")
   .then(function (response) {
       console.log(respnse);
       $scope.names = response.data.records;
    });
});
