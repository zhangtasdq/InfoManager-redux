import {NativeModules} from "react-native";

import Tools from "../tools";
import AppConfig from "../configs/AppConfig";
import StatusCode from "../configs/StatusCode";
import BaseService from "./BaseService";

let {FileTool, EncryptTool} = NativeModules;


class UserService extends BaseService {
    login(password, callback) {
        let infoFileName = AppConfig.infoFileName,
            paddingPassword = Tools.paddingPassword(password, AppConfig.passwordLength);

        this.getFileContent(infoFileName, (error, responseCode, data) => {
            if (error) {
                callback(error, responseCode);
                return;
            }

            if (responseCode === StatusCode.fileNotExist) {
                callback(null, responseCode, paddingPassword);
                return;
            }

            EncryptTool.decrypt(paddingPassword, data, (decryptError) => {
                if (decryptError) {
                    callback(decryptError, StatusCode.decryptError);
                } else {
                    callback(null, StatusCode.decryptSuccess, paddingPassword);
                }
            });

        })
    }
}

let userService = new UserService();
export default userService;
