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

    componentWillReceiveProps(nextProps) {
        if (nextProps.loadLocalInfoStatus === StatusCode.loadLocalInfoSuccess) {
            if (Object.keys(nextProps.loadLocalInfos).length === 0) {
                Notice.show(this.locale.notice.infoIsEmpty);
            } else {
                this.props.dispatch(setInfos(nextProps.loadLocalInfos));
            }
            this.props.dispatch(resetLoadLocalInfoStatus())
        }
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
            listData = this.createListDataSource(this.props.infos);

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
        backupStatusCode: state.infoListView.backupStatusCode,
        restoreInfoStatus: state.infoListView.restoreInfoStatus
    }
}

export default connect(select)(InfoListView);
