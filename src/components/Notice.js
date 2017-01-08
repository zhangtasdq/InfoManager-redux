import {ToastAndroid} from "react-native";

function show(msg) {
    if (typeof msg !== "string") {
        msg = JSON.stringify(msg);
    }

    ToastAndroid.show(msg, ToastAndroid.SHORT);
}

export default {show};
