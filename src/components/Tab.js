import React, {Component} from "react";
import {View, StyleSheet, Text} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import ColorConfig from "../configs/ColorConfig";

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: ColorConfig.tabBackgroundColor
    },

    tabItem: {
        flex: 1,
        alignItems: "center"
    }
});


class Tab extends Component {
    renderTabItem(item) {
        return (
            <View style={style.tabItem} key={item.action} >
                <Icon.Button
                    name={item.action}
                    onPress={item.onClick}
                    backgroundColor="transparent"
                    color={ColorConfig.tabItemColor}
                    size={32}
                 />
            </View>
        );
    }

    render() {
        return (
            <View style={style.container}>
                {this.props.tabs.map(this.renderTabItem)}
            </View>
        );
    }
}

export default Tab;
