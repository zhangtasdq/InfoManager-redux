import React, {Component} from "react";
import {View, Text, StyleSheet, ListView} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {connect} from "react-redux";

import ListBaseView from "./ListBaseView";
import ColorConfig from "../configs/ColorConfig";
import StatusCode from "../configs/StatusCode";
import {FormControl, Notice, InfoDetailItem} from "../components";
import InfoService from "../services/InfoService";
import tools from "../tools";
import {
    saveInfoToLocal,
    resetSaveInfoToLocalStatus,
    createNewInfo,
    resetCreateInfoStatus,
    updateInfoItem,
    resetUpdateInfoStatus
} from "../actions/InfoActions";
import {setCurrentInfo, addDetailItem} from "../actions/InfoEditViewActions";


const style = StyleSheet.create({
    container: {
        flex: 1
    },

    header: {
        height: 50,
        alignItems: "stretch"
    },

    headerToolbar: {
        height: 50,
        backgroundColor: ColorConfig.headerBg
    },

    headerText: {
        color: "#fff"
    },

    body: {
        flex: 2,
        paddingRight: 12,
        paddingLeft: 12
    },

    detailContainer: {
        marginTop: 32
    },

    detailHeader: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 12,
        borderRadius: 4,
        marginBottom: 16,
        backgroundColor: ColorConfig.detailListHeaderBg
    },

    detailHeaderText: {
        color: "#fff",
        fontSize: 16
    },

    footer: {
        height: 40,
        paddingRight: 12,
        paddingLeft: 12,
        marginBottom: 12,
        alignItems: "flex-end"
    },

    addDetailBtnText: {
        color: "#fff"
    }
});

class InfoEditView extends ListBaseView {
    viewName = "infoEditView";
    toolbarActions = [{
        title: "save",
        iconName: "save",
        iconColor: "#fff",
        show: "always"
    }];

    editInfoDetailItem = (item) => {
        this.goView("addDetail", {action: "edit", item: item});
    };

    handleClickToolbar = (position) => {
        if (position === 0) {
            this.saveInfo();
        }
    }

    renderDetailItem = (item) => {
        return <InfoDetailItem key={item.id} item={item} onClick={this.editInfoDetailItem}  />
    }

    addInfoDetailItem = () => {
        this.goView("addDetail", {action: "add"});
    }

    componentDidMount() {
        if (this.props.param.action === "add") {
            this.props.dispatch(setCurrentInfo(InfoService.buildEmptyInfo()));
        }
        if (this.props.param.action === "edit") {
            this.props.dispatch(setCurrentInfo(this.props.param.item));
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.createNewInfoStatus === StatusCode.createNewInfoFinish) {
            this.props.dispatch(saveInfoToLocal(nextProps.infos, nextProps.userPassword));
        }

        if (nextProps.updateInfoStatus === StatusCode.updateInfoFinish) {
            this.props.dispatch(saveInfoToLocal(nextProps.infos, nextProps.userPassword));
        }

        if (nextProps.saveInfoToLocalStatus === StatusCode.saveInfoToLocalSuccess) {
            if (nextProps.createNewInfoStatus === StatusCode.createNewInfoFinish) {
                this.props.dispatch(resetCreateInfoStatus());
                this.afterEditInfo();

            }
            if (nextProps.updateInfoStatus === StatusCode.updateInfoFinish) {
                this.props.dispatch(resetUpdateInfoStatus());
                this.afterEditInfo();
            }
        }
    }

    afterEditInfo() {
        Notice.show(this.locale.notice.saveInfoSuccess);
        let self = this;
        setTimeout(() => {
            self.props.dispatch(resetSaveInfoToLocalStatus());
            self.props.navigator.pop();
        }, 1200);
    }

    saveInfo() {
        let title = this.refs.title.getValue(),
            category = this.refs.category.getValue(),
            currentInfo = this.props.currentInfo,
            action = this.props.param.action;

        if (tools.isEmpty(title)) {
            Notice.show(this.locale.notice.titleCantBeEmpty);
            return;
        }

        if (tools.isEmpty(category)) {
            Notice.show(this.locale.notice.categoryCantBeEmpty);
            return;
        }
        currentInfo.title = title;
        currentInfo.category = category;

        if (action === "add") {
            this.props.dispatch(createNewInfo(currentInfo));
        } else if (action === "edit") {
            this.props.dispatch(updateInfoItem(currentInfo));
        }
    }

    getTitle() {
        if (this.props.param.action === "add") {
            return this.locale.addInfoTitle;
        }
        return this.locale.editInfoTitle;
    }

    render() {
        let details = this.createListDataSource(this.props.currentInfo.details),
            currentInfo = this.props.currentInfo,
            title = this.getTitle();

        return (
            <View style={style.container} >
                <View style={style.header}>
                    <Icon.ToolbarAndroid
                        style={style.headerToolbar}
                        titleColor="#fff"
                        actions={this.toolbarActions}
                        onActionSelected={this.handleClickToolbar}
                        title={title}
                    />
                </View>

                <View style={style.body}>
                    <FormControl value={currentInfo.title} ref="title" label={this.locale.title} />
                    <FormControl value={currentInfo.category} ref="category" label={this.locale.category} />

                    <View style={style.detailContainer} >
                        <View style={style.detailHeader} >
                            <Text style={style.detailHeaderText} >{this.locale.detail}</Text>
                        </View>

                        <View>
                            <ListView
                                dataSource={details}
                                enableEmptySections={true}
                                renderRow={this.renderDetailItem}
                                renderSeparator={this.renderListSplit}
                            />
                        </View>
                    </View>

                </View>

                <View style={style.footer}>
                    <Icon.Button name="plus" backgroundColor={ColorConfig.primaryButtonBg} onPress={this.addInfoDetailItem}>
                        <Text style={style.addDetailBtnText}>{this.locale.add}</Text>
                    </Icon.Button>
                </View>
            </View>
        );
    }
}

function select(state) {
    return {
        userPassword: state.user.password,
        infos: state.info.infos,
        saveInfoToLocalStatus: state.info.saveInfoToLocalStatus,
        createNewInfoStatus: state.info.createNewInfoStatus,
        updateInfoStatus: state.info.updateInfoStatus,
        currentInfo: state.infoEditView.currentInfo,
    }
}

export default connect(select)(InfoEditView);
