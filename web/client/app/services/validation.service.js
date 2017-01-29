angular
    .module('AuthService', [])
    .service('Auth', Auth);

    function Auth() {
        var ERROR_REQUIRED_FIELD = 'Sorry, this field is required';
        var ERROR_EMAIL = 'Please, check your email format';
        var ERROR_BIRTHDAY_FORMAT = 'Sorry, required date format is dd/mm/yyyy';
        var ERROR_BIRTHDAY_FUTURE = 'Please, check your birthday date';
        var ERROR_PASSWORD_NOT_EQUALS = 'Sorry, passwords are not equals';

        var self = this;
        this.validateForm = function(formModel, callback){
            var validateErrors = {};
            var requiredFieldsError = self.checkRequiredFields(formModel);
            var emailError = self.checkEmail(formModel.email);
            if(emailError){
                Object.assign(validateErrors, emailError);
            }
            var birthdayError = self.checkBirthday(formModel.birthday);
            if(birthdayError){
                Object.assign(validateErrors, birthdayError);
            }
            var passwordsError = self.checkPasswords(formModel.password, formModel.repassword);
            if(passwordsError){
                Object.assign(validateErrors, passwordsError);
            }
            if(requiredFieldsError){
                Object.assign(validateErrors, requiredFieldsError);
            }
            var result = Object.keys(validateErrors).length > 0 ? validateErrors : false;
            callback(result);
        };

        this.checkRequiredFields = function(formModel){
            var requiredErrors = {};
            Object.keys(formModel).map(function(formField){
                if(formModel[formField].length == 0){
                    requiredErrors[formField] = ERROR_REQUIRED_FIELD;
                }
            });
            if(Object.keys(requiredErrors).length > 0){
                return requiredErrors;
            }else{
                return false;
            }
        };
        this.checkEmail = function(email){
            var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(regex.test(email)){
                return false;
            }else{
                return {email: ERROR_EMAIL};
            }
        };
        this.checkBirthday = function(birthday){
            var regex = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
            if(regex.test(birthday)){
                var splitedBirthday = birthday.split('/');
                if(splitedBirthday[0] < 1 || splitedBirthday[0] > 31){
                    return {birthday: ERROR_BIRTHDAY_FORMAT};
                }
                if(splitedBirthday[1] < 1 || splitedBirthday[1] > 12){
                    return {birthday: ERROR_BIRTHDAY_FORMAT};
                }
                if(splitedBirthday[2].length !== 4){
                    return {birthday: ERROR_BIRTHDAY_FORMAT};
                }
                var dateNow = new Date();
                var checkDate = new Date(birthday[1]+'/'+birthday[0]+'/'+birthday[2]);

                if(checkDate == 'Invalid Date'){
                    return {birthday: ERROR_BIRTHDAY_FUTURE};
                }
                if(checkDate > dateNow){
                    return {birthday: ERROR_BIRTHDAY_FUTURE};
                }else{
                    return false;
                }
            }else{
                return {birthday: ERROR_BIRTHDAY_FORMAT};
            }
        };

        this.checkPasswords = function(pass, repass){
            if(String(pass).valueOf() !== String(repass).valueOf()){
                return {password: ERROR_PASSWORD_NOT_EQUALS, repassword: ERROR_PASSWORD_NOT_EQUALS};
            }else{
                return false;
            }
        }
    }
