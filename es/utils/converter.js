"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Converter = void 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2NvbnZlcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBK0I7QUFDL0I7O0dBRUc7QUFDSDtJQUFBO0lBaUtBLENBQUM7SUFwSkc7Ozs7OztPQU1HO0lBQ1csc0JBQVksR0FBMUIsVUFDSSxLQUF3QixFQUN4QixVQUFtQixFQUNuQixNQUEyQjtRQUMzQixJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDZixJQUFNLEdBQUcsR0FBRyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQ25DLElBQU0sS0FBSyxHQUFHLFVBQVUsYUFBVixVQUFVLGNBQVYsVUFBVSxHQUFJLENBQUMsQ0FBQztRQUM5QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzFCLEtBQUssSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNsRDtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRDs7OztPQUlHO0lBQ1csc0JBQVksR0FBMUIsVUFBMkIsS0FBYTtRQUNwQyxJQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQzVCLElBQU0sS0FBSyxHQUFHLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXJDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ25DLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2xDO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVE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