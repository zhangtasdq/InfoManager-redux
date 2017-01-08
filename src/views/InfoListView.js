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
import InfoService from "../services/InfoService";
import {setInfos} from "../actions/InfoActions";
import {
    loadLocalInfo,
    resetLoadLocalInfoStatus,
    backupInfo,
    resetBackupInfoStatus,
    restoreInfo,
    reseetRestoreStatus,
    changeActiveCategory
} from "../actions/InfoListViewActions";
import {
    InfoListItem,
    CategoryListItem,
    ConfirmDialog,
    Tab,
    Notice,
    Loading,
    Header
} from "../components";


const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },

    headerToolbar: {
        height: 50
    },

    body: {
        flex: 2
    },

    categoryContainer: {
        flex: 1
    },

    categoryHeader: {
        height: 50,
        alignItems: "center",
        justifyContent: "center"
    },

    categoryTitle: {
        fontSize: 20,
        color: "#888"
    },

    categoryList: {
        flex: 2
    },

    footer: {
        height: 50
    }
});


class InfoListView extends ListBaseView {
    viewName = "infoListView";

    constructor() {
        super();
        this.state = {showBackupDialog: false, showRestoreDialog: false};
    }

    onClickRestore = () => {
        this.setState({showRestoreDialog: true});
    };

    onClickBackup = () => {
        this.setState({showBackupDialog: true});
    };

    onClickAddInfo = () => {
        this.goView("add", {action: "add"});
    };

    footerActions = [{
        action: "cloud-download",
        onClick: this.onClickRestore
    }, {
        action: "cloud-upload",
        onClick: this.onClickBackup
    }, {
        action: "plus",
        onClick: this.onClickAddInfo
    }];

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
        this.goView("detail", {showId: item.id});
    };

    onClickCategory = (category) => {
        this.props.dispatch(changeActiveCategory(category.name));
        this.refs.categoryView.closeDrawer();
    };

    renderCategoryItem = (category) => {
        let isActive = this.isActiveCategory(category.name);

        return (
            <CategoryListItem key={category.id} item={category} onClick={this.onClickCategory} isActive={isActive} />
        );
    }

    renderCategoryView = () => {
        let listData = this.createListDataSource(this.props.categories);

        return (
            <View style={style.categoryContainer}>
                <View style={style.categoryHeader}>
                    <Text style={style.categoryTitle}>{this.locale.category}</Text>
                </View>
                <ListView
                    style={style.categoryList}
                    dataSource={listData}
                    enableEmptySections={true}
                    renderRow={this.renderCategoryItem}
                    renderSeparator={this.renderListSplit}
                />
            </View>
        );
    }

    onClickOpenDrawer = () => {
        this.refs.categoryView.openDrawer();
    }

    renderInfoItem = (item) => {
        return (
            <InfoListItem key={item.id} item={item} onClick={this.showInfoDetail} />
        );
    }

    componentDidMount() {
        this.props.dispatch(loadLocalInfo(this.props.userPassword));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.loadLocalInfoStatus === StatusCode.loadLocalInfoSuccess) {
            if (Object.keys(nextProps.loadLocalInfos).length === 0) {
                Notice.show(this.locale.notice.infoIsEmpty);
            } else {
                this.props.dispatch(setInfos(nextProps.loadLocalInfos));
            }
            this.props.dispatch(resetLoadLocalInfoStatus())
        }

        if (nextProps.backupInfoStatus === StatusCode.oneDriveUnavailable) {
            Notice.show(this.locale.notice.oneDriveUnavailable);
            this.props.dispatch(resetBackupInfoStatus());
        }

        if (nextProps.restoreInfoStatus === StatusCode.oneDriveUnavailable) {
            Notice.show(this.locale.notice.oneDriveUnavailable);
            this.props.dispatch(reseetRestoreStatus());
        }
    }

    shouldShowLoading() {
        return this.props.loadLocalInfoStatus === StatusCode.loadLocalInfoBegin ||
               this.props.backupInfoStatus === StatusCode.backupInfoBegin ||
               this.props.restoreInfoStatus === StatusCode.restoreInfoBegin;
    }

    isActiveCategory(currentCategory) {
        return this.props.activeCategory === currentCategory;
    }

    render() {
        let isShowLoading = this.shouldShowLoading(),
            listData = this.createListDataSource(this.props.infos);

        return (
            <DrawerLayoutAndroid
                ref="categoryView"
                drawerWidth={300}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={this.renderCategoryView}
            >
                <View style={style.container}>
                    <Header>
                        <Icon.ToolbarAndroid
                            style={style.headerToolbar}
                            titleColor="#fff"
                            navIconName="reorder"
                            onIconClicked={this.onClickOpenDrawer}
                            title={this.locale.infoListTitle}
                        />
                    </Header>

                    <View style={style.body}>
                        <ListView
                            dataSource={listData}
                            enableEmptySections={true}
                            renderRow={this.renderInfoItem}
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
    let categories = InfoService.getInfoCategories(state.info.infos),
        activeCategory = state.infoListView.activeCategory ? state.infoListView.activeCategory :
                                                             categories.length > 0 ? categories[0].name : "";
        currentInfos = InfoService.filterInfoByCategory(state.info.infos, activeCategory);

    return {
        userPassword: state.user.password,
        infos: currentInfos,
        categories: categories,
        activeCategory: activeCategory,
        loadLocalInfos: state.infoListView.loadLocalInfos,
        loadLocalInfoStatus: state.infoListView.loadLocalInfoStatus,
        backupInfoStatus: state.infoListView.backupInfoStatus,
        restoreInfoStatus: state.infoListView.restoreInfoStatus
    }
}

export default connect(select)(InfoListView);
