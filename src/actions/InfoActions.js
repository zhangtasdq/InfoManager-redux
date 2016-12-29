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

export {
    SET_INFOS,
    setInfos,

    CREATE_NEW_INFO,
    RESET_CREATE_INFO_STATUS,
    createNewInfo,
    resetCreateInfoStatus
}
