/**
 * Created by Admin on 02-Aug-17.
 */

var feedController = function ($scope, $state, $http, $stateParams, authStorageAccess) {

    var rotate = true;

    // access user data
    var userDetails = authStorageAccess.getData('userDetails');
    // check if logged in
    if(userDetails){
        console.log(userDetails);
        $scope.identity = userDetails.name;

        if (userDetails.img){
            $scope.imgLink = userDetails.img;
        }
        else {
            $scope.imgLink = "images/userImage.png";
        }


    }
    else {
        snackbar("Please Login to access this page");
        $state.go("home");
    }

    // request for feed
    $http(
        {
            method: 'GET',
            url: "http://localhost:3000/api/feeds/" + $stateParams.id
        }
    ).then(
        function successCallback(response) {
            var data = response.data;
            if (response.data.indexOf("Error") !== -1){
                snackbar("A problem has occurred. Please try again.");
                $state.reload();
            }
            else {
                $scope.feed = data;

            }
        }
    );

    // sign out
    $scope.signOut = function () {
        if (userDetails.img){
            gapi.load('auth2', function () {
                gapi.auth2.init();
            });
            try {
                var auth2 = gapi.auth2.getAuthInstance();
                auth2.signOut().then(function () {
                    console.log('User signed out.');
                });
            }
            catch (exp){
                snackbar("An Error Occurred. Please Try Again");
            }
        }
        authStorageAccess.setData("userDetails", "");
        $state.go('home');
    };

    // rotate caret
    $scope.rotateCaret = function () {
        if(rotate){
            $(".caret").removeClass("reset");
            $(".caret").addClass("rotate");
            rotate = false;
        }
        else{
            $(".caret").removeClass("rotate");
            $(".caret").addClass("reset");
            rotate = true;
        }
    };

};


angular.module('myApp').controller('feedController', feedController);