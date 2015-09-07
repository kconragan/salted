angular.module('tabs')
  .directive('scroll', [function() {
    'use strict';
    console.log('preventing overscroll');
    return function(scope, element, attrs) {
      var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      var headerHeight = document.getElementById('scroll').offsetHeight;
      console.log(headerHeight);
      element.css('height', headerHeight + 'px');
    }
  }]);
