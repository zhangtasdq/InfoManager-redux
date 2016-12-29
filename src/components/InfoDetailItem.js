import React, {Component} from "react";
import {View, Text, StyleSheet} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

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
    render() {
        return (
            <View style={style.container}>
                <Text style={style.name}>{this.props.item.name}</Text>
                <Icon style={style.icon} name="angle-right" size={24} />
            </View>
        );
    }
}

export default InfoDetailItem;
