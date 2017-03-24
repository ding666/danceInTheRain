var app = angular.module('dance', ['ui.bootstrap.modal']);
app.controller('actionCtrl', function ($scope, $http) {
    $scope.hideProjList = false;
//     $scope.showCreateProj = true;
    console.log("Inside controller");
    $http.get("listProjects.php")
        .then(function (response) {
            console.log(response);
            $scope.projects = response.data;
        });

    $scope.projDetail = function (id) {
        console.log(id);
        $scope.showJoinProj = true;
        $http.get("projDetail.php?id="+id)
            .then(function (response) {
                console.log("project detail:")
                console.log(response);
                $scope.projInfo = response.data;
            });
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

        $http({
            method: method,
            url: url,
            data: $scope.proj,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function (response) {
            console.log("respnse=");
            console.log(response);
            if (response.status == "200") {
                $http.get("listProjects.php")
                    .then(function (response) {
                        console.log(response);
                        $scope.projects = response.data;
                    });
                $scope.showModal = true;
                console.log("show modal");
                $scope.showCreateProj = false;
                $scope.hideProjList = false;
                $("#myModal").modal();
                $scope.projName = response.config.data.projName;
            }

        });


        return false;

    }

    $scope.cancelProj = function () {
        $scope.showCreateProj = false;
        $scope.hideProjList = false;
    }
});
// 