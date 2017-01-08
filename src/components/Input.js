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
        value: ""
    };

    handleOnBlur = () => {
        if (this.props.onBlur) {
            this.props.onBlur(this.state.value);
        }
        this.setState({focus: false});
    };

    handleOnFocus = () => {
        this.setState({focus: true});
    }


    handleOnChange = (event) => {
        this.setState({value: event.nativeEvent.text});
    }

    componentWillReceiveProps(props) {
        if (props.value) {
            this.setState({value: props.value});
        }
    }

    getCurrentValue() {
        return this.state.value;
    }

    clearValue() {
        this.setState({value: ""});
    }

    render() {
        let inputStyle = this.state.focus ? style.focusStyle : style.normalStyle,
            isSecure = !!this.props.secureTextEntry,
            placeholder = this.props.placeholder ? this.props.placeholder : "";

        return (
            <TextInput
                ref="input"
                value={this.state.value}
                style={inputStyle}
                secureTextEntry={isSecure}
                underlineColorAndroid="transparent"
                placeholder={placeholder}
                onBlur={this.handleOnBlur}
                onFocus={this.handleOnFocus}
                onChange={this.handleOnChange}
            />
        );
    }
}


export default Input
