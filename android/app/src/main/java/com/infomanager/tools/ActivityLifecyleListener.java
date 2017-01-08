package com.infomanager.tools;

import android.app.Activity;

import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.modules.core.DeviceEventManagerModule;

/**
 * Created by zhang on 16-12-27.
 */

public class ActivityLifecyleListener extends ReactContextBaseJavaModule implements LifecycleEventListener {
    private static final String ON_PAUSE_EVENT_NAME = "activityPause";
    private static final String ON_RESUME_EVENT_NAME = "activityResume";
    private static final String ON_DESTROY_EVENT_NAME = "activityDestroy";

    private Activity mActivity;

    public ActivityLifecyleListener(ReactApplicationContext context, Activity activity) {
        super(context);
        mActivity = activity;
        context.addLifecycleEventListener(this);
    }

    private void sendEvent(String eventName) {
        getReactApplicationContext().
                getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).
                emit(eventName, null);
    }
    @Override
    public String getName() {
        return "ActivityLifecyleListener";
    }

    @Override
    public void onHostPause() {
        this.sendEvent(this.ON_PAUSE_EVENT_NAME);
    }

    @Override
    public void onHostResume() {
        this.sendEvent(this.ON_RESUME_EVENT_NAME);
    }

    @Override
    public void onHostDestroy() {
        this.sendEvent(this.ON_DESTROY_EVENT_NAME);

    }
}
