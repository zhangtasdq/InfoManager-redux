package com.infomanager.tools;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableMap;

/**
 * Created by zhang on 16-12-19.
 */

public class CovertTool {
    public static WritableMap CovertToNative(final Exception e) {
        WritableMap error = Arguments.createMap();
        error.putString("msg", e.getMessage());

        return error;
    }

    public static String[] ReadableArrayToArray(ReadableArray readableArray) {
        String[] result = new String[readableArray.size()];

        for(int i = 0, j = result.length; i < j; ++i) {
            result[i] = readableArray.getString(i);
        }

        return result;
    }
}
