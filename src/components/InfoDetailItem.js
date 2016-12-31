import React, {Component} from "react";
import {View, Text, StyleSheet, TouchableHighlight} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import ColorConfig from "../configs/ColorConfig";

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 6
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
            <TouchableHighlight  onPress={this.clickItem} underlayColor={touchColor} >
                <View style={style.container}>
                    <Text style={style.name}>{this.props.item.name}</Text>
                    <Icon style={style.icon} name="angle-right" size={24} />
                </View>
            </TouchableHighlight>
        );
    }
}

export default InfoDetailItem;
