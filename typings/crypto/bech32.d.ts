/**
 * Class to help with Bech32 encoding/decoding.
 * Based on reference implementation https://github.com/sipa/bech32/blob/master/ref/javascript/bech32.js.
 */
export declare class Bech32 {
    /**
     * Encode the buffer.
     * @param humanReadablePart The header.
     * @param data The data to encode.
     * @returns The encoded data.
     */
    static encode(humanReadablePart: string, data: Uint8Array): string;
    /**
     * Encode the 5 bit data buffer.
     * @param humanReadablePart The header.
     * @param data5Bit The data to encode.
     * @returns The encoded data.
     */
    static encode5BitArray(humanReadablePart: string, data5Bit: Uint8Array): string;
    /**
     * Decode a bech32 string.
     * @param bech The text to decode.
     * @returns The decoded data or undefined if it could not be decoded.
     */
    static decode(bech: string): {
        humanReadablePart: string;
        data: Uint8Array;
    } | undefined;
    /**
     * Decode a bech32 string to 5 bit array.
     * @param bech The text to decode.
     * @returns The decoded data or undefined if it could not be decoded.
     */
    static decodeTo5BitArray(bech: string): {
        humanReadablePart: string;
        data: Uint8Array;
    } | undefined;
    /**
     * Convert the input bytes into 5 bit data.
     * @param bytes The bytes to convert.
     * @returns The data in 5 bit form.
     */
    static to5Bit(bytes: Uint8Array): Uint8Array;
    /**
     * Convert the 5 bit data to 8 bit.
     * @param fiveBit The 5 bit data to convert.
     * @returns The 5 bit data converted to 8 bit.
     */
    static from5Bit(fiveBit: Uint8Array): Uint8Array;
    /**
     * Does the given string match the bech32 pattern.
     * @param humanReadablePart The human readable part.
     * @param bech32Text The text to test.
     * @returns True if this is potentially a match.
     */
    static matches(humanReadablePart: string, bech32Text?: string): boolean;
}
