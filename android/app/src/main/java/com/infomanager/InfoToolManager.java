package com.infomanager;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.infomanager.tools.ActivityLifecyleListener;
import com.infomanager.tools.EncryptTool;
import com.infomanager.tools.FileTool;
import com.infomanager.tools.OneDriveTool;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by zhang on 16-12-19.
 */

public class InfoToolManager implements ReactPackage {
    @Override
    public List<Class <? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext context) {
        return Collections.emptyList();
    }

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext context) {
        List<NativeModule> modules = new ArrayList<>();

        modules.add(new EncryptTool(context));
        modules.add(new FileTool(context));
        modules.add(new OneDriveTool(context));
        modules.add(new ActivityLifecyleListener(context, context.getCurrentActivity()));

        return modules;
    }
}
