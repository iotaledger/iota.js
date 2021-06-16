// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */
import { toByteArray, fromByteArray } from "base64-js";
/**
 * Convert arrays to and from different formats.
 */
export class Converter {
    /**
     * Encode a raw array to UTF8 string.
     * @param array The bytes to encode.
     * @param startIndex The index to start in the bytes.
     * @param length The length of bytes to read.
     * @returns The array formated as UTF8.
     */
    static bytesToUtf8(array, startIndex, length) {
        const start = startIndex !== null && startIndex !== void 0 ? startIndex : 0;
        const len = length !== null && length !== void 0 ? length : array.length;
        let str = "";
        for (let i = start; i < start + len; i++) {
            const value = array[i];
            if (value < 0x80) {
                str += String.fromCharCode(value);
            }
            else if (value > 0xBF && value < 0xE0) {
                str += String.fromCharCode(((value & 0x1F) << 6) | (array[i + 1] & 0x3F));
                i += 1;
            }
            else if (value > 0xDF && value < 0xF0) {
                str += String.fromCharCode(((value & 0x0F) << 12) | ((array[i + 1] & 0x3F) << 6) | (array[i + 2] & 0x3F));
                i += 2;
            }
            else {
                // surrogate pair
                const charCode = (((value & 0x07) << 18) |
                    ((array[i + 1] & 0x3F) << 12) |
                    ((array[i + 2] & 0x3F) << 6) |
                    (array[i + 3] & 0x3F)) - 0x010000;
                str += String.fromCharCode((charCode >> 10) | 0xD800, (charCode & 0x03FF) | 0xDC00);
                i += 3;
            }
        }
        return str;
    }
    /**
     * Convert a UTF8 string to raw array.
     * @param utf8 The text to decode.
     * @returns The array.
     */
    static utf8ToBytes(utf8) {
        const bytes = [];
        for (let i = 0; i < utf8.length; i++) {
            let charcode = utf8.charCodeAt(i);
            if (charcode < 0x80) {
                bytes.push(charcode);
            }
            else if (charcode < 0x800) {
                bytes.push(0xC0 | (charcode >> 6), 0x80 | (charcode & 0x3F));
            }
            else if (charcode < 0xD800 || charcode >= 0xE000) {
                bytes.push(0xE0 | (charcode >> 12), 0x80 | ((charcode >> 6) & 0x3F), 0x80 | (charcode & 0x3F));
            }
            else {
                // surrogate pair
                i++;
                // UTF-16 encodes 0x10000-0x10FFFF by
                // subtracting 0x10000 and splitting the
                // 20 bits of 0x0-0xFFFFF into two halves
                charcode = 0x10000 + (((charcode & 0x3FF) << 10) | (utf8.charCodeAt(i) & 0x3FF));
                bytes.push(0xF0 | (charcode >> 18), 0x80 | ((charcode >> 12) & 0x3F), 0x80 | ((charcode >> 6) & 0x3F), 0x80 | (charcode & 0x3F));
            }
        }
        return Uint8Array.from(bytes);
    }
    /**
     * Encode a raw array to hex string.
     * @param array The bytes to encode.
     * @param startIndex The index to start in the bytes.
     * @param length The length of bytes to read.
     * @param reverse Reverse the combine direction.
     * @returns The array formated as hex.
     */
    static bytesToHex(array, startIndex, length, reverse) {
        let hex = "";
        this.buildHexLookups();
        if (Converter.ENCODE_LOOKUP) {
            const len = length !== null && length !== void 0 ? length : array.length;
            const start = startIndex !== null && startIndex !== void 0 ? startIndex : 0;
            if (reverse) {
                for (let i = 0; i < len; i++) {
                    hex = Converter.ENCODE_LOOKUP[array[start + i]] + hex;
                }
            }
            else {
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
    static hexToBytes(hex, reverse) {
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
     * Convert the UTF8 to hex.
     * @param utf8 The text to convert.
     * @returns The hex version of the bytes.
     */
    static utf8ToHex(utf8) {
        return Converter.bytesToHex(Converter.utf8ToBytes(utf8));
    }
    /**
     * Convert the hex text to text.
     * @param hex The hex to convert.
     * @returns The UTF8 version of the bytes.
     */
    static hexToUtf8(hex) {
        return Converter.bytesToUtf8(Converter.hexToBytes(hex));
    }
    /**
     * Is the data hex format.
     * @param value The value to test.
     * @returns True if the string is hex.
     */
    static isHex(value) {
        if (value.length % 2 === 1) {
            return false;
        }
        return /^[\da-f]+$/g.test(value);
    }
    /**
     * Convert bytes to binary string.
     * @param bytes The bytes to convert.
     * @returns A binary string of the bytes.
     */
    static bytesToBinary(bytes) {
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
    static binaryToBytes(binary) {
        const bytes = new Uint8Array(Math.ceil(binary.length / 8));
        for (let i = 0; i < bytes.length; i++) {
            bytes[i] = Number.parseInt(binary.slice((i * 8), (i + 1) * 8), 2);
        }
        return bytes;
    }
    /**
     * Convert bytes to base64 string.
     * @param bytes The bytes to convert.
     * @returns A base64 string of the bytes.
     */
    static bytesToBase64(bytes) {
        return fromByteArray(bytes);
    }
    /**
     * Convert a base64 string to bytes.
     * @param base64 The base64 string.
     * @returns The bytes.
     */
    static base64ToBytes(base64) {
        return toByteArray(base64);
    }
    /**
     * Build the static lookup tables.
     * @internal
     */
    static buildHexLookups() {
        if (!Converter.ENCODE_LOOKUP || !Converter.DECODE_LOOKUP) {
            const alphabet = "0123456789abcdef";
            Converter.ENCODE_LOOKUP = [];
            Converter.DECODE_LOOKUP = [];
            for (let i = 0; i < 256; i++) {
                Converter.ENCODE_LOOKUP[i] = alphabet[(i >> 4) & 0xF] + alphabet[i & 0xF];
                if (i < 16) {
                    if (i < 10) {
                        Converter.DECODE_LOOKUP[0x30 + i] = i;
                    }
                    else {
                        Converter.DECODE_LOOKUP[0x61 - 10 + i] = i;
                    }
                }
            }
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2NvbnZlcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLCtCQUErQjtBQUMvQixPQUFPLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUN2RDs7R0FFRztBQUNILE1BQU0sT0FBTyxTQUFTO0lBYWxCOzs7Ozs7T0FNRztJQUNJLE1BQU0sQ0FBQyxXQUFXLENBQ3JCLEtBQXdCLEVBQ3hCLFVBQW1CLEVBQ25CLE1BQTJCO1FBQzNCLE1BQU0sS0FBSyxHQUFHLFVBQVUsYUFBVixVQUFVLGNBQVYsVUFBVSxHQUFJLENBQUMsQ0FBQztRQUM5QixNQUFNLEdBQUcsR0FBRyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQ25DLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUViLEtBQUssSUFBSSxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsR0FBRyxLQUFLLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3RDLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUV2QixJQUFJLEtBQUssR0FBRyxJQUFJLEVBQUU7Z0JBQ2QsR0FBRyxJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDckM7aUJBQU0sSUFBSSxLQUFLLEdBQUcsSUFBSSxJQUFJLEtBQUssR0FBRyxJQUFJLEVBQUU7Z0JBQ3JDLEdBQUcsSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzFFLENBQUMsSUFB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