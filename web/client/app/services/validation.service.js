angular
    .module('AuthService', [])
    .service('Auth', Auth);

    function Auth() {
        var ERROR_REQUIRED_FIELD = 'Sorry, this field is required';
        this.validateForm = function(formModel){
            console.log('HEllo', formModel);
            var errors = Object.keys(formModel).map(function(formField){
                if(formModel[formField].length == 0){
                    return {errorField: formField, message: ERROR_REQUIRED_FIELD}
                }
            });

            return errors;
        }
    }
