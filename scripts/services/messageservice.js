var app = angular.module('chattyApp');

app.service('MessageService', function($q, $http) {

  return {
    getMessages: function() {
      var deferred = $q.defer();

      $http({
        method: 'GET',
        url: 'http://localhost:9000'
      })
      .success(function(data) {
        console.log(data);
        deferred.resolve(data);
      });

      return deferred.promise;
    },
    addMessage: function(message) {
      var deferred = $q.defer();

      $http({
        method: 'POST',
        url: 'http://localhost:9000',
        data: {
          message: message
        } 
      })
      .success(function(data) {
        console.log(data);
        deferred.resolve(data);
      });
      return deferred.promise;
    }
  };


});

