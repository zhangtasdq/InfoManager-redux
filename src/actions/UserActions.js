const SET_USER_PASSWORD = "Set User Password";

function setUserPassword(password) {
    return {type: SET_USER_PASSWORD, password};
}

export {SET_USER_PASSWORD, setUserPassword};
