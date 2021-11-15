/**
 * Class to help with base58 Encoding/Decoding.
 */
export declare class Base58 {
    /**
     * Convert the base 58 string to a byte array.
     * @param base58 The base58 string to convert.
     * @returns The byte array.
     * @throws If the input string contains a character not in the Base58 alphabet.
     */
    static decode(base58: string): Uint8Array;
    /**
     * Convert a byte array to base 58.
     * @param bytes The byte array to encode.
     * @returns The data as base58 string.
     */
    static encode(bytes: Uint8Array): string;
}
