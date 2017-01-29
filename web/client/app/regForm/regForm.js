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
            Auth.validateForm($scope.formModel, function(validationResult){
                console.log(validationResult, 'VALIDATION!!!');
                if(validationResult){
                    $scope.formErrors = validationResult;
                }
            });

        }
    }
})();