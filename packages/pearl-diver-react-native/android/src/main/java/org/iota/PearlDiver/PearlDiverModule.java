package org.iota.PearlDiver;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.GuardedResultAsyncTask;
import com.facebook.react.bridge.ReactContext;

public class PearlDiverModule extends ReactContextBaseJavaModule {
    private final ReactContext mContext;

    public PearlDiverModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
    }

    @Override
    public String getName() {
        return "PearlDiver";
    }

    @ReactMethod
    public void doPoW(final String trytes, final int mwm, final Promise promise) {
        new GuardedResultAsyncTask<String>(mContext) {
            @Override
            protected String doInBackgroundGuarded() {
                String nonce = Interface.doPoW(trytes, mwm);
                return nonce;
            }

            @Override
            protected void onPostExecuteGuarded(String result) {
                promise.resolve(result);
            }

        }.execute();
    }
}
