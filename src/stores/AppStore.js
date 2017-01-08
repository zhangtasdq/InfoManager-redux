import {createStore, applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";

import AppReducers from "../reducers";

let store = createStore(AppReducers, applyMiddleware(thunkMiddleware));

export default store;
