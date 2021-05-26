/**
 * Implementation of the ChaCha29 cipher.
 */
export declare class ChaCha20 {
    /**
     * Create a new instance of ChaCha20.
     * @param key The key.
     * @param nonce The nonce.
     * @param counter Counter.
     */
    constructor(key: Uint8Array, nonce: Uint8Array, counter?: number);
    /**
     * Encrypt the data.
     * @param data The source data to encrypt.
     * @returns The encrypted data.
     */
    encrypt(data: Uint8Array): Uint8Array;
    /**
     * Decrypt the data.
     * @param data The source data to decrypt.
     * @returns The decrypted data.
     */
    decrypt(data: Uint8Array): Uint8Array;
    /**
     * Create a keystream of the given length.
     * @param length The length to create the keystream.
     * @returns The keystream.
     */
    keyStream(length: number): Uint8Array;
}
