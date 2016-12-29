import * as InfoListActions from "../actions/InfoListViewActions";
import StatusCode from "../configs/StatusCode";
import Notice from "../components/Notice";

const initState = {
    activeCategory: null,
    loadLocalInfoStatus: null,
    loadLocalInfos: null,
    backupInfoStatus: null,
    backupStatusCode: null,
    restoreInfoStatus: null,
}

function infoList(state = initState, action) {
    switch (action.type) {
        case InfoListActions.LOAD_LOACAL_INFO_BEGIN:
            return {...state, loadLocalInfoStatus: StatusCode.loadLocalInfoBegin};
        case InfoListActions.LOAD_LOCAL_INFO_SUCCESS:
            return {
                ...state,
                loadLocalInfoStatus: StatusCode.loadLocalInfoSuccess,
                loadLocalInfos: action.infos ? action.infos : {}
            };
        case InfoListActions.LOAD_LOCAL_INFO_FAILED:
            return {...state, loadLocalInfoStatus: StatusCode.loadLocalInfoFailed};
        case InfoListActions.RESET_LOAD_LOCAL_INFO_STATUS:
            return {...state, loadLocalInfoStatus: null};

        case InfoListActions.BACKUP_INFO_BEGIN:
            return {...state, backupInfoStatus: StatusCode.backupInfoBegin};
        case InfoListActions.BACKUP_INFO_SUCCESS:
            return {...state, backupInfoStatus: StatusCode.backupInfoSuccess};
        case InfoListActions.BACKUP_INFO_FAILED:
            return {...state, backupInfoStatus: StatusCode.backupInfoFailed, backupStatusCode: action.statusCode};
        case InfoListActions.RESET_BACKUP_INFO_STATUS:
            return {...state, backupInfoStatus: null, backupStatusCode: null}

        case InfoListActions.RESTORE_INFO_BEGIN:
            return {...state, restoreInfoStatus: StatusCode.restoreInfoBegin};
        case InfoListActions.RESTORE_INFO_SUCCESS:
            return {...state, restoreInfoStatus: StatusCode.restoreInfoSuccess};
        case InfoListActions.RESTORE_INFO_FAILED:
            return {...state, restoreInfoStatus: StatusCode.restoreInfoFailed};
        case InfoListActions.RESET_RESTORE_INFO_STATUS:
            return {...state, restoreInfoStatus: null};

        case InfoListActions.CHANGE_ACTIVE_CATEGORY:
            return {...state, activeCategory: action.activeCategory};

        default:
            return state;

    }
}

export default infoList;
