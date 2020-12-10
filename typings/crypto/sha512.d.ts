/**
 * Class to help with Sha512 scheme.
 * TypeScript conversion from https://github.com/emn178/js-sha512
 */
export declare class Sha512 {
    /**
     * Create a new instance of Sha512.
     * @param bits The number of bits.
     */
    constructor(bits?: number);
    /**
     * Perform Sum 512 on the data.
     * @param data The data to operate on.
     * @returns The sum 512 of the data.
     */
    static sum512(data: Uint8Array): Uint8Array;
    /**
     * Update the hash with the data.
     * @param message The data to update the hash with.
     * @returns The instance for chaining.
     */
    update(message: Uint8Array): Sha512;
    /**
     * Get the digest.
     * @returns The digest.
     */
    digest(): Uint8Array;
}
