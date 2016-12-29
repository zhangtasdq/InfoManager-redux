import React, {Component} from "react";
import {ListView, StyleSheet, View} from "react-native";

import BaseView from "./BaseView";
import ColorConfig from "../configs/ColorConfig";


const style = StyleSheet.create({
    splitLine: {
        height: 1,
        backgroundColor: ColorConfig.listSplitLine
    }
});


class ListBaseView extends BaseView {
    createListDataSource(datas) {
        let dataSource = new ListView.DataSource({
            rowHasChanged: (r1, rw) => {
                return r1.id !== r2.id;
            }
        });

        if (datas) {
            dataSource = dataSource.cloneWithRows(datas);
        }

        return dataSource;
    }

    renderListSplit(sectionId, rowId) {
        return (<View key={rowId} style={style.splitLine} />);
    }
}

export default ListBaseView;
