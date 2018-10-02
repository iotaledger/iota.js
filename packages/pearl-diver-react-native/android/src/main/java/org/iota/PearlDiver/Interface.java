package org.iota.PearlDiver;

public class Interface {
    public static native String doPOW(String trytes, int mwm);
    public static native String generateAddress(String seed, int index, int security);
    public static native String generateSignature(String trytes, int index, int security, String bundleHash);
    public static native String getDigest(String trytes);
}
