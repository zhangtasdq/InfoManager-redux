import React, {Component} from "react";
import {View, Text, StyleSheet} from "react-native";

import Input from "./Input";

const style = StyleSheet.create({
    container: {
        marginTop: 8,
        marginBottom: 8
    },

    label: {
        marginBottom: 8
    },

    labelText: {
        fontSize: 16
    }
});

class FormControl extends Component {
    getValue() {
        return this.refs.input.getCurrentValue();
    }

    render() {
        return (
            <View style={style.container}>
                <View style={style.label}>
                    <Text style={style.labelText} >{this.props.label}</Text>
                </View>
                <Input ref="input" placeholder={this.props.placeholder} />
            </View>
        );
    }
}

export default FormControl;
