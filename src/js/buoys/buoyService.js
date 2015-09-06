'use strict'
angular.module('buoys').factory('BuoyService', function($http, $log, $q) {
  return {
    getLatestReading : function(id) {
      console.log('fetching buoy', id);
      var deferred = $q.defer();
      $http.get('http://cryptic-peak-9100.herokuapp.com/api/buoys/' + id)
        .success(function(data) {
          var latestReading = data[0];
          deferred.resolve({
            id                : id,
            timestamp         : latestReading.timestamp,
            relativeTimestamp : moment(latestReading.timestamp).zone('-0800').fromNow(),
            swellHeight       : latestReading.swellHeight,
            swellPeriod       : latestReading.swellPeriod,
            swellDegrees      : latestReading.swellDegrees,
            swellDirection    : latestReading.swellDirection,
            windSpeed         : latestReading.windSpeed,
            windDegrees       : latestReading.windDegrees,
            windDirection     : latestReading.windDirection,
            waterTemp         : latestReading.waterTemp,
            airTemp           : latestReading.airTemp
          });
        })
        .error(function(msg, code) {
          deferred.reject(msg);
        })
        return deferred.promise;
    }
  }
})
