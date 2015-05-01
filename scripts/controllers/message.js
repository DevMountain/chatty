var app = angular.module('chattyApp');

app.controller('MessageCtrl', function($scope, MessageService) {
  $scope.messages = MessageService.getMessages().then(function(data) {
    console.log('MessageCtrl: data', data);
    $scope.messages = data;
  });

  $scope.addMessage = function() {
    MessageService.addMessage($scope.newMessage).then(function(data) {
      $scope.messages = data;
      $scope.newMessage = '';
    });
  };

});
