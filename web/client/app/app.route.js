(function() {
    'use strict';

    angular
        .module('lcRegistration')
        .config(["$routeProvider", function($routeProvider) {
            $routeProvider
                .when("/", {
                    templateUrl: "/client/app/regForm/regForm.html",
                    controller: "registrationController"
                }).otherwise({
                    redirectTo: "/"
                });
        } ]);
})();