/**
 * Created by mahim on 25-07-2017.
 */

var homeController = function ($scope, $state, $http) {

    // switching between signUp and logIn forms
    $scope.toggle = true;
    $scope.changeForm = function() {

        // reset form
        $scope.username = "";
        $scope.loginForm.username.$setUntouched();
        $scope.password = "";
        $scope.loginForm.password.$setUntouched();
        $scope.name = "";
        $scope.signupForm.username.$setUntouched();
        $scope.signupForm.password.$setUntouched();
        $scope.signupForm.name.$setUntouched();
        $scope.email = "";
        $scope.signupForm.email.$setUntouched();

        // toggle
        $scope.toggle = $scope.toggle === false;
    };

    // form validation
    $scope.unableSignup = false;
    $scope.dupUsername = false;
    $scope.invalidLogin = false;



    $scope.g = function () {
        $state.go('feeds');
        console.log("hi");
    }

};

angular.module('myApp').controller('homeController', homeController);

