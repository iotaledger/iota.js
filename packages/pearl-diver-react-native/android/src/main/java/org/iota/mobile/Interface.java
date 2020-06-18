package org.iota.mobile;

public class Interface {
    static { System.loadLibrary("dummy"); }

    public static native String iota_pow_trytes(String trytes, int mwm);
}
