/**
 * Class to help with base32 Encoding/Decoding using RFC4648.
 */
export declare class Base32 {
    /**
     * Convert the base 32 string to a byte array.
     * @param base32 The base32 string to convert.
     * @returns The byte array.
     * @throws If the input string contains a character not in the Base32 alphabet.
     */
    static decode(base32: string): Uint8Array;
    /**
     * Convert a byte array to base 32.
     * @param bytes The byte array to convert.
     * @returns The data as base32 string.
     */
    static encode(bytes: Uint8Array): string;
}
