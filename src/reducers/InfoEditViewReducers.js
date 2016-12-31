import * as InfoEditActions from "../actions/InfoEditViewActions";
import StatusCode from "../configs/StatusCode";
import Notice from "../components/Notice";

const initState = {
    currentInfo: {},
    saveInfoToLocalStatus: null
};

function infoEdit(state = initState, action) {
    let info = state.currentInfo;

    switch (action.type) {
        case InfoEditActions.SET_CURRENT_INFO:
            return {...state, currentInfo: action.currentInfo};

        case InfoEditActions.ADD_DETAIL_ITEM:
            info = {...info};
            info.details = [...info.details, action.detailItem];
            return {...state, currentInfo: info};
        case InfoEditActions.UPDATE_DETAIL_ITEM:
            info = {...info};
            info.details = info.details.map(item => item.id === action.updateItem.id ? action.updateItem : item);
            return {...state, currentInfo: info};
        case InfoEditActions.DELETE_DETAIL_ITEM:
            info = {...info};
            info.details = info.details.filter(item => item.id !== action.deleteItem.id);
            return {...state, currentInfo: info};

        case InfoEditActions.SAVE_INFO_TO_LOCAL_BEIGN:
            return {...state, saveInfoToLocalStatus: StatusCode.saveInfoToLocalBegin};
        case InfoEditActions.SAVE_INFO_TO_LOCAL_SUCCESS:
            return {...state, saveInfoToLocalStatus: StatusCode.saveInfoToLocalSuccess};
        case InfoEditActions.SAVE_INFO_TO_LOCAL_FAILED:
            return {...state, saveInfoToLocalStatus: StatusCode.saveInfoToLocalFailed};
        case InfoEditActions.RESET_SAVE_INFO_TO_LOCAL_STATUS:
            return {...state, saveInfoToLocalStatus: null};

        default:
            return state;

    }
}

export default infoEdit;
