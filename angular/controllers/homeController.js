/**
 * Created by mahim on 25-07-2017.
 */

var homeController = function ($scope, $state, $http) {
    $scope.showLogin = true;
    $scope.showSignup = false;
    $("#logIn").onclick(function () {
        $scope.showSignup = false;
        $scope.showLogin = true;
        console.log('login');
    });
    $("#signUp").onclick(function () {
        $scope.showLogin = false;
        $scope.showSignup = true;
        console.log('signup');
    })
};

angular.module('myApp').controller('homeController', homeController);

