(function() {
    'use strict';

    angular
        .module('lcRegistration.regForm')
        .controller('registrationController',registrationController);

    function registrationController($scope, $http, $cookies, Auth) {
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
            $scope.showPass = showPass;
        }
        function submitRegForm(){
            $scope.formErrors = {};
             Auth.validateForm($scope.formModel, function(validationResult){
                 if(validationResult){
                     $scope.formErrors = validationResult;
                 }else{
                     $http.post('/create-user', $scope.formModel).then(
                         function(data){
                             $cookies.put('email', data.data.email);
                             location.href = '#/hello';
                         },
                         function(data){
                             $scope.formErrors['email'] = data.data.message;
                             console.log($scope.formErrors['email']);
                         }
                     );
                 }
             });
        }
    }
})();