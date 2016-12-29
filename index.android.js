import React, { Component } from 'react';
import {AppRegistry, Navigator} from "react-native";
import {Provider} from "react-redux";

import RouteService from "./src/services/RouteService";
import AppStore from "./src/stores/AppStore";


export default class InfoManager extends Component {
    viewName = "info manager";

    constructor() {
        super();
        this.initialRoute = RouteService.getRouteByName("loginView");
    }

    renderScene = (route, navigator) => {
        return (
            <route.component navigator={navigator} param={route.param} />
        );
    };

    render() {
        return (
            <Provider store={AppStore}>
                <Navigator
                    initialRoute={this.initialRoute}
                    renderScene={this.renderScene}
                />
            </Provider>
        );
    }
}


AppRegistry.registerComponent('InfoManager', () => InfoManager);
