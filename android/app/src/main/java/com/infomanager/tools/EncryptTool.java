package com.infomanager.tools;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.scottyab.aescrypt.AESCrypt;

import java.security.GeneralSecurityException;

/**
 * Created by zhang on 16-12-19.
 */

public class EncryptTool extends ReactContextBaseJavaModule {
    public EncryptTool(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "EncryptTool";
    }

    @ReactMethod
    public void decrypt(String password, String content, Callback callback) {
        try {
            String data = AESCrypt.decrypt(password, content);
            callback.invoke(null, data);
        } catch (GeneralSecurityException e) {
            WritableMap error = CovertTool.CovertToNative(e);
            callback.invoke(error);
            e.printStackTrace();
        }
    }

    @ReactMethod
    public void encrypt(String password, String content, Callback callback) {
        try {
            String data = AESCrypt.encrypt(password, content);
            callback.invoke(null, data);
        } catch (GeneralSecurityException e) {
            WritableMap error = CovertTool.CovertToNative(e);
            callback.invoke(error);
            e.printStackTrace();
        }
    }
}
