import {combineReducers} from "redux";

import UserReducers from "./UserReducers";
import InfoReducers from "./InfoReducers";
import LoginViewReducers from "./LoginViewReducers";
import InfoListViewReducers from "./InfoListViewReducers";
import InfoEditViewReducers from "./InfoEditViewReducers";

import * as RootActions from "../actions/RootActions";

const appReducers = combineReducers({
    user: UserReducers,
    info: InfoReducers,
    loginView: LoginViewReducers,
    infoListView: InfoListViewReducers,
    infoEditView: InfoEditViewReducers
});
const rootReducers = (state, action) => {
    if (action.type === RootActions.RESET_APP) {
        state = undefined;
    }
    return appReducers(state, action);
}
export default rootReducers;
