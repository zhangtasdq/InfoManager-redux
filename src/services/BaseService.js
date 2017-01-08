import {NativeModules} from "react-native";

import AppConfig from "../configs/AppConfig";
import StatusCode from "../configs/StatusCode";

let {FileTool} = NativeModules;


class BaseService {
    getFileContent(fileName, callback) {
        FileTool.isFileExists(fileName, (fileExistError, exists) => {
            if (fileExistError) {
                callback(fileExistError, StatusCode.fileExistError);
                return;
            }

            if (exists) {
                FileTool.getFileContent(fileName, (fileError, data) => {
                    if (fileError) {
                        callback(fileError, StatusCode.getFileContentError);
                    } else {
                        callback(null, StatusCode.getFileCotentSuccess, data);
                    }
                })
            } else {
                callback(null, StatusCode.fileNotExist);
            }

        });
    }
}
export default BaseService;
