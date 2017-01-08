import {SET_USER_PASSWORD} from "../actions/UserActions";

const initState = {
    password: null
};

function user(state = initState, action) {
    switch (action.type) {
        case SET_USER_PASSWORD:
            return {...state, password: action.password};
        default:
            return state;
    }
}

export default user;
