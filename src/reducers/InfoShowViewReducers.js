import * as InfoShowActions from "../actions/InfoShowViewActions";

const initState = {
    currentItemId: {}
};

function infoShow(state = initState, action) {
    switch (action.type) {
        case InfoShowActions.SET_CURRENT_ITEM:
            return {...state, currentItemId: action.currentItemId};

        default:
            return state;
    }
}

export default infoShow;
