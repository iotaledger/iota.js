"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Converter = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */
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
        return /[\da-f]/gi.test(value);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2NvbnZlcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLCtCQUErQjtBQUMvQjs7R0FFRztBQUNIO0lBQUE7SUFvT0EsQ0FBQztJQXZORzs7Ozs7O09BTUc7SUFDVyxxQkFBVyxHQUF6QixVQUNJLEtBQXdCLEVBQ3hCLFVBQW1CLEVBQ25CLE1BQTJCO1FBQzNCLElBQU0sS0FBSyxHQUFHLFVBQVUsYUFBVixVQUFVLGNBQVYsVUFBVSxHQUFJLENBQUMsQ0FBQztRQUM5QixJQUFNLEdBQUcsR0FBRyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQ25DLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUViLEtBQUssSUFBSSxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsR0FBRyxLQUFLLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3RDLElBQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUV2QixJQUFJLEtBQUssR0FBRyxJQUFJLEVBQUU7Z0JBQ2QsR0FBRyxJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDckM7aUJBQU0sSUFBSSxLQUFLLEdBQUcsSUFBSSxJQUFJLEtBQUssR0FBRyxJQUFJLEVBQUU7Z0JBQ3JDLEdBQUcsSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzFFLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDVjtpQkFBTSxJQUFJLEtBQUssR0FBRyxJQUFJLElBQUksS0FB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