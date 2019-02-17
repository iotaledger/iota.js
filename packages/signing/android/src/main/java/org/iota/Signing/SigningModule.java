package org.iota.Signing;

import org.iota.mobile.*;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableArray;
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
    public void generateAddress(ReadableArray seed, int index, int security, Promise promise) {
        byte[] seedBytes = Converter.readableArrayToByteArray(seed);
        byte[] addressBytes = Interface.iota_sign_address_gen_trits(seedBytes, index, security);

        WritableArray result = Converter.byteArrayToWritableArray(addressBytes);
        promise.resolve(result);
    }

    @ReactMethod
    public void generateSignature(ReadableArray seed, int index, int security, ReadableArray bundleHash, Promise promise) {
        byte[] seedBytes = Converter.readableArrayToByteArray(seed);
        byte[] bundleHashBytes = Converter.readableArrayToByteArray(bundleHash);
        byte[] signatureBytes = Interface.iota_sign_signature_gen_trits(seedBytes, index, security, bundleHashBytes);

        WritableArray result = Converter.byteArrayToWritableArray(signatureBytes);
        promise.resolve(result);
    }
}
