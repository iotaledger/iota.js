/**
 * Implementation of Poly1305.
 */
export declare class Poly1305 {
    /**
     * Create a new instance of Poly1305.
     * @param key The key.
     */
    constructor(key: Uint8Array);
    /**
     * Finished the mac.
     */
    finish(): void;
    /**
     * Update the hash.
     * @param input The data to update with.
     * @returns Hasher instance.
     */
    update(input: Uint8Array): Poly1305;
    /**
     * Get the digest for the hash.
     * @returns The mac.
     */
    digest(): Uint8Array;
}
