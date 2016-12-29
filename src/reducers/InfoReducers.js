import * as InfoActions from "../actions/InfoActions";
import StatusCode from "../configs/StatusCode";

const initState = {
    infos: {}
}

function info(state = initState, action) {
    switch (action.type) {
        case InfoActions.SET_INFOS:
            return {...state, infos: action.infos};

        default:
            return state;
    }
}

export default info;
