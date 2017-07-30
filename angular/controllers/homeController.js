/**
 * Created by mahim on 25-07-2017.
 */

var homeController = function ($scope, $state, $http, authStorageAccess) {

    $scope.switch = false;

    // switching between signUp and logIn forms
    $scope.toggle = true;

    $scope.openNav = function () {
        document.getElementById("mySidenav").style.width = "250px";
        document.getElementById("main").style.marginLeft = "350px";
        $('#open').css('opacity','0');
        $('#open').css('cursor','default');
    };

    $scope.closeNav = function () {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main").style.marginLeft= "0";
        $('#open').css('opacity','1');
        $('#open').css('cursor','pointer');
    };


    var userDetails = authStorageAccess.getData('userDetails');

    if(userDetails){
        $scope.switch = $scope.switch === false;
    }

    var clearForm = function () {
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
    };

    $scope.changeForm = function() {
        clearForm();
        // toggle
        $scope.toggle = $scope.toggle === false;
    };

    // form validation
    $scope.unableSignup = false;
    $scope.dupUsername = false;
    $scope.invalidLogin = false;
    
    $scope.loginButton = function () {
        if ($scope.loginForm.$valid) {
            var loginData = {
                "password": $scope.password
            };
            var loginUrl = "https://localhost:3000/api/users/" + $scope.username;
            $http({
                method: 'POST',
                url: loginUrl,
                data: loginData
            }).then(
                function successCallback(response) {
                    var data = response.data;

                    if (data.indexOf("DB Error") !== -1){
                        snackbar("A problem has occurred. Please try again.");
                        $state.reload();
                    }
                    else if (data.indexOf("Error") !== -1){
                        $scope.invalidLogin = true;
                        clearForm();
                    }
                    else {
                        $http(
                            {
                                method: 'GET',
                                url: loginUrl
                            }
                        ).then(
                            function successCallback(response) {
                                userDetails = response.data[0];
                                authStorageAccess.setData("userDetails", userDetails);

                                $state.reload();
                            }
                        )

                    }

                }
            );
        }
    };

    $scope.signupButton = function () {
        if ($scope.signupForm.$valid) {
            var signupData = {
                "username": $scope.username,
                "password": $scope.password,
                "email": $scope.email,
                "name": $scope.name
            };
            var signupUrl = "https://localhost:3000/api/users";
            $http({
                method: 'POST',
                url: signupUrl,
                data: signupData
            }).then(
                function successCallback(response) {
                    var data = response.data;

                    if (data.indexOf("DB Error") !== -1){
                        snackbar("A problem has occurred. Please try again.");
                        clearForm();
                    }
                    else {
                        authStorageAccess.setData("userDetails", userDetails);
                        $state.reload();
                    }
                }
            );
        }
    };


     // google sign in
     $scope.signIn = function() {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signIn().then(function () {
            console.log('User signed in.');
            $state.go('feeds');
//            document.getElementById('gSignInBtn').innerHTML = 'Sign Out';
//            $('#gSignInBtn').attr('onClick','signOut()');
        });
    };


};

angular.module('myApp').controller('homeController', homeController);

