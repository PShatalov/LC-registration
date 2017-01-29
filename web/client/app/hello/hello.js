(function() {
    'use strict';

    angular
        .module('lcRegistration.hello')
        .controller('helloController',helloController);

    function helloController($scope, $routeParams) {
        $scope.helloEmail = $routeParams;
    }
})();