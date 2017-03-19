var app = angular.module('dance', []);
app.controller('actionCtrl', function($scope, $http) {
    $scope.hideProjList = false;
    console.log("Inside controller");
   $http.get("listProjects.php")
   .then(function (response) {
       console.log(response);
       $scope.projects = response.data;
    });

    $scope.projDetail = function(id) {
        console.log(id);
    }
 
    $scope.createProj = function() {
        console.log("Hello");
        $scope.showCreateProj = true;
        $scope.hideProjList = true;
    }
});
 