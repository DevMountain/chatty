'use strict';

angular.module('chattyApp')
  .service('MessageService', function MessageService($q, $http) {
    return {
      getMessages: function() {
        var deferred = $q.defer();

        $http({method: 'GET', url: 'http://localhost:12200'}).success(function(data) {
          deferred.resolve(data);
        });

        return deferred.promise;
      },
      addMessage: function(message) {
        var deferred = $q.defer();

        $http({
          method: 'POST',
          url: 'http://localhost:12200',
          data: {
            message: message
          }
        }).success(function(data) {
          deferred.resolve(data);
        });

        return deferred.promise;
      }
    };
  });
