import InfoService from "../services/InfoService";

const SET_INFOS = "Set Infos";

function setInfos(infos) {
    return {type: SET_INFOS, infos};
}

const CREATE_NEW_INFO = "Create New Info";
const RESET_CREATE_INFO_STATUS = "Reset Create Info Status";

function createNewInfo(newInfo) {
    return {type: CREATE_NEW_INFO, newInfo};
}

function resetCreateInfoStatus() {
    return {type: RESET_CREATE_INFO_STATUS};
}

const DELETE_INFO_ITEM = "Delete Info Item";
const RESET_DELETE_INFO_STATUS = "Reset Delete Info Status";

function deleteInfoItem(deleteId) {
    return {type: DELETE_INFO_ITEM, deleteId};
}

function resetDeleteInfoStatus() {
    return {type: RESET_DELETE_INFO_STATUS};
}

const UPDATE_INFO_ITEM = "Update Info Item";
const RESET_UPDATE_INFO_STATUS = "Reset Update Info Status";

function updateInfoItem(updateItem) {
    return {type: UPDATE_INFO_ITEM, updateItem};
}

function resetUpdateInfoStatus() {
    return {type: RESET_UPDATE_INFO_STATUS};
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

export {
    SET_INFOS,
    setInfos,

    CREATE_NEW_INFO,
    RESET_CREATE_INFO_STATUS,
    createNewInfo,
    resetCreateInfoStatus,

    DELETE_INFO_ITEM,
    RESET_DELETE_INFO_STATUS,
    deleteInfoItem,
    resetDeleteInfoStatus,

    UPDATE_INFO_ITEM,
    RESET_UPDATE_INFO_STATUS,
    updateInfoItem,
    resetUpdateInfoStatus,

    SAVE_INFO_TO_LOCAL_BEIGN,
    SAVE_INFO_TO_LOCAL_SUCCESS,
    SAVE_INFO_TO_LOCAL_FAILED,
    RESET_SAVE_INFO_TO_LOCAL_STATUS,
    saveInfoToLocal,
    resetSaveInfoToLocalStatus
}
