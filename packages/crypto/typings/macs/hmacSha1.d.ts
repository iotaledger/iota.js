/**
 * Class to help with HmacSha1 scheme.
 * TypeScript conversion from https://github.com/emn178/js-sha1.
 */
export declare class HmacSha1 {
    /**
     * Create a new instance of HmacSha1.
     * @param key The key for the hmac.
     */
    constructor(key: Uint8Array);
    /**
     * Perform Sum on the data.
     * @param key The key for the hmac.
     * @param data The data to operate on.
     * @returns The sum of the data.
     */
    static sum(key: Uint8Array, data: Uint8Array): Uint8Array;
    /**
     * Update the hash with the data.
     * @param message The data to update the hash with.
     * @returns The instance for chaining.
     */
    update(message: Uint8Array): HmacSha1;
    /**
     * Get the digest.
     * @returns The digest.
     */
    digest(): Uint8Array;
}
