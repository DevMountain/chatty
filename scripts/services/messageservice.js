'use strict';

angular.module('chattyApp')
  .service('messageService', function ( $http ) {
    
      this.getMessages: function () {
        return $http.get('http://localhost:8989');
      },

      this.addMessage: function ( message ) {
        return $http.post('http://localhost:8989', { message: message });
      }
    
  });
