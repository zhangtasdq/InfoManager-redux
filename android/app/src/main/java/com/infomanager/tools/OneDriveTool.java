package com.infomanager.tools;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.onedrive.sdk.authentication.MSAAuthenticator;
import com.onedrive.sdk.concurrency.ICallback;
import com.onedrive.sdk.concurrency.IProgressCallback;
import com.onedrive.sdk.core.ClientException;
import com.onedrive.sdk.core.DefaultClientConfig;
import com.onedrive.sdk.core.IClientConfig;
import com.onedrive.sdk.extensions.CopyBody;
import com.onedrive.sdk.extensions.IOneDriveClient;
import com.onedrive.sdk.extensions.ISearchCollectionPage;
import com.onedrive.sdk.extensions.Item;
import com.onedrive.sdk.extensions.OneDriveClient;
import com.onedrive.sdk.logger.LoggerLevel;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

/**
 * Created by zhang on 16-12-19.
 */

public class OneDriveTool extends ReactContextBaseJavaModule {
    private IOneDriveClient oneDriveClient = null;

    public OneDriveTool(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "OneDriveTool";
    }

    private IClientConfig createConfig(final String clientId, final String[] scope) {
        final MSAAuthenticator authenticator = new MSAAuthenticator() {
            @Override
            public String getClientId() {
                return clientId;
            }

            @Override
            public String[] getScopes() {
                return scope;
            }
        };

        final IClientConfig config = DefaultClientConfig.createWithAuthenticator(authenticator);
        config.getLogger().setLoggingLevel(LoggerLevel.Debug);

        return config;
    }

    private void getOneDriveClient(String clientId, String[] scopes, final ICallback<Void> callback) {
        if (this.oneDriveClient == null) {
            final ICallback<IOneDriveClient> authCallback = new ICallback<IOneDriveClient>() {
                @Override
                public void success(IOneDriveClient iOneDriveClient) {
                    oneDriveClient = iOneDriveClient;
                    callback.success(null);
                }

                @Override
                public void failure(ClientException ex) {
                    callback.failure(ex);
                }
            };

            new OneDriveClient.
                    Builder().
                    fromConfig(this.createConfig(clientId, scopes)).
                    loginAndBuildClient(this.getCurrentActivity(), authCallback);

        } else {
            callback.success(null);
        }
    }

    @ReactMethod
    public void isFileExists(final String fileName, String clientId, ReadableArray scope, final Callback callback) {
        String[] oneDriveScope = CovertTool.ReadableArrayToArray(scope);

        this.getOneDriveClient(clientId, oneDriveScope, new ICallback<Void>() {
            @Override
            public void success(Void aVoid) {
                IOneDriveClient client = OneDriveTool.this.oneDriveClient;

                client.getDrive().
                        getSpecial("approot").
                        getSearch(fileName).
                        buildRequest().
                        get(new ICallback<ISearchCollectionPage>() {
                            @Override
                            public void success(ISearchCollectionPage iSearchCollectionPage) {
                                boolean isFileExists = !iSearchCollectionPage.getCurrentPage().isEmpty();
                                callback.invoke(null, isFileExists);
                            }

                            @Override
                            public void failure(ClientException ex) {
                                WritableMap error = CovertTool.CovertToNative(ex);
                                callback.invoke(error);
                                ex.printStackTrace();
                            }
                        });
            }

            @Override
            public void failure(ClientException ex) {
                WritableMap error = CovertTool.CovertToNative(ex);
                callback.invoke(error);
                ex.printStackTrace();
            }
        });
    }

    @ReactMethod
    public void saveFile(final String fileName, final String content, String clientId, ReadableArray scope, final Callback callback) {
        String[] oneDriveScope = CovertTool.ReadableArrayToArray(scope);

        final IProgressCallback<Item> saveCallback = new IProgressCallback<Item>() {
            @Override
            public void progress(long current, long max) {

            }

            @Override
            public void success(Item item) {
                callback.invoke(null, true);
            }

            @Override
            public void failure(ClientException ex) {
                WritableMap error = CovertTool.CovertToNative(ex);
                callback.invoke(error);
                ex.printStackTrace();
            }
        };

        this.getOneDriveClient(clientId, oneDriveScope, new ICallback<Void>() {
            @Override
            public void success(Void aVoid) {
                IOneDriveClient client = OneDriveTool.this.oneDriveClient;
                byte[] contentByte = content.getBytes();

                client.getDrive().
                        getSpecial("approot").
                        getChildren().
                        byId(fileName).
                        getContent().
                        buildRequest().
                        put(contentByte, saveCallback);

            }

            @Override
            public void failure(ClientException ex) {
                WritableMap error = CovertTool.CovertToNative(ex);
                callback.invoke(error);
                ex.printStackTrace();
            }
        });
    }

    @ReactMethod
    public void downloadFile(final String fileName, String clientId, ReadableArray scope, final Callback callback) {
        String[] oneDriveScope = CovertTool.ReadableArrayToArray(scope);

        this.getOneDriveClient(clientId, oneDriveScope, new ICallback<Void>() {
            @Override
            public void success(Void aVoid) {
                IOneDriveClient client = OneDriveTool.this.oneDriveClient;

                try {
                    final InputStream inputStream = client.getDrive().
                                                           getSpecial("approot").
                                                           getChildren().
                                                           byId(fileName).
                                                           getContent().
                                                           buildRequest().
                                                           get();
                    byte[] buffer = new byte[1024];
                    int len = 0;
                    ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();

                    while((len = inputStream.read(buffer)) != -1) {
                        byteArrayOutputStream.write(buffer, 0, len);
                    }

                    inputStream.close();
                    byteArrayOutputStream.close();

                    String data = byteArrayOutputStream.toString();

                    callback.invoke(null, data);

                } catch (IOException e) {
                    ReadableMap error = CovertTool.CovertToNative(e);
                    callback.invoke(error);
                    e.printStackTrace();
                }
            }

            @Override
            public void failure(ClientException ex) {
                ReadableMap error = CovertTool.CovertToNative(ex);
                callback.invoke(error);
                ex.printStackTrace();
            }
        });
    }
}
