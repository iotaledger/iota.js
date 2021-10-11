/**
 * Class to help with base64 Encoding/Decoding.
 * Sourced from https://github.com/beatgammit/base64-js.
 */
export declare class Base64 {
    /**
     * Get the byte length of the data.
     * @param base64 The base64 string.
     * @returns The byte length of the data.
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
}
