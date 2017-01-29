angular
    .module('AuthService', [])
    .service('Auth', Auth);

    function Auth() {
        var ERROR_REQUIRED_FIELD = 'Sorry, this field is required';
        var ERROR_EMAIL = 'Please, check your email';
        var ERROR_BIRTHDAY_FORMAT = 'Please, check your birthday date. Required format is dd/mm/yyyy';
        var ERROR_BIRTHDAY_FUTURE = 'Please, check your birthday date.';
        var ERROR_PASSWORD_NOT_EQUALS = 'Sorry, passwords are not equals.';

        var self = this;
        this.validateForm = function(formModel, callback){
            try {
                self
                    .checkRequiredFields(formModel, callback)
                    .checkEmail(formModel.email, callback)
                    .checkBirthday(formModel.birthday, callback)
                    .checkPasswords(formModel.password, formModel.repassword, callback);
            } catch (e){
            }
        };
        this.checkRequiredFields = function(formModel, callback){
            var requiredErrors = {};
            Object.keys(formModel).map(function(formField){
                if(formModel[formField].length == 0){
                    requiredErrors[formField] = ERROR_REQUIRED_FIELD;
                }
            });
            if(Object.keys(requiredErrors).length > 0){
                return callback(requiredErrors);
            }else{
                return self;
            }
        };
        this.checkEmail = function(email, callback){
            var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(regex.test(email)){
                return self;
            }else{
                return callback({email: ERROR_EMAIL});
            }
        };
        this.checkBirthday = function(birthday, callback){
            var regex = str.match(/(\d+)(-|\/)(\d+)(?:-|\/)(?:(\d+)\s+(\d+):(\d+)(?::(\d+))?(?:\.(\d+))?)?/);
            if(regex.test(birthday)){
                var dateNow = new Date();
                var checkDate = new Date(birthday);
                console.log(dateNow, checkDate, 'DATES');
                if(checkDate > dateNow){
                    return callback({birthday: ERROR_BIRTHDAY_FUTURE})
                }else{
                    return self;
                }
            }else{
                return callback({birthday: ERROR_BIRTHDAY_FORMAT});
            }
        };

        this.checkPasswords = function(pass, repass, callback){
            if(String(pass).valueOf() !== String(repass).valueOf()){
                callback(ERROR_PASSWORD_NOT_EQUALS);
            }else{
                return self;
            }
        }
    }
