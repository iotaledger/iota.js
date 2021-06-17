/**
 * Class to help with base64 Encoding/Decoding.
 * Sourced from https://github.com/beatgammit/base64-js.
 */
export declare class Base64 {
    /**
     * Get the byte length of the data.
     * @param base64 The base64 string.
     * @returns The bytle length of the data.
     */
    static byteLength(base64: string): number;
    /**
     * Convert the base 64 string to a byte array.
     * @param base64 The base64 string to convert.
     * @returns The byte array.
     */
    static decode(base64: string): Uint8Array;
    /**
     * Convert a byte array to base 64.
     * @param bytes The byte array to convert.
     * @returns The data as bas64 string.
     */
    static encode(bytes: Uint8Array): string;
    /**
     * Calculate the byte length.
     * @param validLen The valid length.
     * @param placeHoldersLen The placeholder length.
     * @returns The length.
     */
    private static calcByteLength;
    /**
     * Get the valid and placeholder lengths from a bas64 string.
     * @param base64 The base64 string.
     * @returns The lengths.
     */
    private static getLengths;
    /**
     * Convert the triplet to base 64.
     * @param num The number to convert.
     * @returns The base64 erncoding.
     */
    private static tripletToBase64;
    /**
     * Encode a chunk.
     * @param bytes The byte array.
     * @param start The start index in the buffer.
     * @param end The end index in the buffer.
     * @returns The encoded chunk.
     */
    private static encodeChunk;
}
