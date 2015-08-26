angular.module("contextioChallenge",[]).
controller("indexController", function($scope, $http){

  var messagesUrl = "/api/messages/";
  var contactsUrl = "/api/contacts/";


    $http.get(contactsUrl).
      then(function(response) {
        console.log(response.data.contacts);
        $scope.contacts = response.data.contacts;

      }, function(error) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
});
