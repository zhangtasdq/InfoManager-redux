import React, {Component} from "react";
import {View, Text, TouchableHighlight, StyleSheet} from "react-native";

import ColorConfig from "../configs/ColorConfig";

let baseContainerStyle = {
    paddingTop: 8,
    paddingRight: 12,
    paddingBottom: 8,
    paddingLeft: 12,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 2
};

let baseLabelStyle = {
    color: "#fff",
    fontSize: 16
};


const style = StyleSheet.create({
    primary: {
        ...baseContainerStyle,
        borderColor: ColorConfig.primaryButtonBorder,
        backgroundColor: ColorConfig.primaryButtonBg
    },
    primaryLabel: {
        ...baseLabelStyle
    },

    danger: {
        ...baseContainerStyle,
        borderColor: ColorConfig.dangerButtonBorder,
        backgroundColor: ColorConfig.dangerButtonBg
    },

    dangerLabel: {
        ...baseLabelStyle
    },

    normal: {
        ...baseContainerStyle,
        borderColor: ColorConfig.normalButtonBorder,
        backgroundColor: ColorConfig.normalButtonBg
    },

    normalLabel: {
        ...baseLabelStyle,
        color: ColorConfig.normalButtonLabel
    }
});


class Button extends Component {
    static propTypes = {
        label: React.PropTypes.string.isRequired
    };

    handleOnClick() {
        if (this.props.onClick) {
            this.props.onClick();
        }
    }

    getButtonStyle() {
        let buttonStyle = {
            containerStyle: style.normal,
            labelStyle: style.normalLabel,
            activeColor: ColorConfig.normalButtonActive
        };

        if (this.props.type === "primary") {
            buttonStyle.containerStyle = style.primary;
            buttonStyle.labelStyle = style.primaryLabel;
            buttonStyle.activeColor = ColorConfig.primaryButtonActive;
        } else if (this.props.type === "danger") {
            buttonStyle.containerStyle = style.danger;
            buttonStyle.labelStyle = style.dangerLabel;
            buttonStyle.activeColor = ColorConfig.dangerButtonActive;
        }


        return buttonStyle;
    }


    render() {
        let buttonStyle = this.getButtonStyle();

        return (
            <TouchableHighlight onPress={this.handleOnClick.bind(this)} style={buttonStyle.containerStyle} underlayColor={buttonStyle.activeColor}>
                <Text style={buttonStyle.labelStyle}>{this.props.label}</Text>
            </TouchableHighlight>
        );
    }
}

export default Button;
