/**
 * Created by mahim on 28-07-2017.
 */

var feedsController = function ($scope, $state, $http, authStorageAccess) {

    // tags
    $scope.tags = ['All', 'General', 'Technology', 'Sports', 'Art'];

    // feeds variable
    $scope.feeds = [{
        "title": "abcdefg",
        "tags": ["General", "casdd", "efdasd"],
        "author": "hello"
    }, {
        "title": "fkhehbfkjhbe",
        "tags": ["dcbksj", "Art", "efdasd"],
        "author": "hello"
    }, {
        "title": "ydhasjkbcsb",
        "tags": ["Art", "casdd", "efdasd"],
        "author": "hello"
    }, {
        "title": "sipowajgfvfdvhd",
        "tags": ["dkj", "casdd", "Sports"],
        "author": "hello"
    }];
    $scope.feedsCopy = $scope.feeds.slice(0);

    var rotate = true;

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

    // rotate caret
    $scope.rotateCaret = function () {
        if(rotate){
            $(".caret").removeClass("reset");
            $(".caret").addClass("rotate");
            rotate = false;
        }
        else{
            $(".caret").removeClass("rotate");
            $(".caret").addClass("reset");
            rotate = true;
        }
    };

    // request all feeds
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

    // sign out
    $scope.signOut = function () {
        if (userDetails.img){
            gapi.load('auth2', function () {
                gapi.auth2.init();
            });

            try {
                var auth2 = gapi.auth2.getAuthInstance();
                auth2.signOut().then(function () {
                    console.log('User signed out.');
                });
            }
            catch (exp){
                snackbar("An Error Occurred. Please Try Again");
            }

        }
        authStorageAccess.setData("userDetails", "");
        $state.go('home');
    };

    // hover effect on profile
    $('#MainProfileInfo').mouseenter(function () {
        $('#mainUserInfo').css('color','white')
    });
    $('#MainProfileInfo').mouseleave(function () {
        $('#mainUserInfo').css('color','dimgrey')
    });


    // filter feeds by tag
    $scope.filterFeeds  = function (tag) {
        $scope.feeds = $scope.feedsCopy.slice(0);
        if (tag !== "All"){
            var len = $scope.feeds.length;
            for (var i = 0; i < len; i++){
                if ($scope.feeds[i].tags.indexOf(tag) === -1){
                    $scope.feeds.splice(i, 1);
                    i--;
                    len--;
                }
            }
        }
    };



};

angular.module('myApp').controller('feedsController', feedsController);