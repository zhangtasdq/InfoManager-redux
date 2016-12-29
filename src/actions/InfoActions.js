import InfoService from "../services/InfoService";

const LOAD_LOACAL_INFO_BEGIN = "Load Local Info Begin";
const LOAD_LOCAL_INFO_SUCCESS = "Load Local Info Success";
const LOAD_LOCAL_INFO_FAILED = "Load Local Info Failed";

function loadLocalInfoBegin() {
    return {type: LOAD_LOACAL_INFO_BEGIN};
}

function loadLocalInfoSuccess(infos, labels) {
    return {type: LOAD_LOCAL_INFO_SUCCESS, infos};
}

function loadLocalInfoFailed() {
    return {type: LOAD_LOCAL_INFO_FAILED};
}

function loadLocalInfo(password) {
    return (dispatch) => {
        dispatch(loadLocalInfoBegin());
        InfoService.loadLocalInfo(password, (error, statusCode, infos) => {
            if (error) {
                dispatch(loadLocalInfoFailed());
            } else {
                dispatch(loadLocalInfoSuccess(infos));
            }
        });
    };
}

const CREATE_NEW_INFO = "Create New Info";
const RESET_CREATE_NEW_INFO_STATUS = "Reset Create New Info Status";

function createNewInfo(newInfo) {
    return {type: CREATE_NEW_INFO, newInfo: newInfo};
}

function resetCreateInfoStatus() {
    return {type: RESET_CREATE_NEW_INFO_STATUS};
}

const SAVE_INFO_TO_LOCAL_BEIGN = "Save Info To Local Begin";
const SAVE_INFO_TO_LOCAL_SUCCESS = "Save Info To Local Success";
const SAVE_INFO_TO_LOCAL_FAILED = "Save Info To Local Failed";
const RESET_SAVE_INFO_TO_LOCAL_STATUS = "Reset Save Info To Local Status";

function saveInfoToLocalBegin() {
    return {type: SAVE_INFO_TO_LOCAL_BEIGN};
}

function saveInfoToLocalSuccess() {
    return {type: SAVE_INFO_TO_LOCAL_SUCCESS};
}

function saveInfoToLocalFailed() {
    return {type: SAVE_INFO_TO_LOCAL_FAILED};
}

function resetSaveInfoToLocalStatus() {
    return {type: RESET_SAVE_INFO_TO_LOCAL_STATUS};
}

function saveInfoToLocal(infos, password) {
    return (dispatch) => {
        dispatch(saveInfoToLocalBegin());
        InfoService.saveInfoToLocal(infos, password, (error) => {
            if (error) {
                dispatch(saveInfoToLocalFailed());
            } else {
                dispatch(saveInfoToLocalSuccess());
            }
        });

    }
}

const BACKUP_INFO_BEGIN = "Backup Info Begin";
const BACKUP_INFO_SUCCESS = "Backup Info Success";
const BACKUP_INFO_FAILED = "Backup Info Failed";
const RESET_BACKUP_INFO_STATUS = "Reset Backup Info Status";

function backupInfoBegin() {
    return {type: BACKUP_INFO_BEGIN};
}

function backupInfoSuccess() {
    return {type: BACKUP_INFO_SUCCESS};
}

function backupInfoFailed(error, statusCode) {
    return {type: BACKUP_INFO_FAILED, statusCode: statusCode};
}

function resetBackupInfoStatus() {
    return {type: RESET_BACKUP_INFO_STATUS};
}

function backupInfo(password) {
    return (dispatch) => {
        dispatch(backupInfoBegin());

        InfoService.backupInfo((backupError, statudCode) => {
            if (backupError) {
                dispatch(backupInfoFailed(backupError, statudCode));
            } else {
                dispatch(backupInfoSuccess());
            }
        });
    };
}

const RESTORE_INFO_BEGIN = "Restore Info Begin";
const RESTORE_INFO_SUCCESS = "Restore Info Success";
const RESTORE_INFO_FAILED = "Restore Info Failed";
const RESET_RESTORE_INFO_STATUS = "Reset Restore Info Status";

function restoreInfoBegin() {
    return {type: RESTORE_INFO_BEGIN};
}

function restoreInfoSuccess() {
    return {type: RESTORE_INFO_SUCCESS};
}

function restoreInfoFailed() {
    return {type: RESTORE_INFO_FAILED};
}

function reseetRestoreStatus() {
    return {type: RESET_RESTORE_INFO_STATUS};
}

function restoreInfo() {
    return (dispatch) => {
        dispatch(restoreInfoBegin());
        InfoService.restoreInfo((restoreError) => {
            if (restoreError) {
                dispatch(restoreInfoFailed());
            } else {
                dispatch(restoreInfoSuccess());
            }
        });
    };
}

const CHANGE_ACTIVE_CATEGORY = "Change Active Category";

function changeActiveCategory(activeCategory) {
    return {type: CHANGE_ACTIVE_CATEGORY, activeCategory: activeCategory};
}

const GET_INFO_ITEM = "Get Info Item";

function getInfoItem(id) {
    return {type: GET_INFO_ITEM, id: id};
}

const DELETE_INFO_ITEM_BEGIN = "Delete Info Item Begin";
const DELETE_INFO_ITEM_SUCCESS = "Delete Info Item Success";
const DELETE_INFO_ITEM_FAILED = "Delete Info Item Failed";
const RESET_DELETE_INFO_ITEM_STATUS = "Reset Delete Info Item Status";

function deleteInfoItemBegin() {
    return {type: DELETE_INFO_ITEM_BEGIN};
}

function deleteInfoItemSuccess(infos) {
    return {type: DELETE_INFO_ITEM_SUCCESS, infos};
}

function deleteInfoItemFailed() {
    return {type: DELETE_INFO_ITEM_FAILED};
}

function resetDeleteInfoItemStatus() {
    return {type: RESET_DELETE_INFO_ITEM_STATUS};
}

function deleteInfoItem(infos, password, deleteId) {
    return (dispatch) => {
        dispatch(deleteInfoItemBegin());
        InfoService.deleteInfo(infos, password, deleteId, (deleteError, infos) => {
            if (deleteError) {
                dispatch(deleteInfoItemFailed());
            } else {
                dispatch(deleteInfoItemSuccess(infos));
            }
        });
    };
}

const RESET_STATE = "Reset State";

function resetState() {
    return {type: RESET_STATE};
}

export {
    LOAD_LOACAL_INFO_BEGIN,
    LOAD_LOCAL_INFO_SUCCESS,
    LOAD_LOCAL_INFO_FAILED,
    loadLocalInfo,

    CREATE_NEW_INFO,
    RESET_CREATE_NEW_INFO_STATUS,
    createNewInfo,
    resetCreateInfoStatus,

    SAVE_INFO_TO_LOCAL_BEIGN,
    SAVE_INFO_TO_LOCAL_SUCCESS,
    SAVE_INFO_TO_LOCAL_FAILED,
    RESET_SAVE_INFO_TO_LOCAL_STATUS,
    resetSaveInfoToLocalStatus,
    saveInfoToLocal,

    BACKUP_INFO_BEGIN,
    BACKUP_INFO_SUCCESS,
    BACKUP_INFO_FAILED,
    backupInfo,
    resetBackupInfoStatus,

    RESTORE_INFO_BEGIN,
    RESTORE_INFO_SUCCESS,
    RESTORE_INFO_FAILED,
    RESET_RESTORE_INFO_STATUS,
    restoreInfo,
    reseetRestoreStatus,

    CHANGE_ACTIVE_CATEGORY,
    changeActiveCategory,

    GET_INFO_ITEM,
    getInfoItem,

    DELETE_INFO_ITEM_BEGIN,
    DELETE_INFO_ITEM_SUCCESS,
    DELETE_INFO_ITEM_FAILED,
    deleteInfoItem,
    resetDeleteInfoItemStatus,

    RESET_STATE,
    resetState
}
