/**
 * Created by Admin on 02-Aug-17.
 */

var feedController = function ($scope, $state, $http, $stateParams, authStorageAccess) {

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


};


angular.module('myApp').controller('feedController', feedController);