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

      $scope.clickAction = function(x) {
        $http.get(messagesUrl + x.email ).
          then(function(response) {
            $scope.sent = x.sent;
            $scope.received = x.received;
            $scope.total = x.count;
          }, function(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });


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
