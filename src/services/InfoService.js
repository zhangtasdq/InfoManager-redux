import {NativeModules} from "react-native";

import AppConfig from "../configs/AppConfig";
import StatusCode from "../configs/StatusCode";
import BaseService from "./BaseService";

let {FileTool, EncryptTool, OneDriveTool} = NativeModules;


class InfoService extends BaseService {
    loadLocalInfo(password, callback) {
        this.getFileContent(AppConfig.infoFileName, (fileError, responseCode, data) => {
            if (fileError) {
                callback(fileError, responseCode);
                return;
            }

            if (responseCode === StatusCode.fileNotExist) {
                callback(null, responseCode, {});
                return;
            }

            EncryptTool.decrypt(password, data, (decryptError, infoStr) => {
                if (decryptError) {
                    callback(decryptError, StatusCode.decryptError);
                } else {
                    let infoData = JSON.parse(infoStr);
                    callback(null, StatusCode.loadLocalInfoSuccess, infoData);
                }
            });
        });
    }

    saveInfoToLocal(infos, password, callback) {
        let infoStr = JSON.stringify(infos);
        EncryptTool.encrypt(password, infoStr, (encryptError, encryptStr) => {
            if (encryptError) {
                return callback(encryptError);
            }

            FileTool.saveFileContent(AppConfig.infoFileName, encryptStr, (saveFileError) => {
                callback(saveFileError);
            });
        });
    }

    buildEmptyInfo() {
        return {id: (new Date()).getTime(), title: "", category: "", details: []};
    }

    buildEmptyDetailItem() {
        return {id: (new Date()).getTime(), name: "", value: ""};
    }

    checkOneDriveConfig() {
        let oneDriveClientId = AppConfig.oneDriveClientId,
            result = {};

        if (!oneDriveClientId) {
            result.error = new Error("oneDriveClientId cant be blank");
            result.statusCode = StatusCode.oneDriveClientIdIsBlank;
        }
        return result;
    }

    backupInfo(callback) {
        let checkOneDrive = this.checkOneDriveConfig();
        if (checkOneDrive.error) {
            return callback(checkOneDrive.error, checkOneDrive.statusCode);
        }

        let infoFileName = AppConfig.infoFileName;
        this.getFileContent(infoFileName, (fileError, responseCode, data) => {
            if (fileError) {
                callback(fileError, responseCode);
                return;
            }
            if (responseCode === StatusCode.fileNotExist) {
                let error = new Error("File Not Exist");
                callback(error, StatusCode.fileNotExist);
                return;
            }
            OneDriveTool.saveFile(infoFileName, data, AppConfig.oneDriveClientId, AppConfig.oneDriveScope, (oneDriveError) => {
                if (oneDriveError) {
                    callback(oneDriveError, StatusCode.backupOneDriveError);
                } else {
                    callback(null);
                }
            });
        })
    }

    restoreInfo(callback) {
        let checkOneDrive = this.checkOneDriveConfig();

        if (checkOneDrive.error) {
            return callback(checkOneDrive.error, checkOneDrive.statusCode);
        }

        let infoFileName = AppConfig.infoFileName,
            clientId = AppConfig.oneDriveClientId,
            scope = AppConfig.oneDriveScope;

        OneDriveTool.isFileExists(infoFileName, clientId, scope, (onedriveFileExistsError, isExist) => {
            if (onedriveFileExistsError) {
                return callback(onedriveFileExistsError);
            }
            if (isExist) {
                OneDriveTool.downloadFile(infoFileName, clientId, scope, (downloadError, fileData) => {
                    if (downloadError) {
                        return callback(downloadError);
                    } else {
                        FileTool.saveFileContent(infoFileName, fileData, (saveFileError) => {
                            callback(saveFileError);
                        });
                    }
                    callback(downloadError);
                });
            } else {
                callback(null, StatusCode.fileNotExist);
            }
        });
    }

    deleteInfo(infos, deleteId,) {
        let newInfos = {},
            infoStr = null;

        for(let key in infos) {
            if (+key !== +deleteId) {
                newInfos[key] = infos[key];
            }
        }
        return newInfos;
    }

    getInfoCategories(infos) {
        let result = [],
            id = 1;

        for(let key in infos) {
            let item = infos[key];
            result.push({name: item.category, id: id++});
        }
        return result;
    }

    filterInfoByCategory(infos, category) {
        let result = [];

        for(let key in infos) {
            let item = infos[key];
            if (item.category === category) {
                result.push({...item});
            }
        }
        return result;
    }
}

let infoServiceInstance = new InfoService();
export default infoServiceInstance;
