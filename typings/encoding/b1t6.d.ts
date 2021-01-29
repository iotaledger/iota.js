/**
 * Class implements the b1t6 encoding encoding which uses a group of 6 trits to encode each byte.
 */
export declare class B1T6 {
    /**
     * The encoded length of the data.
     * @param data The data.
     * @returns The encoded length.
     */
    static encodedLen(data: Uint8Array): number;
    /**
     * Encode a byte array into trits.
     * @param dst The destination array.
     * @param startIndex The start index to write in the array.
     * @param src The source data.
     * @returns The length of the encode.
     */
    static encode(dst: Int8Array, startIndex: number, src: Uint8Array): number;
}
