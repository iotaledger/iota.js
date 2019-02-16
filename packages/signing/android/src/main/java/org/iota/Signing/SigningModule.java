package org.iota.Signing;

import org.iota.mobile.*;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.GuardedResultAsyncTask;
import com.facebook.react.bridge.ReactContext;

public class SigningModule extends ReactContextBaseJavaModule {
    private final ReactContext mContext;

    public SigningModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
    }

    @Override
    public String getName() {
        return "Signing";
    }

    @ReactMethod
    public void generateAddress(byte[] seed, int index, int security, Promise promise) {
      String address = Interface.iota_sign_address_gen_trits(seed, index, security);
      promise.resolve(address);
    }

    @ReactMethod
    public void generateSignature(byte[] seed, int index, int security, String bundleHash, Promise promise) {
      String signature = Interface.iota_sign_signature_gen_trits(seed, index, security, bundleHash);
      promise.resolve(signature);
    }

}
