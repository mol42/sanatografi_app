import * as $ from "../actionTypes";

const initialState = {
    userData : {},
    loginData : {},
    loginFailData : {},
    loginError : false,
    loginCompleted : false,
    loginSuccess : false,
    signUpCompleted : false,
    updatePasswordCompleted : false,
    updatePasswordSuccess : false
};

export default (state = initialState, action) => {

    if (action.type == $.SIGN_UP_SUCCESS) {
        return {
            ...state,
            signUpCompleted : true,
            userData : action.payload
        }
    }

    if (action.type == $.RESET_PASSWORD_RESET_STATE) {
        return {
            ...state,
            updatePasswordCompleted : false,
            updatePasswordSuccess : false
        }
    }

    if (action.type == $.UPDATE_PASSWORD_SUCCESS) {
        return {
            ...state,
            updatePasswordCompleted : true,
            updatePasswordSuccess : true
        }
    }
    
    if (action.type == $.RESET_SIGNUP) {
        return {
            ...state,
            signUpCompleted : false
        }
    }
    
    if (action.type == $.RESET_LOGIN_STATE || action.type == $.LOGIN_REQUEST) {
        return {
            ...state,
            loginSuccess : false,
            loginError : false
        }
    }

    if (action.type == $.LOGIN_SUCCESS) {
        return {
            ...state,
            loginData : action.payload,
            loginCompleted : true,
            loginSuccess : true,
            loginError : false
        }
    }

    if (action.type == $.LOGIN_FAILURE) {
        return {
            ...state,
            loginFailData : action.payload,
            loginError : true
        }
    }
    return state;
}