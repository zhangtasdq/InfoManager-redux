import React, {Component} from "react";
import {View, ActivityIndicator, StyleSheet} from "react-native";

import ColorConfig from "../configs/ColorConfig";

const style = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 1000,
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    }
});


class Loading extends Component {
    renderLoadingView() {
        return (
            <View style={style.container}>
                <ActivityIndicator size="large" color={ColorConfig.loadingColor} />
            </View>
        );
    }

    render() {
        let view = this.props.isVisible === true ? this.renderLoadingView() : null;

        return view;
    }
}


export default Loading
