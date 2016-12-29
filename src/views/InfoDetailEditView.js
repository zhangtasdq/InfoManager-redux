import React, {Component} from "react";
import {View, Text, StyleSheet} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import BaseView from "./BaseView";
import ColorConfig from "../configs/ColorConfig";
import {FormControl, Notice} from "../components";
import tools from "../tools";


const style = StyleSheet.create({
    container: {
        flex: 1
    },

    header: {
        height: 50,
        paddingLeft: 12,
        backgroundColor: ColorConfig.headerBg
    },

    headerText: {
        color: "#fff",
        fontSize: 18
    },

    body: {
        flex: 2,
        marginRight: 12,
        marginLeft: 12
    },

    footer: {
        height: 40,
        paddingRight: 12,
        marginBottom: 12,
        alignItems: "flex-end"
    },

    footerBtnText: {
        color: "#fff",
        fontSize: 16
    }
});

class InfoDetailEditView extends BaseView {
    viewName = "infoDetailEditView";

    saveDetailInfo() {
        let name = this.refs.propertyName.getValue(),
            value = this.refs.propertyContent.getValue();

        if (tools.isEmpty(name)) {
            Notice.show(this.locale.notice.propertyNameCantBeEmpty);
            return;
        }

        if (tools.isEmpty(value)) {
            Notice.show(this.locale.propertyContentCantBeEmpty);
            return;
        }

        this.props.param.callback("add", {name: name, value: value});
        this.props.navigator.pop();
    }

    getTitle() {
        if (this.props.param.action === "add") {
            return this.locale.addInfoDetailTitle;
        }
        return this.locale.editInfoDetailTitle;
    }

    render() {
        let title = this.getTitle();

        return (
            <View style={style.container}>
                <View style={style.header}>
                    <Text style={style.headerText}>{title}</Text>
                </View>

                <View style={style.body}>
                    <FormControl ref="propertyName" label={this.locale.propertyNameLabel} placeholder={this.locale.propertyNamePlaceholder} />
                    <FormControl ref="propertyContent" label={this.locale.propertyValueLabel} placeholder={this.locale.propertyValuePlaceholder} />
                </View>

                <View style={style.footer}>
                    <Icon.Button name="save" backgroundColor={ColorConfig.primaryButtonBg} onPress={this.saveDetailInfo.bind(this)}>
                        <Text style={style.footerBtnText}>{this.locale.save}</Text>
                    </Icon.Button>
                </View>

            </View>
        );
    }
}

export default InfoDetailEditView;
