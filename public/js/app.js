"use strict";
(function(){

  angular
  .module('plyrApp', [
    'ui.router',
    'show',
    'search',
  ])
  .config([
    '$stateProvider',
    function($stateProvider){
      $stateProvider
      .state('search', {
        url:'/search',
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl'
      })
      .state('show', {
        url:'/track/:title',
        controller: 'ShowCtrl'
      });
    }
  ])

})();
