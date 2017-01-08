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

export {
    SET_CURRENT_INFO,
    setCurrentInfo,

    ADD_DETAIL_ITEM,
    addDetailItem,
    UPDATE_DETAIL_ITEM,
    updateDetailItem,
    DELETE_DETAIL_ITEM,
    deleteDetailItem
}
