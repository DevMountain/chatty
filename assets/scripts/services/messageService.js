'use strict';

angular.module('chattyApp')
  .service('messageService', function ( $http ) {
    
      this.getMessages = function () {
        return $http.get('/messages');
      }

      this.addMessage = function ( message, name ) {
        return $http.post('/messages', { message: message, name:name });
      }

      // this.addName = function (name) {
      //   return $http.post('/messages', {name: name});
      // }
    
  });
