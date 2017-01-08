import UserService from "../services/UserService";

const USER_BEGIN_LOGIN = "User Begin Login";
const USER_LOGIN_SUCCESS = "User Login Success";
const USER_LOGIN_FAILED = "User Login Failed";
const RESET_USER_LOGIN_STATUS = "Reset User Login Status";


function userBeginLogin() {
    return {type: USER_BEGIN_LOGIN};
}

function userLoginSuccess(password) {
    return {type: USER_LOGIN_SUCCESS, password};
}

function userLoginFailed() {
    return {type: USER_LOGIN_FAILED};
}

function resetUserLoginStatus() {
    return {type: RESET_USER_LOGIN_STATUS};
}

function userLogin(password) {
    return (dispatch) => {
        dispatch(userBeginLogin());
        UserService.login(password, (error, statusCode, paddingPassword) => {
            if (error) {
                dispatch(userLoginFailed());
            } else {
                dispatch(userLoginSuccess(paddingPassword));
            }
        });
    };
}

export {
    USER_BEGIN_LOGIN,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILED,
    RESET_USER_LOGIN_STATUS,

    userLogin,
    resetUserLoginStatus
}
