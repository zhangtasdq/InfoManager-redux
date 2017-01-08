import React, {Component} from "react";
import {View, Text, StyleSheet, TouchableHighlight} from "react-native";

import ColorConfig from "../configs/ColorConfig";

const style = StyleSheet.create({
    container: {
        paddingTop: 8,
        paddingRight: 12,
        paddingBottom: 8,
        paddingLeft: 12,
        height: 40
    },

    title: {
        fontSize: 18
    }
});

class InfoListItem extends Component {
    clickItem = () => {
        if (this.props.onClick) {
            this.props.onClick(this.props.item);
        }
    };

    render() {
        let touchColor = ColorConfig.listItemTouchColor;

        return (
            <TouchableHighlight style={style.container} onPress={this.clickItem} underlayColor={touchColor} >
                <Text style={style.title} >{this.props.item.title}</Text>
            </TouchableHighlight>
        );
    }
}

export default InfoListItem;
