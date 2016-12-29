import * as InfoActions from "../actions/InfoActions";
import StatusCode from "../configs/StatusCode";

const initState = {
    infos: {},
    createNewInfoStatus: null
}

function info(state = initState, action) {
    switch (action.type) {
        case InfoActions.SET_INFOS:
            return {...state, infos: action.infos};

        case InfoActions.CREATE_NEW_INFO:
            return {
                ...state,
                infos: {...state.infos, [action.newInfo.id] : action.newInfo},
                createNewInfoStatus: StatusCode.createNewInfoFinish
            }
        case InfoActions.RESET_CREATE_INFO_STATUS:
            return {...state, createNewInfoStatus: null};

        default:
            return state;
    }
}

export default info;
