'use strict';

angular.module('chattyApp')
  .controller('MessageCtrl', function ($scope, $http) {
  	console.log('MessageCtrl')
    $http.get("http://localhost:11900/").success(function(messages) {
    	$scope.messages = messages;	
    });
    $score.addMessage = function() {
		var message = {message: $scope.myNewMessageText};
		$http.post("http://localhost:11900", myNewMessage).success(function() {
			$scope.messages.push(myNewMessage);

		});
	}
});
