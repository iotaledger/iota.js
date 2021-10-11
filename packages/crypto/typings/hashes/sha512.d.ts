/**
 * Class to help with Sha512 scheme
 * TypeScript conversion from https://github.com/emn178/js-sha512.
 */
export declare class Sha512 {
    /**
     * Sha512 224.
     */
    static SIZE_224: number;
    /**
     * Sha512 256.
     */
    static SIZE_256: number;
    /**
     * Sha512 384.
     */
    static SIZE_384: number;
    /**
     * Sha512 512.
     */
    static SIZE_512: number;
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
