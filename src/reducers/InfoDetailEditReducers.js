import * as InfoDetailEditActions from "../actions/InfoDetailEditActions";

const initState = {
    currentItem: {},
}

function infoDetailEdit(state = initState, action) {
    switch (action.type) {
        case InfoDetailEditActions.SET_CURRENT_ITEM:
            return {...state, currentItem: action.currentItem};
        case InfoDetailEditActions.RESET_CURRENT_ITEM:
            return {...state, currentItem: {}};
        default:
            return state;
    }
}

export default infoDetailEdit;
