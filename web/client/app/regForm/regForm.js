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
        $scope.formErrors = {};
        $scope.showPassword = showPassword;
        $scope.submitRegForm = submitRegForm;

        function showPassword(showPass){
            console.log(showPass, 'UNDEFINED');
            $scope.showPass = showPass;
        }
        function submitRegForm(){
            $scope.formErrors = {};
            var validationError = Auth.validateForm($scope.formModel);
            if(validationError){
                $scope.formErrors = validationError;
            }
        }
    }
})();