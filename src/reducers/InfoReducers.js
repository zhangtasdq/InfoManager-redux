import * as InfoActions from "../actions/InfoActions";
import StatusCode from "../configs/StatusCode";
import Notice from "../components/Notice";

const initState = {
    infos: {},
    activeCategory: null,
    currentInfoItem: null,

    loadLocalInfoStatus: null,
    createNewInfoStatus: null,
    saveInfoToLocalStatus: null,
    backupInfoStatus: null,
    backupStatusCode: null,
    restoreInfoStatus: null,
    deleteInfoStatus: null,
}

function info(state = initState, action) {
    switch (action.type) {
        case InfoActions.LOAD_LOACAL_INFO_BEGIN:
            return {...state, loadLocalInfoStatus: StatusCode.loadLocalInfoBegin};
        case InfoActions.LOAD_LOCAL_INFO_SUCCESS:
            return {
                ...state,
                loadLocalInfoStatus: StatusCode.loadLocalInfoSuccess,
                infos: action.infos ? action.infos : {}
            };
        case InfoActions.LOAD_LOCAL_INFO_FAILED:
            return {...state, loadLocalInfoStatus: StatusCode.loadLocalInfoFailed}

        case InfoActions.CREATE_NEW_INFO:
            return {
                ...state,
                infos: {...state.infos, [action.newInfo.id] : action.newInfo},
                createNewInfoStatus: StatusCode.createNewInfoFinish
            };
        case InfoActions.RESET_CREATE_NEW_INFO_STATUS:
            return {...state, createNewInfoStatus: null};

        case InfoActions.SAVE_INFO_TO_LOCAL_BEIGN:
            return {...state, saveInfoToLocalStatus: StatusCode.saveInfoToLocalBegin};
        case InfoActions.SAVE_INFO_TO_LOCAL_SUCCESS:
            return {...state, saveInfoToLocalStatus: StatusCode.saveInfoToLocalSuccess};
        case InfoActions.SAVE_INFO_TO_LOCAL_FAILED:
            return {...state, saveInfoToLocalStatus: StatusCode.saveInfoToLocalFailed};
        case InfoActions.RESET_SAVE_INFO_TO_LOCAL_STATUS:
            return {...state, saveInfoToLocalStatus: null};

        case InfoActions.BACKUP_INFO_BEGIN:
            return {...state, backupInfoStatus: StatusCode.backupInfoBegin};
        case InfoActions.BACKUP_INFO_SUCCESS:
            return {...state, backupInfoStatus: StatusCode.backupInfoSuccess};
        case InfoActions.BACKUP_INFO_FAILED:
            return {...state, backupInfoStatus: StatusCode.backupInfoFailed, backupStatusCode: action.statusCode};
        case InfoActions.RESET_BACKUP_INFO_STATUS:
            return {...state, backupInfoStatus: null, backupStatusCode: null}

        case InfoActions.RESTORE_INFO_BEGIN:
            return {...state, restoreInfoStatus: StatusCode.restoreInfoBegin};
        case InfoActions.RESTORE_INFO_SUCCESS:
            return {...state, restoreInfoStatus: StatusCode.restoreInfoSuccess};
        case InfoActions.RESTORE_INFO_FAILED:
            return {...state, restoreInfoStatus: StatusCode.restoreInfoFailed};
        case InfoActions.RESET_RESTORE_INFO_STATUS:
            return {...state, restoreInfoStatus: null};

        case InfoActions.CHANGE_ACTIVE_CATEGORY:
            return {...state, activeCategory: action.activeCategory};

        case InfoActions.GET_INFO_ITEM:
            return {...state, currentInfoItem: state.infos[action.id]};

        case InfoActions.DELETE_INFO_ITEM_BEGIN:
            return {...state, deleteInfoStatus: StatusCode.deleteInfoItemBegin};
        case InfoActions.DELETE_INFO_ITEM_SUCCESS:
            return {...state, deleteInfoStatus: StatusCode.deleteInfoItemSuccess, infos: action.infos};
        case InfoActions.DELETE_INFO_ITEM_FAILED:
            return {...state, deleteInfoStatus: StatusCode.deleteInfoItemFailed};
        case InfoActions.RESET_DELETE_INFO_ITEM_STATUS:
            return {...state, deleteInfoStatus: null};

        case InfoActions.RESET_STATE:
            return initState;

        default:
            return state;

    }
}

export default info;
