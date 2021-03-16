"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Converter = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */
var base64_js_1 = require("base64-js");
/**
 * Convert arrays to and from different formats.
 */
var Converter = /** @class */ (function () {
    function Converter() {
    }
    /**
     * Encode a raw array to UTF8 string.
     * @param array The bytes to encode.
     * @param startIndex The index to start in the bytes.
     * @param length The length of bytes to read.
     * @returns The array formated as UTF8.
     */
    Converter.bytesToUtf8 = function (array, startIndex, length) {
        var start = startIndex !== null && startIndex !== void 0 ? startIndex : 0;
        var len = length !== null && length !== void 0 ? length : array.length;
        var str = "";
        for (var i = start; i < start + len; i++) {
            var value = array[i];
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
                var charCode = (((value & 0x07) << 18) |
                    ((array[i + 1] & 0x3F) << 12) |
                    ((array[i + 2] & 0x3F) << 6) |
                    (array[i + 3] & 0x3F)) - 0x010000;
                str += String.fromCharCode((charCode >> 10) | 0xD800, (charCode & 0x03FF) | 0xDC00);
                i += 3;
            }
        }
        return str;
    };
    /**
     * Convert a UTF8 string to raw array.
     * @param utf8 The text to decode.
     * @returns The array.
     */
    Converter.utf8ToBytes = function (utf8) {
        var bytes = [];
        for (var i = 0; i < utf8.length; i++) {
            var charcode = utf8.charCodeAt(i);
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
    };
    /**
     * Encode a raw array to hex string.
     * @param array The bytes to encode.
     * @param startIndex The index to start in the bytes.
     * @param length The length of bytes to read.
     * @param reverse Reverse the combine direction.
     * @returns The array formated as hex.
     */
    Converter.bytesToHex = function (array, startIndex, length, reverse) {
        var hex = "";
        this.buildHexLookups();
        if (Converter.ENCODE_LOOKUP) {
            var len = length !== null && length !== void 0 ? length : array.length;
            var start = startIndex !== null && startIndex !== void 0 ? startIndex : 0;
            if (reverse) {
                for (var i = 0; i < len; i++) {
                    hex = Converter.ENCODE_LOOKUP[array[start + i]] + hex;
                }
            }
            else {
                for (var i = 0; i < len; i++) {
                    hex += Converter.ENCODE_LOOKUP[array[start + i]];
                }
            }
        }
        return hex;
    };
    /**
     * Decode a hex string to raw array.
     * @param hex The hex to decode.
     * @param reverse Store the characters in reverse.
     * @returns The array.
     */
    Converter.hexToBytes = function (hex, reverse) {
        var sizeof = hex.length >> 1;
        var length = sizeof << 1;
        var array = new Uint8Array(sizeof);
        this.buildHexLookups();
        if (Converter.DECODE_LOOKUP) {
            var i = 0;
            var n = 0;
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
    };
    /**
     * Convert the UTF8 to hex.
     * @param utf8 The text to convert.
     * @returns The hex version of the bytes.
     */
    Converter.utf8ToHex = function (utf8) {
        return Converter.bytesToHex(Converter.utf8ToBytes(utf8));
    };
    /**
     * Convert the hex text to text.
     * @param hex The hex to convert.
     * @returns The UTF8 version of the bytes.
     */
    Converter.hexToUtf8 = function (hex) {
        return Converter.bytesToUtf8(Converter.hexToBytes(hex));
    };
    /**
     * Is the data hex format.
     * @param value The value to test.
     * @returns true if the string is hex.
     */
    Converter.isHex = function (value) {
        if (value.length % 2 === 1) {
            return false;
        }
        return /^[\da-f]+$/g.test(value);
    };
    /**
     * Convert bytes to binary string.
     * @param bytes The bytes to convert.
     * @returns A binary string of the bytes.
     */
    Converter.bytesToBinary = function (bytes) {
        var b = [];
        for (var i = 0; i < bytes.length; i++) {
            b.push(bytes[i].toString(2).padStart(8, "0"));
        }
        return b.join("");
    };
    /**
     * Convert a binary string to bytes.
     * @param binary The binary string.
     * @returns The bytes.
     */
    Converter.binaryToBytes = function (binary) {
        var bytes = new Uint8Array(Math.ceil(binary.length / 8));
        for (var i = 0; i < bytes.length; i++) {
            bytes[i] = Number.parseInt(binary.slice((i * 8), (i + 1) * 8), 2);
        }
        return bytes;
    };
    /**
     * Convert bytes to base64 string.
     * @param bytes The bytes to convert.
     * @returns A base64 string of the bytes.
     */
    Converter.bytesToBase64 = function (bytes) {
        return base64_js_1.fromByteArray(bytes);
    };
    /**
     * Convert a base64 string to bytes.
     * @param base64 The base64 string.
     * @returns The bytes.
     */
    Converter.base64ToBytes = function (base64) {
        return base64_js_1.toByteArray(base64);
    };
    /**
     * Build the static lookup tables.
     * @internal
     */
    Converter.buildHexLookups = function () {
        if (!Converter.ENCODE_LOOKUP || !Converter.DECODE_LOOKUP) {
            var alphabet = "0123456789abcdef";
            Converter.ENCODE_LOOKUP = [];
            Converter.DECODE_LOOKUP = [];
            for (var i = 0; i < 256; i++) {
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
    };
    return Converter;
}());
exports.Converter = Converter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2NvbnZlcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLCtCQUErQjtBQUMvQix1Q0FBdUQ7QUFDdkQ7O0dBRUc7QUFDSDtJQUFBO0lBc1BBLENBQUM7SUF6T0c7Ozs7OztPQU1HO0lBQ1cscUJBQVcsR0FBekIsVUFDSSxLQUF3QixFQUN4QixVQUFtQixFQUNuQixNQUEyQjtRQUMzQixJQUFNLEtBQUssR0FBRyxVQUFVLGFBQVYsVUFBVSxjQUFWLFVBQVUsR0FBSSxDQUFDLENBQUM7UUFDOUIsSUFBTSxHQUFHLEdBQUcsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUNuQyxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFFYixLQUFLLElBQUksQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLEdBQUcsS0FBSyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN0QyxJQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFdkIsSUFBSSxLQUFLLEdBQUcsSUFBSSxFQUFFO2dCQUNkLEdBQUcsSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3JDO2lCQUFNLElBQUksS0FBSyxHQUFHLElBQUksSUFBSSxLQUFLLEdBQUcsSUFBSSxFQUFFO2dCQUNyQyxHQUFHLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUMxRSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ1Y7aUJBQU0sSUFBSSxLQUFLLEdBQUcs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