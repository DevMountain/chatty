'use strict';

angular.module('chattyApp').service('messageService', function($http) {

  this.getMessages = function() {
    return $http({
      method: 'GET',
      url: 'http://localhost:9001',
    }).then(function(res) {
      return res.data;
    }).catch(function(err) {
      return err;
    });
  };

  this.sendMessage = function(message) {
    console.log(message);
    return $http({
      method: 'POST',
      url: 'http://localhost:9001',
      data: message,
    });
  };


});
