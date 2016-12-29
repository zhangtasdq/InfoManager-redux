import React, {Component} from "react";
import {View, Text, StyleSheet} from "react-native";


const style = StyleSheet.create({
    container: {
        padding: 6
    },

    nameStyle: {
        fontSize: 18
    },

    valueStyle: {
        fontSize: 14
    }
});

class InfoDetailExpandItem extends Component {
    render() {
        return (
            <View style={style.container}>
                <Text style={style.nameStyle} >{this.props.item.name}</Text>
                <Text style={style.valueStyle} >{this.props.item.value}</Text>
            </View>
        );
    }
}

export default InfoDetailExpandItem;
