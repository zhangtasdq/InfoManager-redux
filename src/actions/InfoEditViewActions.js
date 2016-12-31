import InfoService from "../services/InfoService";

const SET_CURRENT_INFO = "Set Current Info";

function setCurrentInfo(currentInfo) {
    return {type: SET_CURRENT_INFO, currentInfo};
}

const ADD_DETAIL_ITEM = "Add Detail Item";
const UPDATE_DETAIL_ITEM = "Update Detail Item";
const DELETE_DETAIL_ITEM = "Delete Detail Item";

function addDetailItem(detailItem) {
    return {type: ADD_DETAIL_ITEM, detailItem};
}

function updateDetailItem(updateItem) {
    return {type: UPDATE_DETAIL_ITEM, updateItem};
}

function deleteDetailItem(deleteItem) {
    return {type: DELETE_DETAIL_ITEM, deleteItem};
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
    SET_CURRENT_INFO,
    setCurrentInfo,

    ADD_DETAIL_ITEM,
    addDetailItem,
    UPDATE_DETAIL_ITEM,
    updateDetailItem,
    DELETE_DETAIL_ITEM,
    deleteDetailItem,

    SAVE_INFO_TO_LOCAL_BEIGN,
    SAVE_INFO_TO_LOCAL_SUCCESS,
    SAVE_INFO_TO_LOCAL_FAILED,
    saveInfoToLocal,
    resetSaveInfoToLocalStatus
}
