import * as InfoEditActions from "../actions/InfoEditViewActions";

const initState = {
    currentInfo: {}
};

function infoEdit(state = initState, action) {
    let info = {...state.currentInfo};

    switch (action.type) {
        case InfoEditActions.SET_CURRENT_INFO:
            return {...state, currentInfo: action.currentInfo};

        case InfoEditActions.ADD_DETAIL_ITEM:
            info.details = [...info.details, action.detailItem];
            return {...state, currentInfo: info};
        case InfoEditActions.UPDATE_DETAIL_ITEM:
            info.details = info.details.map(item => item.id === action.updateItem.id ? action.updateItem : item);
            return {...state, currentInfo: info};
        case InfoEditActions.DELETE_DETAIL_ITEM:
            info.details = info.details.filter(item => item.id !== action.deleteItem.id);
            return {...state, currentInfo: info};

        default:
            return state;

    }
}

export default infoEdit;
