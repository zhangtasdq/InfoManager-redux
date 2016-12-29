import React, {Component} from "react";
import {View, Text, StyleSheet, TouchableHighlight} from "react-native";

import ColorConfig from "../configs/ColorConfig";

const baseContainerStyle = {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 12,
    height: 36
};

const baseCategoryStyle = {
    fontSize: 16
};

const style = StyleSheet.create({
    normalContainer: {
        ...baseContainerStyle
    },
    normalCategory: {
        ...baseCategoryStyle
    },

    activeContainer: {
        ...baseContainerStyle,
        backgroundColor: ColorConfig.listActiveBg
    },

    activeCategory: {
        ...baseCategoryStyle,
        color: "#fff"
    }
});

class CategoryListItem extends Component {
    clickItem = () => {
        if (this.props.onClick) {
            this.props.onClick(this.props.item);
        }
    };

    getCategoryStyle() {
        if (this.props.isActive) {
            return {
                container: style.activeContainer,
                category: style.activeCategory
            };
        }
        return {
            container: style.normalContainer,
            category: style.normalCategory
        };
    }

    render() {
        let viewStyle = this.getCategoryStyle(),
            touchColor = ColorConfig.listItemTouchColor;

        return (
            <TouchableHighlight style={viewStyle.container} onPress={this.clickItem} underlayColor={touchColor} >
                <Text style={viewStyle.category}>{this.props.item.name}</Text>
            </TouchableHighlight>
        );
    }
}

export default CategoryListItem;
