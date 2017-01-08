import React, {Component} from "react";
import {View, Text, StyleSheet} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {connect} from "react-redux";

import BaseView from "./BaseView";
import ColorConfig from "../configs/ColorConfig";
import {FormControl, Notice, Header} from "../components";
import tools from "../tools";
import {addDetailItem, updateDetailItem, deleteDetailItem} from "../actions/InfoEditViewActions";
import {setCurrentItem, resetCurrentItem} from "../actions/InfoDetailEditActions";
import InfoService from "../services/InfoService";


const baseFooterStyle = {
    height: 40,
    paddingRight: 12,
    paddingLeft: 12,
    marginBottom: 12,
}

const style = StyleSheet.create({
    container: {
        flex: 1
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

    footerRight: {
        ...baseFooterStyle,
        alignItems: "flex-end"
    },

    footerBetween: {
        ...baseFooterStyle,
        flexDirection: "row",
        justifyContent: "space-between"
    },

    footerBtnText: {
        color: "#fff",
        fontSize: 16
    }
});

class InfoDetailEditView extends BaseView {
    viewName = "infoDetailEditView";

    saveDetailInfo = () => {
        let name = this.refs.propertyName.getValue(),
            value = this.refs.propertyContent.getValue(),
            currentItem = this.props.currentItem;

        if (tools.isEmpty(name)) {
            Notice.show(this.locale.notice.propertyNameCantBeEmpty);
            return;
        }

        if (tools.isEmpty(value)) {
            Notice.show(this.locale.notice.propertyContentCantBeEmpty);
            return;
        }
        currentItem.name = name;
        currentItem.value = value;
        if (this.props.param.action === "add") {
            this.props.dispatch(addDetailItem(currentItem));
        } else {
            this.props.dispatch(updateDetailItem(currentItem));
        }
        this.props.dispatch(resetCurrentItem());
        this.goBack();
    };

    deleteDetailItem = () => {
        this.props.dispatch(deleteDetailItem(this.props.currentItem));
        this.props.dispatch(resetCurrentItem());
        this.goBack();
    };

    componentDidMount() {
        if (this.props.param.action === "add") {
            this.props.dispatch(setCurrentItem(InfoService.buildEmptyDetailItem()));
        } else if (this.props.param.action === "edit") {
            this.props.dispatch(setCurrentItem(this.props.param.item));
        }
    }

    getTitle() {
        if (this.props.param.action === "add") {
            return this.locale.addInfoDetailTitle;
        }
        return this.locale.editInfoDetailTitle;
    }

    getFooterActionsView() {
        let action = this.props.param.action,
            deleteActionView = null,
            saveActionView = null,
            footerStyle = action === "add" ? style.footerRight : style.footerBetween;

        saveActionView = (
            <Icon.Button name="pencil" backgroundColor={ColorConfig.primaryButtonBg} onPress={this.saveDetailInfo}>
                <Text style={style.footerBtnText}>{this.locale.save}</Text>
            </Icon.Button>
        );

        if (action === "edit") {
            deleteActionView = (
                <Icon.Button name="trash" backgroundColor={ColorConfig.dangerButtonBg} onPress={this.deleteDetailItem}>
                    <Text style={style.footerBtnText}>{this.locale.delteItem}</Text>
                </Icon.Button>
            );
        }

        return (
            <View style={footerStyle}>
                {deleteActionView}
                {saveActionView}
            </View>
        );
    }

    render() {
        let title = this.getTitle(),
            currentItem = this.props.currentItem;

        return (
            <View style={style.container}>
                <Header needPadding={true}>
                    <Text style={style.headerText}>{title}</Text>
                </Header>

                <View style={style.body}>
                    <FormControl value={currentItem.name} ref="propertyName" label={this.locale.propertyNameLabel} placeholder={this.locale.placeholder.inputPropertyName} />
                    <FormControl value={currentItem.value} ref="propertyContent" label={this.locale.propertyValueLabel} placeholder={this.locale.placeholder.inputPropertyValue} />
                </View>

                {this.getFooterActionsView()}
            </View>
        );
    }
}

function select(state) {
    return {
        currentItem: state.infoDetailEditView.currentItem
    };
}

export default connect(select)(InfoDetailEditView);
