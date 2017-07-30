/**
 * Created by mahim on 28-07-2017.
 */

var feedsController = function ($scope, $state, $http) {

    // tags
    $scope.tags = ['General', 'Technology', 'Sports'];

    // feeda
    $scope.feeds = ["abc"];

    // tags for search
    $scope.tagRefine = ['General', 'Technology', 'Sports'];
    // added tags
    $scope.addedTags = [];

    // add Tag
    $scope.addTag = function (tag) {

        $scope.addedTags.push(tag);
        $scope.tagRefine.splice($scope.tagRefine.indexOf(tag), 1);
        document.getElementById("tagInput").value = "";
        $scope.searchTag = "";
    };

    // remove Tag
    $scope.removeTag = function (tag) {
        $scope.tagRefine.push(tag);
        $scope.addedTags.splice($scope.addedTags.indexOf(tag), 1);
    };



};

angular.module('myApp').controller('feedsController', feedsController);