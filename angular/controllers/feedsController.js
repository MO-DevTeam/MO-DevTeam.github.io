/**
 * Created by mahim on 28-07-2017.
 */

var feedsController = function ($scope, $state, $http) {

    $scope.tags = ['General', 'Technology', 'Sports'];

    $scope.feeds = ["abc", "bca", "cba"];
    $scope.tagRefine = [];
    $scope.searchTag = "";

    $scope.search = function () {
        $scope.tagRefine  = [];
        for (var i=0; i<3; i++){
            if($scope.tags[i].indexOf($scope.searchTag) !== -1){
                console.log($scope.searchTag);
                $scope.tagRefine.push($scope.tags[i]);
            }
        }
        console.log($scope.tagRefine)
    }

};

angular.module('myApp').controller('feedsController', feedsController);