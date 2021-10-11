/**
 * Convert arrays to and from different formats.
 */
export declare class Converter {
    /**
     * Encode a raw array to UTF8 string.
     * @param array The bytes to encode.
     * @param startIndex The index to start in the bytes.
     * @param length The length of bytes to read.
     * @returns The array formated as UTF8.
     */
    static bytesToUtf8(array: ArrayLike<number>, startIndex?: number, length?: number | undefined): string;
    /**
     * Convert a UTF8 string to raw array.
     * @param utf8 The text to decode.
     * @returns The array.
     */
    static utf8ToBytes(utf8: string): Uint8Array;
    /**
     * Encode a raw array to hex string.
     * @param array The bytes to encode.
     * @param startIndex The index to start in the bytes.
     * @param length The length of bytes to read.
     * @param reverse Reverse the combine direction.
     * @returns The array formated as hex.
     */
    static bytesToHex(array: ArrayLike<number>, startIndex?: number, length?: number | undefined, reverse?: boolean): string;
    /**
     * Decode a hex string to raw array.
     * @param hex The hex to decode.
     * @param reverse Store the characters in reverse.
     * @returns The array.
     */
    static hexToBytes(hex: string, reverse?: boolean): Uint8Array;
    /**
     * Convert the UTF8 to hex.
     * @param utf8 The text to convert.
     * @returns The hex version of the bytes.
     */
    static utf8ToHex(utf8: string): string;
    /**
     * Convert the hex text to text.
     * @param hex The hex to convert.
     * @returns The UTF8 version of the bytes.
     */
    static hexToUtf8(hex: string): string;
    /**
     * Is the data hex format.
     * @param value The value to test.
     * @returns True if the string is hex.
     */
    static isHex(value: string): boolean;
    /**
     * Convert bytes to binary string.
     * @param bytes The bytes to convert.
     * @returns A binary string of the bytes.
     */
    static bytesToBinary(bytes: Uint8Array): string;
    /**
     * Convert a binary string to bytes.
     * @param binary The binary string.
     * @returns The bytes.
     */
    static binaryToBytes(binary: string): Uint8Array;
    /**
     * Convert bytes to base64 string.
     * @param bytes The bytes to convert.
     * @returns A base64 string of the bytes.
     */
    static bytesToBase64(bytes: Uint8Array): string;
    /**
     * Convert a base64 string to bytes.
     * @param base64 The base64 string.
     * @returns The bytes.
     */
    static base64ToBytes(base64: string): Uint8Array;
}
