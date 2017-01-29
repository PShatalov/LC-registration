(function() {
    'use strict';

    angular
        .module('lcRegistration.hello')
        .controller('helloController',helloController);

    function helloController($scope, $cookies) {
        $scope.getHelloEmail = function(){
            return  $cookies.get('email');
        };
    }
})();