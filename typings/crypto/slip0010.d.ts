import type { Bip32Path } from "./bip32Path";
/**
 * Class to help with slip0010 key derivation
 * https://github.com/satoshilabs/slips/blob/master/slip-0010.md.
 */
export declare class Slip0010 {
    /**
     * Get the master key from the seed.
     * @param seed The seed to generate the master key from.
     * @returns The key and chain code.
     */
    static getMasterKeyFromSeed(seed: Uint8Array): {
        privateKey: Uint8Array;
        chainCode: Uint8Array;
    };
    /**
     * Derive a key from the path.
     * @param seed The seed.
     * @param path The path.
     * @returns The key and chain code.
     */
    static derivePath(seed: Uint8Array, path: Bip32Path): {
        privateKey: Uint8Array;
        chainCode: Uint8Array;
    };
    /**
     * Get the public key from the private key.
     * @param privateKey The private key.
     * @param withZeroByte Include a zero bute prefix.
     * @returns The public key.
     */
    static getPublicKey(privateKey: Uint8Array, withZeroByte?: boolean): Uint8Array;
}
