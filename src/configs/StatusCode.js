const StatusCodeConfig = {
    fileExistError: 1,
    fileExist: 2,
    fileNotExist: 3,
    getFileContentError: 4,
    getFileCotentSuccess: 5,

    decryptSuccess: 6,
    decryptError: 7,

    userBeginLogin: 8,
    userLoginSuccess: 9,
    userLoginFailed: 10,

    loadLocalInfoBegin: 11,
    loadLocalInfoSuccess: 12,
    loadLocalInfoFailed: 13,

    createNewInfoFinish: 14,

    saveInfoToLocalBegin: 15,
    saveInfoToLocalSuccess: 16,
    saveInfoToLocalFailed: 17,

    backupInfoBegin: 18,
    backupInfoSuccess: 19,
    backupInfoFailed: 20,
    backupOneDriveError: 21,

    restoreInfoBegin: 22,
    restoreInfoSuccess: 23,
    restoreInfoFailed: 24,

    deleteInfoFinish: 25
};

export default StatusCodeConfig;
