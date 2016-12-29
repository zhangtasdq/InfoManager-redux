package com.infomanager.tools;

import android.content.Context;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

/**
 * Created by zhang on 16-12-19.
 */

public class FileTool extends ReactContextBaseJavaModule {
    public FileTool(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "FileTool";
    }

    @ReactMethod
    public void isFileExists(String fileName, Callback callback) {
        String[] files = this.getReactApplicationContext().fileList();

        for(String file : files) {
            if (file.equalsIgnoreCase(fileName)) {
                callback.invoke(null, true);
                return;
            }
        }
        callback.invoke(null, false);
    }

    @ReactMethod
    public void getFileContent(String fileName, Callback callback) {
        try {
            FileInputStream inputStream = this.getReactApplicationContext().openFileInput(fileName);
            int length = inputStream.available();
            byte[] buffer = new byte[length];

            inputStream.read(buffer);
            inputStream.close();
            String data = new String(buffer);

            callback.invoke(null, data);
        } catch (IOException e) {
            WritableMap error = CovertTool.CovertToNative(e);
            callback.invoke(error);
            e.printStackTrace();
        }
    }

    @ReactMethod
    public void saveFileContent(String fileName, String content, Callback callback) {
        byte[] data = content.getBytes();

        try {
            FileOutputStream outputStream = this.getReactApplicationContext().openFileOutput(fileName, Context.MODE_PRIVATE);
            outputStream.write(data);
            outputStream.close();
            callback.invoke();
        } catch (IOException e) {
            WritableMap error = CovertTool.CovertToNative(e);
            callback.invoke(error);
            e.printStackTrace();
        }
    }
}
