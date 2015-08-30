angular.module("contextioChallenge",[]).
controller("indexController", function($scope, $http){

  var addEmailUrl = "/app/add/"
  $scope.authenticate = function(email) {
    $http.post(addEmailUrl + email).
      then(function(response) {


      }, function(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });


  };
});
