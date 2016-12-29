import InfoService from "../services/InfoService";

const SET_INFOS = "Set Infos";

function setInfos(infos) {
    return {type: SET_INFOS, infos};
}
export {
    SET_INFOS,
    setInfos
}
