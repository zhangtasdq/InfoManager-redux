import React, {Component} from "react";
import {View, TextInput, StyleSheet} from "react-native";
import Notice from "./Notice";


import ColorConfig from "../configs/ColorConfig";

let normalStyle = {
    borderWidth: 1,
    paddingLeft: 12,
    height: 40,
    borderRadius: 4
};


const style = StyleSheet.create({
    normalStyle: {
        ...normalStyle,
        borderColor: ColorConfig.inputNormalBorder
    },

    focusStyle: {
        ...normalStyle,
        borderColor: ColorConfig.inputActiveBorder
    }
});


class Input extends Component {
    state = {
        focus: false,
    };
    currentValue = "";

    handleOnBlur = () => {
        if (this.props.onBlur) {
            this.props.onBlur(this.currentValue);
        }
        this.setState({focus: false});
    };

    handleOnFocus = () => {
        this.setState({focus: true});
    }

    handleOnChange = (value) => {
        this.currentValue = value;
    }

    getCurrentValue() {
        return this.currentValue;
    }

    clearValue() {
        this.currentValue = "";
        this.refs.input.clear();
    }

    render() {
        let inputStyle = this.state.focus ? style.focusStyle : style.normalStyle,
            isSecure = !!this.props.secureTextEntry,
            placeholder = this.props.placeholder ? this.props.placeholder : "";

        return (
            <TextInput
                ref="input"
                value={this.props.value}
                style={inputStyle}
                secureTextEntry={isSecure}
                underlineColorAndroid="transparent"
                placeholder={placeholder}
                onBlur={this.handleOnBlur}
                onFocus={this.handleOnFocus}
                onChangeText={this.handleOnChange}
            />
        );
    }
}


export default Input
