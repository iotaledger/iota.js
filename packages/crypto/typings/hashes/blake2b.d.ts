/**
 * Class to help with Blake2B Signature scheme.
 * TypeScript conversion from https://github.com/dcposch/blakejs.
 */
export declare class Blake2b {
    /**
     * Blake2b 256.
     */
    static SIZE_256: number;
    /**
     * Blake2b 512.
     */
    static SIZE_512: number;
    /**
     * Create a new instance of Blake2b.
     * @param outlen Output length between 1 and 64 bytes.
     * @param key Optional key.
     */
    constructor(outlen: number, key?: Uint8Array);
    /**
     * Perform Sum 256 on the data.
     * @param data The data to operate on.
     * @param key Optional key for the hash.
     * @returns The sum 256 of the data.
     */
    static sum256(data: Uint8Array, key?: Uint8Array): Uint8Array;
    /**
     * Perform Sum 512 on the data.
     * @param data The data to operate on.
     * @param key Optional key for the hash.
     * @returns The sum 512 of the data.
     */
    static sum512(data: Uint8Array, key?: Uint8Array): Uint8Array;
    /**
     * Updates a BLAKE2b streaming hash.
     * @param input The data to hash.
     */
    update(input: Uint8Array): void;
    /**
     * Completes a BLAKE2b streaming hash.
     * @returns The final data.
     */
    final(): Uint8Array;
}
