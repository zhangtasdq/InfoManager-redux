import InfoService from "../services/InfoService";

const LOAD_LOACAL_INFO_BEGIN = "Load Local Info Begin";
const LOAD_LOCAL_INFO_SUCCESS = "Load Local Info Success";
const LOAD_LOCAL_INFO_FAILED = "Load Local Info Failed";
const RESET_LOAD_LOCAL_INFO_STATUS = "Reset Load Local Info Status";

import {Notice} from "../components";

function loadLocalInfoBegin() {
    return {type: LOAD_LOACAL_INFO_BEGIN};
}

function loadLocalInfoSuccess(infos, labels) {
    return {type: LOAD_LOCAL_INFO_SUCCESS, infos};
}

function loadLocalInfoFailed() {
    return {type: LOAD_LOCAL_INFO_FAILED};
}

function resetLoadLocalInfoStatus() {
    return {type: RESET_LOAD_LOCAL_INFO_STATUS};
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
    return {type: BACKUP_INFO_FAILED, statusCode};
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

function restoreInfoFailed(statusCode) {
    return {type: RESTORE_INFO_FAILED, statusCode};
}

function reseetRestoreStatus() {
    return {type: RESET_RESTORE_INFO_STATUS};
}

function restoreInfo() {
    return (dispatch) => {
        dispatch(restoreInfoBegin());
        InfoService.restoreInfo((restoreError, statusCode) => {
            if (restoreError) {
                dispatch(restoreInfoFailed(statusCode));
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

export {
    LOAD_LOACAL_INFO_BEGIN,
    LOAD_LOCAL_INFO_SUCCESS,
    LOAD_LOCAL_INFO_FAILED,
    RESET_LOAD_LOCAL_INFO_STATUS,
    loadLocalInfo,
    resetLoadLocalInfoStatus,

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
    changeActiveCategory
}
