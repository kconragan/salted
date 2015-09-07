angular.module('app')
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/buoys');
  $stateProvider
    .state('buoys', {
      url: '/buoys',
      controller: 'BuoyCtrl',
      templateUrl: 'templates/buoys/buoys.html'
    })
})
