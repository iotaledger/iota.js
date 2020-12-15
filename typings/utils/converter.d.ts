/**
 * Convert arrays to and from different formats.
 */
export declare class Converter {
    /**
     * Encode a raw array to text string.
     * @param array The bytes to encode.
     * @param startIndex The index to start in the bytes.
     * @param length The length of bytes to read.
     * @returns The array formated as hex.
     */
    static bytesToAscii(array: ArrayLike<number>, startIndex?: number, length?: number | undefined): string;
    /**
     * Decode a text string to raw array.
     * @param ascii The text to decode.
     * @returns The array.
     */
    static asciiToBytes(ascii: string): Uint8Array;
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
     * Convert the ascii text to hex.
     * @param ascii The ascii to convert.
     * @returns The hex version of the bytes.
     */
    static asciiToHex(ascii: string): string;
    /**
     * Convert the hex text to ascii.
     * @param hex The hex to convert.
     * @returns The ascii version of the bytes.
     */
    static hexToAscii(hex: string): string;
    /**
     * Is the data hex format.
     * @param value The value to test.
     * @returns true if the string is hex.
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
}
