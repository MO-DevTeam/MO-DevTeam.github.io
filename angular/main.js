/**
 * Created by mahim on 25-07-2017.
 */



var app = angular.module('myApp', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    // states router
    $stateProvider.
        state('home', {
            url: '/home',
            templateUrl: 'partials/home.html',
            controller: 'homeController'
    }).
        state('feeds', {
            url: '/feeds',
            templateUrl: 'partials/feeds.html',
            controller: 'feedsController'
    });



});

// snackbar
var snackbar = function (str) {
    var x = document.getElementById("snackbar");
    x.innerHTML = str;
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
};