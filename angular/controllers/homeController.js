/**
 * Created by mahim on 25-07-2017.
 */

var homeController = function ($scope, $state, $http) {

    // switching between signUp and logIn forms
    $scope.toggle = true;
    $scope.changeForm = function() {
        $scope.toggle = $scope.toggle === false ? true: false;
    };


};

angular.module('myApp').controller('homeController', homeController);

