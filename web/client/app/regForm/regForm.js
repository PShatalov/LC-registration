(function() {
    'use strict';

    angular
        .module('lcRegistration.regForm')
        .controller('registrationController', registrationController);

    function registrationController($scope) {
        console.log('Hello From Reg Controller!!!');
    }
})();