var app = angular.module('dance', ['ui.bootstrap.modal']);

// define a service, to read/update the dance database
app.factory('crudDB', function ($http) {
    var factory = {};
    factory.getPledgeN = function () {
        console.log("called getPledgeN");
        return $http.get("getPledgeN.php");

        // $http.get("getPledgeN.php")
        //     .then(function (response) {
        //         console.log("in Factory pledgeN = ")
        //         console.log(response);
        //         return response.data;
        //     });
    }
    return factory;
});

app.controller('actionCtrl', function ($scope, $http, crudDB) {

    $scope.pledgeN= {};
    crudDB.getPledgeN().then(function(result) {
        var p1=parseInt(result.data.pledge1);
        $scope.pledgeN.pledge1=p1.toLocaleString();
        var p2=parseInt(result.data.pledge2);
        $scope.pledgeN.pledge2=p2.toLocaleString();


    });

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
        $http.get("projDetail.php?id=" + id)
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