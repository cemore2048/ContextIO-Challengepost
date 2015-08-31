var contextApp = angular.module("contextioChallenge",['nvd3','ngRoute']);

contextApp.config(function($routeProvider) {
        $routeProvider

            // route for the login page
            .when('/', {
                templateUrl : '/login.html',
                controller  : 'loginController'
            })

            // route for the content page
            .when('/content', {
                templateUrl : 'content.html',
                controller  : 'contactController'
            });
});
