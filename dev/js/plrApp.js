"use strict";!function(){angular.module("plyrApp",["ui.router","controllerModule"]).config(["$stateProvider",function(t){t.state("search",{url:"/search",templateUrl:"views/search.html",controller:"SearchCtrl"}).state("show",{url:"/track/:title",controller:"ShowCtrl"})}])}(),function(){angular.module("controllerModule",[]).controller("ShowCtrl",["$scope",function(t){}])}(),function(){angular.module("controllerModule",[]).controller("SearchCtrl",["$scope","$http",function(t,n){t.input,t.tracks=[],t.nextLink,t.getInput=function(){t.tracks=[];var n=t.input;n=n.split(" ").join("+");var o="https://api.soundcloud.com/search?q="+n+"&limit=20&linked_partitioning&client_id=4f2b9615c8783056a2eae41eba103c48";return o},t.loadSongs=function(o){return n.get(o).then(function(n){t.collection=n.data.collection,t.collection.forEach(function(n){t.tracks.push(n)}),n.data.next_href?(t.nextLink=n.data.next_href,t.showBtn=!0):t.showBtn=!1,console.dir(n)})},t.search=function(){var n=t.getInput();t.loadSongs(n)},t.loadMore=function(){t.loadSongs(t.nextLink)}}])}();