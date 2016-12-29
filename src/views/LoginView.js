import React, {Component} from "react";
import {View, Text, StyleSheet} from "react-native";
import {connect} from "react-redux";

import {Input, Button, Loading, Notice} from "../components";
import {userLogin, resetUserLoginStatus} from "../actions/LoginViewActions";
import {setUserPassword} from "../actions/UserActions";
import RouteService from "../services/RouteService";
import ColorConfig from "../configs/ColorConfig";
import StatusCode from "../configs/StatusCode";
import BaseView from "./BaseView";


const style = StyleSheet.create({
    LoginView: {
        flex: 1
    },

    container: {
        marginTop: 120,
        marginRight: 24,
        marginLeft: 24,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: ColorConfig.loginPanelBorderColor
    },

    header: {
        backgroundColor: ColorConfig.headerBg,
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 12
    },

    headerText: {
        fontSize: 16,
        color: "#fff"
    },

    body: {
        marginTop: 24,
        marginLeft: 12,
        marginRight: 12
    },

    footer: {
        marginTop: 36,
        marginLeft: 12,
        marginRight: 12,
        marginBottom: 24
    }
});


class LoginView extends BaseView {
    viewName = "loginView";

    handleBackup = () => {
        return false;
    }

    handleLogin = () => {
        let password = this.refs.password.getCurrentValue();

        if (password) {
            this.props.dispatch(userLogin(password));
        } else {
            Notice.show(this.locale.notice.pleaserEnterPassword);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.loginStatus === StatusCode.userLoginSuccess) {
            this.props.dispatch(setUserPassword(nextProps.password));
            this.goInfoListView();
        } else if (nextProps.loginStatus === StatusCode.userLoginFailed) {
            Notice.show(this.locale.notice.passwordError);
            this.props.dispatch(resetUserLoginStatus());
        }
    }

    goInfoListView() {
        let view = RouteService.getViewByDirection(this.viewName, "forward");

        this.refs.password.clearValue();
        this.props.navigator.push(view);
    }

    render() {
        let showLoading = this.props.loginStatus === StatusCode.userBeginLogin;
        return (
            <View style={style.loginView}>
                <View style={style.container}>
                    <View style={style.header}>
                        <Text style={style.headerText}>{this.locale.login}</Text>
                    </View>

                    <View style={style.body}>
                        <Input ref="password" secureTextEntry={true} placeholder={this.locale.placeholder.inputPassword} />
                    </View>

                    <View style={style.footer}>
                        <Button label={this.locale.login} onClick={this.handleLogin} type="primary"/>
                    </View>

                </View>
            </View>
        );
    }
}

function select(state) {
    return {
        loginStatus: state.loginView.loginStatus,
        password: state.loginView.password
    };
}

export default  connect(select)(LoginView);
