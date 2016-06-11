"use strict";

(function(){

  angular
  .module('controllers', [])
  .controller('SearchCtrl', function($scope, $http){
    // grab input from search box
    $scope.input;
    $scope.tracks = [];
    $scope.nextLink;
    var url;

    $scope.getInput = function(){
      var input = $scope.input;
      input = input.split(' ').join('+');
      var inputUrl = 'https://api.soundcloud.com/search?q=' + input + '&limit=20&linked_partitioning&client_id=4f2b9615c8783056a2eae41eba103c48';
      return inputUrl;
    }
    $scope.loadSongs = function(url){
      return $http.get(url)
      .then(function(response){
        $scope.collection = response.data.collection;
        $scope.collection.forEach(function(track){
          $scope.tracks.push(track);
        });
        $scope.nextLink = response.data.next_href;
        console.dir(response);
        console.log($scope.nextLink);
        });
    }

    $scope.search = function(){
      var myInput = $scope.getInput();
      $scope.loadSongs(myInput);
    }
    $scope.loadMore = function(){
      $scope.loadSongs($scope.nextLink);
    }


  })
  .controller('ShowCtrl', function($scope){

  })
})();




// https://api.soundcloud.com/resolve?url=http://soundcloud.com/factmag/drippin-silver-cloak-sudanim-remix&client_id=4f2b9615c8783056a2eae41eba103c48
