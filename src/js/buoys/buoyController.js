'use strict'
angular.module('buoys')
.controller('BuoyCtrl', function($scope, $http, BuoyService) {

  console.log('buoy contoller started');

  var buoys = [46012, 46237, 46026];

  $scope.loading = true;
  $scope.buoys = [];

  _.each(buoys, function(element, index) {
    var buoy = BuoyService.getLatestReading(element);
    buoy.then(function(data) {
      console.log(data);
      $scope.buoys.push(data);
      $scope.loading = false;
    },

    function(error) {
      console.log(error);
    });
  })

})
