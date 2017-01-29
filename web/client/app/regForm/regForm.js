(function() {
    'use strict';

    angular
        .module('lcRegistration.regForm')
        .controller('registrationController',registrationController);

    function registrationController($scope, Auth) {
        $scope.showPass = false;
        $scope.formModel = {
            email: '',
            birthday: '',
            password: '',
            repassword: ''
        };
        $scope.showPassword = showPassword;
        $scope.submitRegForm = submitRegForm;

        function showPassword(showPass){
            console.log(showPass, 'UNDEFINED');
            $scope.showPass = showPass;
        }
        function submitRegForm(){
            var result = Auth.validateForm($scope.formModel);

            console.log(result);
        }
    }
})();