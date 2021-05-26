/**
 * Implementation of X25519.
 */
export declare class X25519 {
    /**
     * Convert Ed25519 private key to X25519 private key.
     * @param ed25519PrivateKey The ed25519 private key to convert.
     * @returns The x25519 private key.
     */
    static convertPrivateKeyToX25519(ed25519PrivateKey: Uint8Array): Uint8Array;
    /**
     * Convert Ed25519 public key to X25519 public key.
     * @param ed25519PublicKey The ed25519 public key to convert.
     * @returns The x25519 public key.
     */
    static convertPublicKeyToX25519(ed25519PublicKey: Uint8Array): Uint8Array;
}
