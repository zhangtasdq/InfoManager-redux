import React, {Component} from "react";
import {View, Text, StyleSheet, TouchableHighlight} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import ColorConfig from "../configs/ColorConfig";

const style = StyleSheet.create({
    container: {
        height: 40,
        paddingTop: 6,
        paddingBottom: 6
    },

    content: {
        flex: 1,
        flexDirection: "row"
    },

    name: {
        flex: 2,
        fontSize: 18
    },

    icon: {
        width: 24
    }
});

class InfoDetailItem extends Component {
    clickItem = () => {
        if (this.props.onClick) {
            this.props.onClick(this.props.item);
        }
    };

    render() {
        let touchColor = ColorConfig.listItemTouchColor;

        return (
            <TouchableHighlight  style={style.container} onPress={this.clickItem} underlayColor={touchColor} >
                <View style={style.content}>
                    <Text style={style.name}>{this.props.item.name}</Text>
                    <Icon style={style.icon} name="angle-right" size={24} />
                </View>
            </TouchableHighlight>
        );
    }
}

export default InfoDetailItem;
