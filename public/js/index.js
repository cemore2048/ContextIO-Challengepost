angular.module("contextioChallenge",[]).
controller("indexController", function($scope, $http){

  $scope.authenticate = function(email) {
    $http.post(messagesUrl + x.email ).
      then(function(response) {


      }, function(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });


  };
});
