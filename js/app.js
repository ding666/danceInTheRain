var app = angular.module('dance', []);
app.controller('actionCtrl', function($scope, $http) {
    console.log("Inside controller");
   $http.get("listProjects.php")
   .then(function (response) {
       console.log(response);
       $scope.projects = response.data;
    });
});
 