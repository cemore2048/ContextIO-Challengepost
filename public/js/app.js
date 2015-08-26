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

//rafa

      $scope.clickAction = function(email) {
        $http.get(messagesUrl + email ).
          then(function(response) {
            console.log(timeFormat(response.data[0].date));

          }, function(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
        $scope.n = email;
        // console.log(name);
      };
      var timeFormat = function(time){
        var fullDate;
        var time;
        var date = new Date(time*1000);
        var stateArray = [];

        var day = date.getDate();
        var month = date.getMonth();
        var year = date.getFullYear();

        fullDate = month + "/" + day + "/" + year;
        stateArray.push(fullDate);

        var hour = date.getHours();
        var minute = date.getMinutes();

        time = hour + ":" + minute;
        stateArray.push(time);

        return stateArray;
      }

});
