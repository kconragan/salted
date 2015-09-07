'use strict'
angular.module('tabs')
.controller('TabCtrl', function($scope, $swipe, $location) {

  console.log('tabs contoller started');

  $scope.data = {
    selectedIndex: 0
  };

  $scope.onSwipeRight = function() {

    console.log('swiping right');

    if ($scope.selectedIndex < 2) {
      $scope.selectedIndex  = $scope.selectedIndex + 1;
    }

    // if you want to make all the tour
    else {
      $scope.selectedIndex  = 0;
    }
  }

  $scope.onSwipeLeft = function() {

    console.log('swiping left');

    if ($scope.selectedIndex > 0) {
      $scope.selectedIndex  = $scope.selectedIndex - 1;
    }

    // if you want to make all the tour
    else {
      $scope.selectedIndex  = 2;
    }
  }

  $scope.$watch('selectedIndex', function(current, old) {
    switch (current) {
      case 0:
        $location.url('/buoys');
        break;
      case 1:
        $location.url('/wind');
        break;
      case 2:
        $location.url('/tide');
        break;
    }
  });

});
