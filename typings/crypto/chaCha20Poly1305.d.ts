/**
 * Implementation of the ChaCha20Poly1305 cipher.
 */
export declare class ChaCha20Poly1305 {
    /**
     * Create a ChaCha20Poly1305 encryptor.
     * @param key The key.
     * @param nonce The nonce.
     * @returns Encryptor instance of ChaCha20Poly1305.
     */
    static encryptor(key: Uint8Array, nonce: Uint8Array): ChaCha20Poly1305;
    /**
     * Create a ChaCha20Poly1305 decryptor.
     * @param key The key.
     * @param nonce The nonce.
     * @returns Decryptor instance of ChaCha20Poly1305.
     */
    static decryptor(key: Uint8Array, nonce: Uint8Array): ChaCha20Poly1305;
    /**
     * Set the AAD.
     * @param aad The aad to set.
     */
    setAAD(aad: Uint8Array): void;
    /**
     * Update the cipher with more data.
     * @param input The input data to include.
     * @returns The updated data.
     */
    update(input: Uint8Array): Uint8Array;
    /**
     * Finalise the data.
     */
    final(): void;
    /**
     * Get the auth tag.
     * @returns The auth tag.
     */
    getAuthTag(): Uint8Array;
    /**
     * Set the auth tag.
     * @param authTag Set the auth tag.
     */
    setAuthTag(authTag: Uint8Array): void;
}
