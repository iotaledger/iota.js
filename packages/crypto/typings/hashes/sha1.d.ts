/**
 * Class to help with Sha1 scheme.
 * TypeScript conversion from https://github.com/emn178/js-sha1.
 * Although this algorithm should not be use in most cases, it is the
 * default and most widely support for generating TOTP/HOTP codes.
 */
export declare class Sha1 {
    /**
     * Create a new instance of Sha1.
     */
    constructor();
    /**
     * Perform Sum on the data.
     * @param data The data to operate on.
     * @returns The sum of the data.
     */
    static sum(data: Uint8Array): Uint8Array;
    /**
     * Update the hash with the data.
     * @param message The data to update the hash with.
     * @returns The instance for chaining.
     * @throws Error if the hash has already been finalized.
     */
    update(message: Uint8Array): Sha1;
    /**
     * Get the digest.
     * @returns The digest.
     */
    digest(): Uint8Array;
}
