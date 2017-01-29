(function() {
    'use strict';

    angular
        .module('lcRegistration.regForm')
        .controller('registrationController', registrationController);

    function registrationController($scope) {
        $scope.showPass = false;

        $scope.showPassword = showPassword;
        $scope.submitRegForm = submitRegForm;

        function showPassword(showPass){
            console.log(showPass);
            $scope.showPass = showPass;
        }
        function submitRegForm(){
            console.log('submit');
        }
    }
})();