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
     * Encode a raw array to text string.
     * @param array The bytes to encode.
     * @param startIndex The index to start in the bytes.
     * @param length The length of bytes to read.
     * @returns The array formated as hex.
     */
    Converter.bytesToAscii = function (array, startIndex, length) {
        var ascii = "";
        var len = length !== null && length !== void 0 ? length : array.length;
        var start = startIndex !== null && startIndex !== void 0 ? startIndex : 0;
        for (var i = 0; i < len; i++) {
            ascii += String.fromCharCode(array[start + i]);
        }
        return ascii;
    };
    /**
     * Decode a text string to raw array.
     * @param ascii The text to decode.
     * @returns The array.
     */
    Converter.asciiToBytes = function (ascii) {
        var sizeof = ascii.length;
        var array = new Uint8Array(sizeof);
        for (var i = 0; i < ascii.length; i++) {
            array[i] = ascii.charCodeAt(i);
        }
        return array;
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
     * Convert the ascii text to hex.
     * @param ascii The ascii to convert.
     * @returns The hex version of the bytes.
     */
    Converter.asciiToHex = function (ascii) {
        return Converter.bytesToHex(Converter.asciiToBytes(ascii));
    };
    /**
     * Convert the hex text to ascii.
     * @param hex The hex to convert.
     * @returns The ascii version of the bytes.
     */
    Converter.hexToAscii = function (hex) {
        return Converter.bytesToAscii(Converter.hexToBytes(hex));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2NvbnZlcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLCtCQUErQjtBQUMvQjs7R0FFRztBQUNIO0lBQUE7SUEwTEEsQ0FBQztJQTdLRzs7Ozs7O09BTUc7SUFDVyxzQkFBWSxHQUExQixVQUNJLEtBQXdCLEVBQ3hCLFVBQW1CLEVBQ25CLE1BQTJCO1FBQzNCLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNmLElBQU0sR0FBRyxHQUFHLE1BQU0sYUFBTixNQUFNLGNBQU4sTUFBTSxHQUFJLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDbkMsSUFBTSxLQUFLLEdBQUcsVUFBVSxhQUFWLFVBQVUsY0FBVixVQUFVLEdBQUksQ0FBQyxDQUFDO1FBQzlCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDMUIsS0FBSyxJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2xEO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVEOzs7O09BSUc7SUFDVyxzQkFBWSxHQUExQixVQUEyQixLQUFhO1FBQ3BDLElBQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDNUIsSUFBTSxLQUFLLEdBQUcsSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFckMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbkMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbEM7UUFFRCxPQUFP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