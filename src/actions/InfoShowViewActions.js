const SET_CURRENT_ITEM = "Set Current Show Item";

function setCurrentItem(currentItemId) {
    return {type: SET_CURRENT_ITEM, currentItemId};
}

export {
    SET_CURRENT_ITEM,
    setCurrentItem
};
