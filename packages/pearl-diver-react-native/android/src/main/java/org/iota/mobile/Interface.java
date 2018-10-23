package org.iota.mobile;

public class Interface {
    static { System.loadLibrary("dummy"); }

    public static native String doPOW(String trytes, int mwm);
    public static native String generateAddress(String seed, int index, int security);
    public static native String generateSignature(String trytes, int index, int security, String bundleHash);
    public static native String getDigest(String trytes);
}
