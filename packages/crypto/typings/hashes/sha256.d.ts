/**
 * Class to help with Sha256 scheme.
 * TypeScript conversion from https://github.com/emn178/js-sha256.
 */
export declare class Sha256 {
    /**
     * Sha256 256.
     */
    static readonly SIZE_256: number;
    /**
     * Sha256 224.
     */
    static readonly SIZE_224: number;
    /**
     * Create a new instance of Sha256.
     * @param bits The number of bits.
     */
    constructor(bits?: number);
    /**
     * Perform Sum 256 on the data.
     * @param data The data to operate on.
     * @returns The sum 256 of the data.
     */
    static sum256(data: Uint8Array): Uint8Array;
    /**
     * Perform Sum 224 on the data.
     * @param data The data to operate on.
     * @returns The sum 224 of the data.
     */
    static sum224(data: Uint8Array): Uint8Array;
    /**
     * Update the hash with the data.
     * @param message The data to update the hash with.
     * @returns The instance for chaining.
     */
    update(message: Uint8Array): Sha256;
    /**
     * Get the digest.
     * @returns The digest.
     */
    digest(): Uint8Array;
}
