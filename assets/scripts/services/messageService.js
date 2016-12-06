'use strict';

angular.module('chattyApp')
  .factory('messageService', function ( $http ) {
    return {
      getMessages: function () {
        return $http.get('/messages');
      },

      addMessage: function ( message ) {
        return $http.post('/messages', { message: message });
      }
    };
  });
