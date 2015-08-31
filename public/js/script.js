var contextApp = angular.module("contextioChallenge",['nvd3','ngRoute']);

contextApp.config(function($routeProvider) {
        $routeProvider

            // route for the login page
            .when('/', {
                templateUrl : '/content.html',
                controller  : 'contentController'
            })
});
