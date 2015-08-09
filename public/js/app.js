angular.module("contextio-challenge",[]).
controller("indexController", function($scope, $http){

  var messagesUrl = "api/messages";

  $scope.getMessages = function(){
    $http.get(messagesUrl).
      then(function(response) {
        console.log(response);
      }, function(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
  }
});
