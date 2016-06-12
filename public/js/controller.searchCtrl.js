"use strict";

(function(){

  angular
  .module('search', [])
  .controller('SearchCtrl', function($scope, $http){

    $scope.input;
    $scope.tracks = [];
    $scope.nextLink;

    // grab input from search box
    $scope.getInput = function(){
      $scope.tracks = [];
      var input = $scope.input;
      input = input.split(' ').join('+');
      var inputUrl = 'https://api.soundcloud.com/search?q=' + input + '&limit=20&linked_partitioning&client_id=4f2b9615c8783056a2eae41eba103c48';
      return inputUrl;
    }
    // makes call to api
    $scope.loadSongs = function(url){
      return $http.get(url)
      .then(function(response){
        $scope.collection = response.data.collection;
        $scope.collection.forEach(function(track){
          $scope.tracks.push(track);
        });
        // if there is a url to get more data, show the load more button
        if(response.data.next_href){
          $scope.nextLink = response.data.next_href;
          $scope.showBtn = true;
        } else {
          $scope.showBtn = false;
        }
        // just to peep what comes back from the api call
        console.dir(response);
        });
    }
    // runs the search with user input and the AJAX
    $scope.search = function(){
      var myInput = $scope.getInput();
      $scope.loadSongs(myInput);
    }
    // triggers api call to get next round of data
    $scope.loadMore = function(){
      $scope.loadSongs($scope.nextLink);
    }

  })
})();

// https://api.soundcloud.com/resolve?url=http://soundcloud.com/factmag/drippin-silver-cloak-sudanim-remix&client_id=4f2b9615c8783056a2eae41eba103c48
