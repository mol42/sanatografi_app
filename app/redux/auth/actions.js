import * as $ from "../actionTypes";

export function doSignUp(userData) {
    return {
        type: $.SIGN_UP_REQUEST,
        payload : {userData}
    }
}

export function doLogin(loginData) {
    return {
        type: $.LOGIN_REQUEST,
        payload : {loginData}
    }
}

export function resetSignup() {
    return {
        type : $.RESET_SIGNUP
    }
}

export function requestResetPassword(resetData) {
    return {
        type : $.REQUEST_RESET_PASSWORD_REQUEST,
        payload : resetData
    }
}

export function resetPassword(passwordData) {
    return {
        type : $.UPDATE_PASSWORD_REQUEST,
        payload : passwordData
    }
}

export function resetPasswordResetState() {
    return {
        type : $.RESET_PASSWORD_RESET_STATE
    }
}

export function resetLoginState() {
    return {
        type : $.RESET_LOGIN_STATE
    }
}