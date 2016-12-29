import React, {Component} from "react";
import {View, Text, StyleSheet, ListView} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {connect} from "react-redux";

import ListBaseView from "./ListBaseView";
import ColorConfig from "../configs/ColorConfig";
import StatusCode from "../configs/StatusCode";
import {FormControl, Notice, InfoDetailItem} from "../components";
import RouteService from "../services/RouteService";
import InfoService from "../services/InfoService";
import tools from "../tools";
import {
    createNewInfo,
    resetCreateInfoStatus,
    saveInfoToLocal,
    resetSaveInfoToLocalStatus
} from "../actions/InfoActions";

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
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 8,
        borderRadius: 4,
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

    handleEditDetailResult = (action, data) => {
        let currentInfo = this.state.currentInfo,
            details = currentInfo.details;

        if (action === "add") {
            let newItem = InfoService.buildNewDetailItem(data);
            details.push(newItem);
            this.setState({currentInfo: currentInfo})
        }

    };

    constructor(props) {
        super(props);
        this.state = {currentInfo: null};
    }

    componentDidMount() {
        if (this.props.param.action === "add") {
            this.setState({currentInfo: InfoService.buildNewInfo()});
        }
    }

    shouldComponentUpdate(nextState, nextProps) {
        if (nextState.createNewInfoStatus === StatusCode.createNewInfoFinish) {
            this.props.dispatch(resetCreateInfoStatus());
            setTimeout(() => {
                this.props.dispatch(saveInfoToLocal(this.props.infos, this.props.userPassword));
            }, 0)
        }

        if (nextState.saveInfoToLocalStatus === StatusCode.saveInfoToLocalSuccess) {
            this.afterEditInfo();
        }
        return true;
    }

    afterEditInfo() {
        Notice.show(this.locale.notice.saveInfoSuccess);
        let self = this;
        setTimeout(() => {
            self.props.dispatch(resetSaveInfoToLocalStatus());
            self.props.navigator.pop();
        }, 1500);
    }

    handleClickToolbar(position) {
        if (position === 0) {
            this.saveInfo();
        }
    }

    saveInfo() {
        let title = this.refs.title.getValue(),
            category = this.refs.category.getValue(),
            newInfo = this.state.currentInfo;

        if (tools.isEmpty(title)) {
            Notice.show(this.locale.notice.titleCantBeEmpty);
            return;
        }

        if (tools.isEmpty(category)) {
            Notice.show(this.locale.notice.categoryCantBeEmpty);
            return;
        }
        newInfo.title = title;
        newInfo.category = category;

        this.props.dispatch(createNewInfo(newInfo))
    }

    addInfoDetailItem() {
        let view = RouteService.getViewByDirection(this.viewName, "addDetail", {action: "add", callback: this.handleEditDetailResult});
        this.props.navigator.push(view);
    }

    renderDetailItem(item) {
        return <InfoDetailItem key={item.id} item={item}  />
    }

    getTitle() {
        if (this.props.param.action === "add") {
            return this.locale.addInfoTitle;
        }
        return this.locale.editInfoTitle;
    }

    render() {
        let currentInfo = this.state.currentInfo,
            details = this.createListDataSource(currentInfo ? currentInfo.details : null),
            title = this.getTitle();

        return (
            <View style={style.container} >
                <View style={style.header}>
                    <Icon.ToolbarAndroid
                        style={style.headerToolbar}
                        titleColor="#fff"
                        actions={this.toolbarActions}
                        onActionSelected={this.handleClickToolbar.bind(this)}
                        title={title}
                    />
                </View>

                <View style={style.body}>
                    <FormControl ref="title" label={this.locale.title} />
                    <FormControl ref="category" label={this.locale.category} />

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
                    <Icon.Button name="plus" backgroundColor={ColorConfig.primaryButtonBg} onPress={this.addInfoDetailItem.bind(this)}>
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
        createNewInfoStatus: state.info.createNewInfoStatus,
        saveInfoToLocalStatus: state.info.saveInfoToLocalStatus
    }
}

export default connect(select)(InfoEditView);