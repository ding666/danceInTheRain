var app = angular.module('dance', ['ui.bootstrap.modal']);

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('responseObserver');
});

app.factory('responseObserver', function responseObserver($q, $window) {
    return {
        'responseError': function (errorResponse) {
            switch (errorResponse.status) {
                case 403:
                    //            $window.location = './403.html';
                    console.log("Got a 403 error");
                    break;
                case 500:
                    $window.location = './500.html';
                    break;
            }
            return $q.reject(errorResponse);
        }
    };
});

// define a service, to read/update the dance database
app.factory('crudDB', function ($http) {
    var factory = {};
    factory.getPledgeN = function () {
  //      console.log("called getPledgeN");
        return $http.get("getPledgeN.php");

        // $http.get("getPledgeN.php")
        //     .then(function (response) {
        //         console.log("in Factory pledgeN = ")
        //         console.log(response);
        //         return response.data;
        //     });
    }
    factory.setPledgeN = function (p1, p2) {
        // we should use put, instead of get in the following. However. justhost
        // forbidden put method unless we set a htaccess file
        return $http.get("setPledgeN.php?p1="+p1+"&"+"p2="+p2);
        //      return $http.put("setPledgeN.php?p1="+p1+"&"+"p2="+p2);
        // return $http.put("setPledgeN.php?",
        // {},
        // {params: {p1: p1, p2: p2}} );

    }
    return factory;
});

app.controller('rainCtrl', function ($scope, $http, crudDB) {

    var pledge1 = 0;
    var pledge2 = 0;
    $scope.pledgeN = {};
    crudDB.getPledgeN().then(function (result) {
        pledge1 = parseInt(result.data.pledge1);
        $scope.pledgeN.pledge1 = pledge1.toLocaleString();
        pledge2 = parseInt(result.data.pledge2);
        $scope.pledgeN.pledge2 = pledge2.toLocaleString();
    });

    $scope.Ipledge = function (pledgeN) {
        if (pledgeN == 1) {
            pledge1++;
            $scope.pledgeN.pledge1 = pledge1.toLocaleString();
        } else {
            pledge2++;
            $scope.pledgeN.pledge2 = pledge2.toLocaleString();
        }
        crudDB.setPledgeN(pledge1, pledge2).then(function (result) {
            console.log("pledge good result=");
            console.log(result);
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log("pledge error result=");
            console.log(response);

        });
    };

    $scope.hideProjList = false;
    //     $scope.showCreateProj = true;
    // console.log("Inside controller");
    $http.get("listProjects.php")
        .then(function (response) {
     //       console.log(response);
            $scope.projects = response.data;
        });

    $scope.projDetail = function (id) {
  //      console.log(id);
        $scope.showJoinProj = true;
        $http.get("projDetail.php?id=" + id)
            .then(function (response) {
   //             console.log("project detail:")
   //             console.log(response);
                $scope.proj = {};
                $scope.projInfo = response.data;
            });
    }

    $scope.joinProj = function () {
        console.log( "asdf in joinProj");
        console.log ("id =", $scope.projInfo.id); 
        console.log("proj=", $scope.projInfo);
    
        var paraObj = $scope.proj;
        paraObj.projID = $scope.projInfo.id; 
     
        var method = 'POST';
        var url = 'joinProject.php';
        $scope.codeStatus = "";

        // in the following, data is assigned to $scope.proj, which is bounded
        // with proj.name, proj.description etc in index.html
        
        $http({
            method: method,
            url: url,
            data: paraObj,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function (response) {
            console.log("respnse=");
            console.log(response);
            if (response.status == "200") {
                $http.get("joinProject.php")
                    .then(function (response) {
                        console.log(response);
  //                      $scope.projects = response.data;
                    });
                $scope.showModal = true;
                console.log("show modal");
                $scope.showCreateProj = false;
                $scope.hideProjList = false;
                $scope.showJoinProj = false;
                $scope.showJoinedProj = false;

                $("#joinProjModal").modal();
  //              $scope.projName = response.config.data.projName;
                    console.log("asdf passed data=", response.config.data)
            }

        });
        return false;
    }

    $scope.cancelJoinProj = function () {
        console.log("asdf");
        $scope.showJoinProj = false; 
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

        // in the following, data is assigned to $scope.proj, which is bounded
        // with proj.name, proj.description etc in index.html
        
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