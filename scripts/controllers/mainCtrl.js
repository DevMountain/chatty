'use strict';

angular.module('chattyApp').controller('MainCtrl', function ($scope, messageService) {

  function getMessages() {
    messageService.getMessages().then(function(res) {
      $scope.messages = res;
    });
  };

  $scope.sendMessage = function() {
    messageService.sendMessage($scope.newMessage).then(function(res) {
      $scope.newMessage = '';
      getMessages();
    });
  };

  getMessages();

});
