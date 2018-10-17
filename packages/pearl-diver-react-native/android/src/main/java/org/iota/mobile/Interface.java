package org.iota.mobile;

public class Interface {
    static { System.loadLibrary("dummy"); }

    public static native String iota_pow(String trytes, int mwm);
    public static native String iota_sign_address_gen(String seed, int index, int security);
    public static native String iota_sign_signature_gen(String trytes, int index, int security, String bundleHash);
}
