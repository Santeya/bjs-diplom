'use strict';

const userForm = new UserForm();

userForm.loginFormCallback = (data) => {
    ApiConnector.login(data, (result) => {
        //console.log(result);
        if (result.success) {
            location.reload();
        } else {
            userForm.setLoginErrorMessage(result.error);
        }
    })
}

userForm.registerFormCallback = (data) => {
    ApiConnector.register(data, (result) => {
        if (result.success) {
            location.reload();
        } else {
            userForm.setRegisterErrorMessage(result.error);
        }
    })
}