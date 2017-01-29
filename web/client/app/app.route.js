(function() {
    'use strict';

    angular
        .module('lcRegistration')
        .config(["$routeProvider", function($routeProvider) {
            $routeProvider
                .when("/", {
                    templateUrl: "/client/app/regForm/regForm.html",
                    controller: "registrationController"
                }).when("/hello/:email", {
                    templateUrl: "/client/app/hello/hello.html",
                    controller: "helloController"
                }).otherwise({
                    redirectTo: "/"
                });
        } ]);
})();