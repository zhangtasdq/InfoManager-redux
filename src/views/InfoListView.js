import React, {Component} from "react";
import {
    View,
    Text,
    ListView,
    DrawerLayoutAndroid,
    StyleSheet,
    ToolbarAndroid,
    TouchableHighlight
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {connect} from "react-redux";

import ListBaseView from "./ListBaseView";
import ColorConfig from "../configs/ColorConfig";
import StatusCode from "../configs/StatusCode";
import RouteService from "../services/RouteService";
import {
    loadLocalInfo,
    backupInfo,
    resetBackupInfoStatus,
    restoreInfo,
    reseetRestoreStatus,
    changeActiveCategory
} from "../actions/InfoActions";
import {
    InfoListItem,
    CategoryListItem,
    ConfirmDialog,
    Tab,
    Notice,
    Loading
} from "../components";


const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },

    header: {
        height: 50,
        alignItems: "stretch"
    },

    headerToolbar: {
        height: 50,
        backgroundColor: ColorConfig.headerBg
    },

    body: {
        flex: 2
    },

    footer: {
        height: 50
    }
});


class InfoListView extends ListBaseView {
    viewName = "infoListView";
    isFirstLoadingLocalInfo = true;

    footerActions = [{
        action: "cloud-download",
        onClick: this.onClickRestore.bind(this)
    }, {
        action: "cloud-upload",
        onClick: this.onClickBackup.bind(this)
    }, {
        action: "plus",
        onClick: this.onClickAddInfo.bind(this)
    }];

    constructor() {
        super();
        this.state = {showBackupDialog: false, showRestoreDialog: false};
    }

    handleCancelBackup = () => {
        this.setState({showBackupDialog: false});
    }

    handleBackupIntoFile = () => {
        this.setState({showBackupDialog: false});
        this.props.dispatch(backupInfo());
    }

    handleCancelRestore = () => {
        this.setState({showRestoreDialog: false});
    }

    handleRestore = () => {
        this.setState({showRestoreDialog: false});
        this.props.dispatch(restoreInfo());
    }

    showInfoDetail = (item) => {
        let view = RouteService.getViewByDirection(this.viewName, "detail", {showId: item.id});
        this.props.navigator.push(view);
    };

    onClickCategory = (category) => {
        this.props.dispatch(changeActiveCategory(category.name));
        this.refs.categoryView.closeDrawer();
    };

    onClickRestore() {
        this.setState({showRestoreDialog: true});
    };

    onClickBackup(){
        this.setState({showBackupDialog: true});
    };

    onClickAddInfo() {
        let view = RouteService.getViewByDirection(this.viewName, "add", {action: "add"});
        this.props.navigator.push(view);
    };

    componentDidMount() {
        this.props.dispatch(loadLocalInfo(this.props.userPassword));
    }

    shouldComponentUpdate(nextState, nextProps) {
        if (nextState.restoreInfoStatus === StatusCode.restoreInfoSuccess) {
            this.props.dispatch(reseetRestoreStatus());
            this.props.dispatch(loadLocalInfo(this.props.userPassword));
        }

        return true;
    }

    onClickOpenDrawer() {
        this.refs.categoryView.openDrawer();
    }

    shouldShowLoading() {
        return this.props.loadLocalInfoStatus === StatusCode.loadLocalInfoBegin ||
               this.props.backupInfoStatus === StatusCode.backupInfoBegin ||
               this.props.restoreInfoStatus === StatusCode.restoreInfoBegin;
    }

    renderInfoItem(item) {
        return (
            <InfoListItem key={item.id} item={item} onClick={this.showInfoDetail} />
        );
    }

    isActiveCategory(currentCategory) {
        return this.props.activeCategory === currentCategory;
    }

    renderCategoryItem(category) {
        let isActive = this.isActiveCategory(category.name);

        return (
            <CategoryListItem key={category.id} item={category} onClick={this.onClickCategory} isActive={isActive} />
        );
    }

    renderCategoryView() {
        let listData = this.createListDataSource(this.props.categories);

        return (
            <View>
                <ListView
                    dataSource={listData}
                    enableEmptySections={true}
                    renderRow={this.renderCategoryItem.bind(this)}
                    renderSeparator={this.renderListSplit}
                />
            </View>
        );
    }

    render() {
        let isShowLoading = this.shouldShowLoading(),
            infos = this.props.infos,
            loadLocalInfoStatus = this.props.loadLocalInfoStatus,
            backupInfoStatus = this.props.backupInfoStatus,
            restoreInfoStatus = this.props.restoreInfoStatus,
            listData = this.createListDataSource(null);

        if (loadLocalInfoStatus === StatusCode.loadLocalInfoSuccess) {
            if (infos.length === 0 && this.isFirstLoadingLocalInfo) {
                Notice.show(this.locale.notice.infoIsEmpty);
                this.isFirstLoadingLocalInfo = false;
            } else {
                listData = this.createListDataSource(infos);
            }
        } else if (loadLocalInfoStatus === StatusCode.loadLocalInfoFailed) {
            Notice.show(this.locale.notice.loadLocalInfoFailed);
        }

        if (backupInfoStatus !== null) {
            if (backupInfoStatus === StatusCode.backupInfoFailed) {
                if (this.props.backupStatusCode === StatusCode.fileNotExist) {
                    Notice.show(this.locale.notice.backupFileNotExist);
                } else {
                    Notice.show(this.locale.notice.backupFailed);
                }
            } else if (backupInfoStatus === StatusCode.backupInfoSuccess) {
                Notice.show(this.locale.notice.backupSuccess);
            }
            this.props.dispatch(resetBackupInfoStatus());
        }

        if (restoreInfoStatus === StatusCode.restoreInfoFailed) {
            Notice.show(this.locale.notice.restoreInfoFailed);
        }


        return (
            <DrawerLayoutAndroid
                ref="categoryView"
                drawerWidth={300}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={this.renderCategoryView.bind(this)}
            >
                <View style={style.container}>
                    <View style={style.header} >
                        <Icon.ToolbarAndroid
                            style={style.headerToolbar}
                            titleColor="#fff"
                            navIconName="reorder"
                            onIconClicked={this.onClickOpenDrawer.bind(this)}
                            title={this.locale.infoListTitle}
                        />
                    </View>

                    <View style={style.body}>
                        <ListView
                            dataSource={listData}
                            enableEmptySections={true}
                            renderRow={this.renderInfoItem.bind(this)}
                            renderSeparator={this.renderListSplit}
                        />
                    </View>

                    <View style={style.footer}>
                        <Tab tabs={this.footerActions} />
                    </View>

                    <ConfirmDialog
                        content={this.locale.confirmBackupToOnedrive}
                        visible={this.state.showBackupDialog}
                        cancelLabel={this.locale.cancel}
                        onClickCancel={this.handleCancelBackup}
                        cancelType="normal"
                        okLabel={this.locale.backup}
                        onClickOk={this.handleBackupIntoFile}
                        okType="primary"
                     />

                     <ConfirmDialog
                         content={this.locale.confirmRestoreFromOnedrive}
                         visible={this.state.showRestoreDialog}
                         cancelLabel={this.locale.cancel}
                         onClickCancel={this.handleCancelRestore}
                         cancelType="normal"
                         okLabel={this.locale.restore}
                         onClickOk={this.handleRestore}
                         okType="primary"
                      />

                    <Loading isVisible={isShowLoading} />
                </View>
            </DrawerLayoutAndroid>
        );
    }
}

function select(state) {
    let categories = [],
        activeCategory = state.info.activeCategory,
        infos = [];
        id = 1;

    for(let key in state.info.infos) {
        let item = state.info.infos[key];
        categories.push({id: id++, name: item.category});
    }

    if (activeCategory === null && categories.length > 0) {
        activeCategory = categories[0].name;
    }
    for(let key in state.info.infos) {
        let item = state.info.infos[key];
        if (item.category === activeCategory) {
            infos.push(item);
        }
    }

    return {
        userPassword: state.user.password,
        infos: infos,
        categories: categories,
        activeCategory: activeCategory,
        loadLocalInfoStatus: state.info.loadLocalInfoStatus,
        backupInfoStatus: state.info.backupInfoStatus,
        backupStatusCode: state.info.backupStatusCode,
        restoreInfoStatus: state.info.restoreInfoStatus
    }
}

export default connect(select)(InfoListView);
