import * as InfoActions from "../actions/InfoActions";
import StatusCode from "../configs/StatusCode";
import Notice from "../components/Notice";

const initState = {
    infos: {},

    createNewInfoStatus: null,
    deleteInfoStatus: null,
    saveInfoToLocalStatus: null,
    updateInfoStatus: null
}

function info(state = initState, action) {
    switch (action.type) {
        case InfoActions.SET_INFOS:
            return {...state, infos: action.infos};

        case InfoActions.CREATE_NEW_INFO:
            return {
                ...state,
                infos: {...state.infos, [action.newInfo.id] : action.newInfo},
                createNewInfoStatus: StatusCode.createNewInfoFinish
            }
        case InfoActions.RESET_CREATE_INFO_STATUS:
            return {...state, createNewInfoStatus: null};

        case InfoActions.DELETE_INFO_ITEM:
            delete state.infos[action.deleteId];
            return {...state, deleteInfoStatus: StatusCode.deleteInfoFinish};
        case InfoActions.RESET_DELETE_INFO_STATUS:
            return {...state, deleteInfoStatus: null};

        case InfoActions.UPDATE_INFO_ITEM:
            state.infos[action.updateItem.id] = action.updateItem;
            return { ...state, updateInfoStatus: StatusCode.updateInfoFinish };
        case InfoActions.RESET_UPDATE_INFO_STATUS:
            return {...state, updateInfoStatus: null};

        case InfoActions.SAVE_INFO_TO_LOCAL_BEIGN:
            return {...state, saveInfoToLocalStatus: StatusCode.saveInfoToLocalBegin};
        case InfoActions.SAVE_INFO_TO_LOCAL_SUCCESS:
            return {...state, saveInfoToLocalStatus: StatusCode.saveInfoToLocalSuccess};
        case InfoActions.SAVE_INFO_TO_LOCAL_FAILED:
            return {...state, saveInfoToLocalStatus: StatusCode.saveInfoToLocalFailed};
        case InfoActions.RESET_SAVE_INFO_TO_LOCAL_STATUS:
            return {...state, saveInfoToLocalStatus: null};

        default:
            return state;
    }
}

export default info;
