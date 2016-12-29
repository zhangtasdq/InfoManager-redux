import * as LoginActions from "../actions/LoginViewActions";
import StatusCode from "../configs/StatusCode";


const initState = {
    loginStatus: null,
    password: null,
};

function user(state = initState, action) {
    switch(action.type) {
        case LoginActions.USER_BEGIN_LOGIN:
            return {...state, loginStatus: StatusCode.userBeginLogin};
        case LoginActions.USER_LOGIN_SUCCESS:
            return {...state, loginStatus: StatusCode.userLoginSuccess, password: action.password};
        case LoginActions.USER_LOGIN_FAILED:
            return {...state, loginStatus: StatusCode.userLoginFailed};
        case LoginActions.RESET_USER_LOGIN_STATUS:
            return {...state, loginStatus: null};
        default:
            return state;
    }
}

export default user;
