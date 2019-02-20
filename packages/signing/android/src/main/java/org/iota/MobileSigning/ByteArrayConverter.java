package org.iota.MobileSigning;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableNativeArray;

import java.util.ArrayList;
import java.util.List;

public class ByteArrayConverter {

    public static WritableArray byteArrayToWritableArray(byte[] byteArray) {
        WritableArray writableArray = new WritableNativeArray();
        for (int i = 0; i < byteArray.length; i++) {
            writableArray.pushInt(byteArray[i]);
        }
        return writableArray;
    }

    public static byte[] readableArrayToByteArray(ReadableArray readableArray) {
        byte[] byteArr = new byte[readableArray.size()];
        for (int i = 0; i < readableArray.size(); i++) {
            byteArr[i] = (byte)readableArray.getInt(i);
        }
        return byteArr;
    }
}
