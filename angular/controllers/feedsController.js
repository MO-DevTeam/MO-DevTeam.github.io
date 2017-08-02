/**
 * Created by mahim on 28-07-2017.
 */

var feedsController = function ($scope, $state, $http, authStorageAccess) {

    // tags
    $scope.tags = ['General', 'Technology', 'Sports'];
    $scope.feeds = [{
        "title": "abcdefg",
        "tags": ["abdawsd", "casdd", "efdasd"],
        "author": "hello"
    }];

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

    // tags for search
    // $scope.tagRefine = ['General', 'Technology', 'Sports'];
    // added tags
    // $scope.addedTags = [];

    // add Tag
    // $scope.addTag = function (tag) {
    //
    //     $scope.addedTags.push(tag);
    //     $scope.tagRefine.splice($scope.tagRefine.indexOf(tag), 1);
    //     document.getElementById("tagInput").value = "";
    //     $scope.searchTag = "";
    // };
    //
    // // remove Tag
    // $scope.removeTag = function (tag) {
    //     $scope.tagRefine.push(tag);
    //     $scope.addedTags.splice($scope.addedTags.indexOf(tag), 1);
    // };

    $http(
        {
            method: "GET",
            url: "http://localhost:3000/api/feeds"
        }
    ).then(
        function successCallback(response) {
            if (response.data.indexOf("Error") !== -1){
                snackbar("A problem has occurred. Please try again.");
                $state.reload();
            }
            else {
                // $scope.feeds = response.data;

            }
        }
    );


};

angular.module('myApp').controller('feedsController', feedsController);