var app = angular.module('dance', []);
app.controller('actionCtrl', function ($scope, $http) {
    $scope.hideProjList = false;
    console.log("Inside controller");
    $http.get("listProjects.php")
        .then(function (response) {
            console.log(response);
            $scope.projects = response.data;
        });

    $scope.projDetail = function (id) {
        console.log(id);
    }

    $scope.createProj = function () {
        console.log("Hello");
        $scope.showCreateProj = true;
        $scope.hideProjList = true;
    }

    $scope.saveProj = function () {
        var method = 'POST';
        var url = 'createProject.php';
        $scope.codeStatus = "";
        // var FormData = {
        //     'projName':$scope.projName,
        //     'projDescription': $scope.projDescription,
        //     'firstName': $scope.firstName,
        //     'lastName': $scope.lastName,
        //     'email': $scope
        // };

        $http({
            method: method,
            url: url,
            data: $scope.proj,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function (response) {
            console.log("respnse=");
            console.log(response);
            if (response.data.status == "200") {
                
            }

        });
        return false;

    }
});
// 