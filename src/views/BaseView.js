import React, {Component} from "react";
import {ListView, Platform, BackAndroid, DeviceEventEmitter} from "react-native";

import {resetApp} from "../actions/RootActions";
import I18n from "../i18n";
import AppConfig from "../configs/AppConfig";


class BaseView extends Component {
    constructor() {
        super();
        this.locale = I18n(AppConfig.language);
    }

    handleBackup = () => {
        this.goBack();
        return true;
    }

    handleOnAppPause = () => {
        this.props.dispatch(resetApp());
        this.props.navigator.popToTop();
    };

    componentWillMount() {
        if (this.isAndroid()) {
            BackAndroid.addEventListener("hardwareBackPress", this.handleBackup);
        }
        DeviceEventEmitter.addListener("activityPause", this.handleOnAppPause);
    }

    componentWillUnmount() {
        if (this.isAndroid()) {
            BackAndroid.removeEventListener("hardwareBackPress", this.handleBackup);
        }
    }

    isAndroid() {
        return Platform.OS === "android";
    }

    goBack() {
        this.props.navigator.pop();
    }

    goView(direction, param) {
        let view = RouteService.getView(this.viewName, direction, param);
        this.props.navigator.push(view);
    }
}

export default BaseView;
