/**
 * Helper methods for bigints.
 */
export declare class BigIntHelper {
    /**
     * Load 3 bytes from array as bigint.
     * @param data The input array.
     * @param byteOffset The start index to read from.
     * @returns The bigint.
     */
    static read3(data: Uint8Array, byteOffset: number): bigint;
    /**
     * Load 4 bytes from array as bigint.
     * @param data The input array.
     * @param byteOffset The start index to read from.
     * @returns The bigint.
     */
    static read4(data: Uint8Array, byteOffset: number): bigint;
    /**
     * Load 8 bytes from array as bigint.
     * @param data The data to read from.
     * @param byteOffset The start index to read from.
     * @returns The bigint.
     */
    static read8(data: Uint8Array, byteOffset: number): bigint;
    /**
     * Convert a big int to bytes.
     * @param value The bigint.
     * @param data The buffer to write into.
     * @param byteOffset The start index to write from.
     */
    static write8(value: bigint, data: Uint8Array, byteOffset: number): void;
    /**
     * Generate a random bigint.
     * @returns The bitint.
     */
    static random(): bigint;
}
