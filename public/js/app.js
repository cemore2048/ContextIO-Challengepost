angular.module("contextioChallenge",[]).
controller("indexController", function($scope, $http){

  var messagesUrl = "/api/messages";
  var contactsUrl = "/api/contacts/";


    $http.get(contactsUrl).
      then(function(response) {
        console.log(response.data.contacts);
        var contacts = response.data.contacts;
        $scope.newContacts = [];
        angular.forEach(contacts , function(){
          if(contacts.sent != 0){
            newContacts.push(contacts);
          }
        });




      }, function(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });



});
