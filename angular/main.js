/**
 * Created by mahim on 25-07-2017.
 */

var app = angular.module('myApp', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');

    $stateProvider.
        state('home', {
            url: '/home',
            templateUrl: 'partials/home.html',
            controller: 'homeController'
    })
});
