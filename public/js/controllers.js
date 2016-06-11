"use strict";

(function(){

  angular
  .module('controllers', [])
  .controller('SearchCtrl', function($scope, $http){
    // grab input from search box
    $scope.input;
    $scope.getSongs = function(){
      var input = $scope.input;
      input = input.split(' ').join('+');
      var url = 'https://api.soundcloud.com/tracks?q=' + input + '&limit=200&filter=public&client_id=4f2b9615c8783056a2eae41eba103c48';
      $http.get(url)
      .then(function(response){
        $scope.tracks = response
        console.log($scope.tracks);
        console.log($scope.input);
        console.log(url);
      });
    }

  })
  .controller('ShowCtrl', function($scope){

  })
})();




// https://api.soundcloud.com/resolve?url=http://soundcloud.com/factmag/drippin-silver-cloak-sudanim-remix&client_id=4f2b9615c8783056a2eae41eba103c48
