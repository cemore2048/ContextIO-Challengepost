angular.module("contextioChallenge",[]).
controller("indexController", function($scope, $http){

  var messagesUrl = "/api/messages/";
  var contactsUrl = "/api/contacts/";


    $http.get(contactsUrl).
      then(function(response) {
        console.log(response.data.contacts);
        $scope.contacts = response.data.contacts;

      }, function(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });


      $scope.clickAction = function(email) {
        $http.get(messagesUrl + email ).
          then(function(response) {
            console.log(response.data.messages);
            $scope.contacts = response.data.messages;

          }, function(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
        $scope.n = name;
        // console.log(name);
      };


});
