"use strict";

(function(){

  angular
  .module('controllers', [])
  .controller('SearchCtrl', function($scope, $http){
    var input = 'anna lunoe';
    $http.get('https://api.soundcloud.com/tracks?q=' + input + '&limit=200&filter=public&client_id=4f2b9615c8783056a2eae41eba103c48')
    .then(function(response){
      $scope.tracks = response
    });
    $scope.showSongs = function(){
      console.log($scope.tracks);
    }

  })
  .controller('ShowCtrl', function($scope){

  })
})();




// https://api.soundcloud.com/resolve?url=http://soundcloud.com/factmag/drippin-silver-cloak-sudanim-remix&client_id=4f2b9615c8783056a2eae41eba103c48
