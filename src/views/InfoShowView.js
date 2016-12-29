import React, {Component} from "react";
import {View, Text, StyleSheet, ListView} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {connect} from "react-redux";

import ListBaseView from "./ListBaseView";
import ColorConfig from "../configs/ColorConfig";
import StatusCode from "../configs/StatusCode";
import {Notice, ConfirmDialog, InfoDetailExpandItem, Loading} from "../components";
import {getInfoItem, deleteInfoItem, resetDeleteInfoItemStatus} from "../actions/InfoActions";


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
        paddingTop: 6,
        paddingLeft: 16,
        paddingRight: 16
    },

    formGroup: {
        marginTop: 18
    },

    formGroupLabel: {
        fontSize: 20,
        fontWeight: "bold"
    },

    formGroupContent: {
        fontSize: 18
    },

    detailList: {
        marginTop: 36,
        flex: 2
    },

    detailTitle: {
        padding: 8,
        borderRadius: 4,
        color: "#fff",
        backgroundColor: ColorConfig.detailListHeaderBg
    },

    footer: {
        height: 40,
        paddingRight: 12,
        paddingLeft: 12,
        marginBottom: 12,
        flexDirection:"row",
        justifyContent: "space-between"
    },

    footerText: {
        color: "#fff"
    }
});

class InfoShowView extends ListBaseView {
    viewName = "infoShowView";

    constructor() {
        super();
        this.state = {showConfirmDeleteDialog: false};
    }

    componentDidMount() {
        this.props.dispatch(getInfoItem(this.props.param.showId));
    }

    shouldComponentUpdate(nextState, nextProps) {
        if (nextState.deleteInfoStatus === StatusCode.deleteInfoItemSuccess) {
            this.handleAfterDeleteInfo();
        }
        return true;
    }

    deleteInfo = () => {
        this.setState({showConfirmDeleteDialog: true});
    }

    handleCancelDeleteInfo = () => {
        this.setState({showConfirmDeleteDialog: false});
    }

    handleDeleteInfo = () => {
        this.setState({showConfirmDeleteDialog: false});
        this.props.dispatch(deleteInfoItem(this.props.allInfos, this.props.userPassword, this.props.param.showId));
    }

    handleAfterDeleteInfo() {
        this.props.dispatch(resetDeleteInfoItemStatus());
        Notice.show(this.locale.notice.deleteSuccess);
        setTimeout(() => this.goBack(), 1500);
    }

    editInfo = () => {

    }

    renderDetailItem = (item) => {
        return (<InfoDetailExpandItem item={item} key={item.id} />)
    }

    render() {
        let detailList = this.createListDataSource(null),
            infoItem = this.props.currentInfoItem ? this.props.currentInfoItem : {},
            isShowLoading = this.props.deleteInfoStatus === StatusCode.deleteInfoItemBegin;

        if (infoItem.details && infoItem.details.length > 0) {
            detailList = this.createListDataSource(infoItem.details);
        }

        return (
            <View style={style.container}>
                <View style={style.header}>
                    <Icon.ToolbarAndroid
                        style={style.headerToolbar}
                        titleColor="#fff"
                        navIconName="chevron-left"
                        onIconClicked={this.goBack.bind(this)}
                        title={this.locale.showInfoTitle}
                    />
                </View>

                <View style={style.body}>
                    <View style={style.formGroup}>
                        <Text style={style.formGroupLabel} >{this.locale.title}</Text>
                        <Text style={style.formGroupContent} >{infoItem.title}</Text>
                    </View>
                    <View style={style.formGroup}>
                        <Text style={style.formGroupLabel} >{this.locale.category}</Text>
                        <Text style={style.formGroupContent} >{infoItem.category}</Text>
                    </View>

                    <View style={style.detailList}>
                       <Text style={style.detailTitle}>{this.locale.detail}</Text>

                       <ListView
                           dataSource={detailList}
                           renderRow={this.renderDetailItem}
                       />

                    </View>

                </View>

                <View style={style.footer} >
                    <Icon.Button
                        name="trash"
                        style={style.footerButton}
                        backgroundColor={ColorConfig.dangerButtonBg}
                        underlayColor={ColorConfig.dangerButtonActive}
                        onPress={this.deleteInfo}
                    >
                        <Text style={style.footerText}>{this.locale.delteItem}</Text>
                    </Icon.Button>

                    <Icon.Button
                        name="pencil"
                        style={style.footerButton}
                        backgroundColor={ColorConfig.primaryButtonBg}
                        underlayColor={ColorConfig.primaryButtonActive}
                        onPress={this.editInfo}
                    >
                        <Text style={style.footerText}>{this.locale.edit}</Text>
                    </Icon.Button>

                </View>
                <ConfirmDialog
                    content={this.locale.confirmDeleteInfo}
                    visible={this.state.showConfirmDeleteDialog}
                    cancelLabel={this.locale.cancel}
                    onClickCancel={this.handleCancelDeleteInfo}
                    cancelType="normal"
                    okLabel={this.locale.delteItem}
                    onClickOk={this.handleDeleteInfo}
                    okType="danger"
                 />
                 <Loading isVisible={isShowLoading} />
            </View>
        );
    }
};

function select(state) {
    return {
        allInfos: state.info.infos,
        userPassword: state.user.password,
        currentInfoItem: state.info.currentInfoItem,
        deleteInfoStatus: state.info.deleteInfoStatus
    }

}

export default connect(select)(InfoShowView);
