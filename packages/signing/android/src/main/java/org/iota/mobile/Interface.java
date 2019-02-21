package org.iota.mobile;

public class Interface {
    static { System.loadLibrary("dummy"); }

    public static native String iota_pow_trytes(String trytes, int mwm);
    public static native String[] iota_pow_bundle(String[] bundle, String trunk, String branch, int mwm);
    public static native String iota_sign_address_gen_trytes(String seed, int index, int security);
    public static native byte[] iota_sign_address_gen_trits(byte[] seed, int index, int security);
    public static native String iota_sign_signature_gen_trytes(String seed, int index, int security, String bundleHash);
    public static native byte[] iota_sign_signature_gen_trits(byte[] seed, int index, int security, byte[] bundleHash);
    public static native String iota_digest(String trytes);
}
