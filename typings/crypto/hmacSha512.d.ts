/**
 * Class to help with HmacSha512 scheme.
 * TypeScript conversion from https://github.com/emn178/js-sha512.
 */
export declare class HmacSha512 {
    /**
     * Create a new instance of HmacSha512.
     * @param key The key for the hmac.
     * @param bits The number of bits.
     */
    constructor(key: Uint8Array, bits?: number);
    /**
     * Perform Sum 512 on the data.
     * @param key The key for the hmac.
     * @param data The data to operate on.
     * @returns The sum 512 of the data.
     */
    static sum512(key: Uint8Array, data: Uint8Array): Uint8Array;
    /**
     * Update the hash with the data.
     * @param message The data to update the hash with.
     * @returns The instance for chaining.
     */
    update(message: Uint8Array): HmacSha512;
    /**
     * Get the digest.
     * @returns The digest.
     */
    digest(): Uint8Array;
}
