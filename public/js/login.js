contextApp.controller("loginController", function($scope, $http, $window){

  var addEmailUrl = "/api/add/"
  $scope.authenticate = function(email) {
    $http.post(addEmailUrl, {e: email}).
      then(function(response) {
        console.log(response.data);
        $window.location.href = response.data.browser_redirect_url;

      }, function(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });


  };
});
