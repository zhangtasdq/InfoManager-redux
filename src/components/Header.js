import React, {Component} from "react";
import {View, StyleSheet} from "react-native";

import ColorConfig from "../configs/ColorConfig";

const baseStyle = {
    justifyContent: "center",
    flexDirection: "column",
    height: 50,
    backgroundColor: ColorConfig.headerBg
}
const style = StyleSheet.create({
    container: {
        ...baseStyle
    },

    paddingContainer: {
        ...baseStyle,
        paddingLeft: 12
    }
});


class Header extends Component {
    render() {
        let headerStyle = this.props.needPadding === true ? style.paddingContainer : style.container;

        return (
            <View style={headerStyle}>
                {this.props.children}
            </View>
        )
    }
};

export default Header;
