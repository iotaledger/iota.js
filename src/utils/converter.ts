// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */
/**
 * Convert arrays to and from different formats.
 */
export class Converter {
    /**
     * Lookup table for encoding.
     * @internal
     */
    private static ENCODE_LOOKUP: string[] | undefined;

    /**
     * Lookup table for decoding.
     * @internal
     */
    private static DECODE_LOOKUP: number[] | undefined;

    /**
     * Encode a raw array to text string.
     * @param array The bytes to encode.
     * @param startIndex The index to start in the bytes.
     * @param length The length of bytes to read.
     * @returns The array formated as hex.
     */
    public static bytesToAscii(
        array: ArrayLike<number>,
        startIndex?: number,
        length?: number | undefined): string {
        let ascii = "";
        const len = length ?? array.length;
        const start = startIndex ?? 0;
        for (let i = 0; i < len; i++) {
            ascii += String.fromCharCode(array[start + i]);
        }
        return ascii;
    }

    /**
     * Decode a text string to raw array.
     * @param ascii The text to decode.
     * @returns The array.
     */
    public static asciiToBytes(ascii: string): Uint8Array {
        const sizeof = ascii.length;
        const array = new Uint8Array(sizeof);

        for (let i = 0; i < ascii.length; i++) {
            array[i] = ascii.charCodeAt(i);
        }

        return array;
    }

    /**
     * Encode a raw array to hex string.
     * @param array The bytes to encode.
     * @param startIndex The index to start in the bytes.
     * @param length The length of bytes to read.
     * @param reverse Reverse the combine direction.
     * @returns The array formated as hex.
     */
    public static bytesToHex(
        array: ArrayLike<number>,
        startIndex?: number,
        length?: number | undefined,
        reverse?: boolean): string {
        let hex = "";
        this.buildHexLookups();
        if (Converter.ENCODE_LOOKUP) {
            const len = length ?? array.length;
            const start = startIndex ?? 0;
            if (reverse) {
                for (let i = 0; i < len; i++) {
                    hex = Converter.ENCODE_LOOKUP[array[start + i]] + hex;
                }
            } else {
                for (let i = 0; i < len; i++) {
                    hex += Converter.ENCODE_LOOKUP[array[start + i]];
                }
            }
        }
        return hex;
    }

    /**
     * Decode a hex string to raw array.
     * @param hex The hex to decode.
     * @param reverse Store the characters in reverse.
     * @returns The array.
     */
    public static hexToBytes(hex: string, reverse?: boolean): Uint8Array {
        const sizeof = hex.length >> 1;
        const length = sizeof << 1;
        const array = new Uint8Array(sizeof);

        this.buildHexLookups();
        if (Converter.DECODE_LOOKUP) {
            let i = 0;
            let n = 0;
            while (i < length) {
                array[n++] =
                    (Converter.DECODE_LOOKUP[hex.charCodeAt(i++)] << 4) |
                    Converter.DECODE_LOOKUP[hex.charCodeAt(i++)];
            }

            if (reverse) {
                array.reverse();
            }
        }
        return array;
    }

    /**
     * Convert the ascii text to hex.
     * @param ascii The ascii to convert.
     * @returns The hex version of the bytes.
     */
    public static asciiToHex(ascii: string): string {
        return Converter.bytesToHex(Converter.asciiToBytes(ascii));
    }

    /**
     * Convert the hex text to ascii.
     * @param hex The hex to convert.
     * @returns The ascii version of the bytes.
     */
    public static hexToAscii(hex: string): string {
        return Converter.bytesToAscii(Converter.hexToBytes(hex));
    }

    /**
     * Is the data hex format.
     * @param value The value to test.
     * @returns true if the string is hex.
     */
    public static isHex(value: string): boolean {
        if (value.length % 2 === 1) {
            return false;
        }
        return /[\da-f]/gi.test(value);
    }

    /**
     * Convert bytes to binary string.
     * @param bytes The bytes to convert.
     * @returns A binary string of the bytes.
     */
    public static bytesToBinary(bytes: Uint8Array): string {
        const b = [];
        for (let i = 0; i < bytes.length; i++) {
            b.push(bytes[i].toString(2).padStart(8, "0"));
        }
        return b.join("");
    }

    /**
     * Convert a binary string to bytes.
     * @param binary The binary string.
     * @returns The bytes.
     */
    public static binaryToBytes(binary: string): Uint8Array {
        const bytes = new Uint8Array(Math.ceil(binary.length / 8));
        for (let i = 0; i < bytes.length; i++) {
            bytes[i] = Number.parseInt(binary.slice((i * 8), (i + 1) * 8), 2);
        }
        return bytes;
    }

    /**
     * Build the static lookup tables.
     * @internal
     */
    private static buildHexLookups(): void {
        if (!Converter.ENCODE_LOOKUP || !Converter.DECODE_LOOKUP) {
            const alphabet = "0123456789abcdef";
            Converter.ENCODE_LOOKUP = [];
            Converter.DECODE_LOOKUP = [];

            for (let i = 0; i < 256; i++) {
                Converter.ENCODE_LOOKUP[i] = alphabet[(i >> 4) & 0xF] + alphabet[i & 0xF];
                if (i < 16) {
                    if (i < 10) {
                        Converter.DECODE_LOOKUP[0x30 + i] = i;
                    } else {
                        Converter.DECODE_LOOKUP[0x61 - 10 + i] = i;
                    }
                }
            }
        }
    }
}
