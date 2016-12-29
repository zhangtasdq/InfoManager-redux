import React, {Component} from "react";
import {View, Text, Modal, StyleSheet} from "react-native";

import Button from "./Button";


const style = StyleSheet.create({
    container: {
        position: "absolute",
        zIndex: 1000,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: "rgba(0, 0, 0, 0.2)"
    },

    body: {
        height: 150,
        marginTop: 200,
        marginRight: 24,
        marginLeft: 24,
        padding: 16,
        backgroundColor: "#fff",
        borderRadius: 6
    },

    content: {
        height: 80
    },

    contentText: {
        fontSize: 18
    },

    footer: {
        flex: 1,
        height: 70,
        flexDirection: "row",
        justifyContent: "space-between"
    }
});

class ConfirmDialog extends Component {
    handleCloseDialog = () => {

    };

    render() {
        return (
            <Modal visible={this.props.visible} onRequestClose={this.handleCloseDialog} transparent={true} >
                <View style={style.container} >
                    <View style={style.body} >
                        <View style={style.content} >
                            <Text style={style.contentText}> {this.props.content} </Text>
                        </View>

                        <View style={style.footer}>
                            <Button label={this.props.cancelLabel} onClick={this.props.onClickCancel} type={this.props.cancelType} />
                            <Button label={this.props.okLabel} onClick={this.props.onClickOk} type={this.props.okType} />
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

export default ConfirmDialog;
