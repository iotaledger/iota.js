/**
 * Class to help with HmacSha256 scheme.
 * TypeScript conversion from https://github.com/emn178/js-sha256.
 */
export declare class HmacSha256 {
    /**
     * Create a new instance of HmacSha256.
     * @param key The key for the hmac.
     * @param bits The number of bits.
     */
    constructor(key: Uint8Array, bits?: number);
    /**
     * Perform Sum 256 on the data.
     * @param key The key for the hmac.
     * @param data The data to operate on.
     * @returns The sum 256 of the data.
     */
    static sum256(key: Uint8Array, data: Uint8Array): Uint8Array;
    /**
     * Update the hash with the data.
     * @param message The data to update the hash with.
     * @returns The instance for chaining.
     */
    update(message: Uint8Array): HmacSha256;
    /**
     * Get the digest.
     * @returns The digest.
     */
    digest(): Uint8Array;
}
