/**
 * Implementation of Ed25519.
 */
export declare class Ed25519 {
    /**
     * PublicKeySize is the size, in bytes, of public keys as used in this package.
     */
    static PUBLIC_KEY_SIZE: number;
    /**
     * PrivateKeySize is the size, in bytes, of private keys as used in this package.
     */
    static PRIVATE_KEY_SIZE: number;
    /**
     * SignatureSize is the size, in bytes, of signatures generated and verified by this package.
     */
    static SIGNATURE_SIZE: number;
    /**
     * SeedSize is the size, in bytes, of private key seeds. These are the private key representations used by RFC 8032.
     */
    static SEED_SIZE: number;
    /**
     * Public returns the PublicKey corresponding to priv.
     * @param privateKey The private key to get the corresponding public key.
     * @returns The public key.
     */
    static publicKeyFromPrivateKey(privateKey: Uint8Array): Uint8Array;
    /**
     * Generate the key pair from the seed.
     * @param seed The seed to generate the key pair for.
     * @returns The key pair.
     */
    static keyPairFromSeed(seed: Uint8Array): {
        /**
         * The private key generated from the seed.
         */
        publicKey: Uint8Array;
        /**
         * The public key generated from the seed.
         */
        privateKey: Uint8Array;
    };
    /**
     * Calculates a private key from a seed.
     * @param seed The seed to generate the private key from.
     * @returns The private key.
     */
    static privateKeyFromSeed(seed: Uint8Array): Uint8Array;
    /**
     * Sign the message with privateKey and returns a signature.
     * @param privateKey The private key.
     * @param message The message to sign.
     * @returns The signature.
     */
    static sign(privateKey: Uint8Array, message: Uint8Array): Uint8Array;
    /**
     * Verify reports whether sig is a valid signature of message by publicKey.
     * @param publicKey The public key to verify the signature.
     * @param message The message for the signature.
     * @param sig The signature.
     * @returns True if the signature matches.
     */
    static verify(publicKey: Uint8Array, message: Uint8Array, sig: Uint8Array): boolean;
}
