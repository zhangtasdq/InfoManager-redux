const SET_CURRENT_ITEM = "Set Current Edit Info Detail Item";
const RESET_CURRENT_ITEM = "Reset Current Edit Info Detail Item";

function setCurrentItem(currentItem) {
    return {type: SET_CURRENT_ITEM, currentItem};
}

function resetCurrentItem() {
    return {type: RESET_CURRENT_ITEM};
}

export {
    SET_CURRENT_ITEM,
    RESET_CURRENT_ITEM,
    setCurrentItem,
    resetCurrentItem
};
