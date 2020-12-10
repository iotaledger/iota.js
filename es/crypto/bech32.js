"use strict";
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bech32 = void 0;
/**
 * Class to help with Bech32 encoding/decoding.
 * Based on reference implementation https://github.com/sipa/bech32/blob/master/ref/javascript/bech32.js
 */
var Bech32 = /** @class */ (function () {
    function Bech32() {
    }
    /**
     * Encode the buffer.
     * @param humanReadablePart The header
     * @param data The data to encode.
     * @returns The encoded data.
     */
    Bech32.encode = function (humanReadablePart, data) {
        return Bech32.encode5BitArray(humanReadablePart, Bech32.to5Bit(data));
    };
    /**
     * Encode the 5 bit data buffer.
     * @param humanReadablePart The header
     * @param data5Bit The data to encode.
     * @returns The encoded data.
     */
    Bech32.encode5BitArray = function (humanReadablePart, data5Bit) {
        var checksum = Bech32.createChecksum(humanReadablePart, data5Bit);
        var ret = "" + humanReadablePart + Bech32.SEPARATOR;
        for (var i = 0; i < data5Bit.length; i++) {
            ret += Bech32.CHARSET.charAt(data5Bit[i]);
        }
        for (var i = 0; i < checksum.length; i++) {
            ret += Bech32.CHARSET.charAt(checksum[i]);
        }
        return ret;
    };
    /**
     * Decode a bech32 string.
     * @param bech The text to decode.
     * @returns The decoded data or undefined if it could not be decoded.
     */
    Bech32.decode = function (bech) {
        var result = Bech32.decodeTo5BitArray(bech);
        return result ? {
            humanReadablePart: result.humanReadablePart,
            data: Bech32.from5Bit(result.data)
        } : undefined;
    };
    /**
     * Decode a bech32 string to 5 bit array.
     * @param bech The text to decode.
     * @returns The decoded data or undefined if it could not be decoded.
     */
    Bech32.decodeTo5BitArray = function (bech) {
        bech = bech.toLowerCase();
        var separatorPos = bech.lastIndexOf(Bech32.SEPARATOR);
        if (separatorPos === -1) {
            throw new Error("There is no separator character " + Bech32.SEPARATOR + " in the data");
        }
        if (separatorPos < 1) {
            throw new Error("The separator position is " + separatorPos + ", which is too early in the string");
        }
        if (separatorPos + 7 > bech.length) {
            throw new Error("The separator position is " + separatorPos + ", which doesn't leave enough space for data");
        }
        var data = new Uint8Array(bech.length - separatorPos - 1);
        var idx = 0;
        for (var i = separatorPos + 1; i < bech.length; i++) {
            var d = Bech32.CHARSET.indexOf(bech.charAt(i));
            if (d === -1) {
                throw new Error("Data contains characters not in the charset " + bech.charAt(i));
            }
            data[idx++] = Bech32.CHARSET.indexOf(bech.charAt(i));
        }
        var humanReadablePart = bech.slice(0, separatorPos);
        if (!Bech32.verifyChecksum(humanReadablePart, data)) {
            return;
        }
        return { humanReadablePart: humanReadablePart, data: data.slice(0, -6) };
    };
    /**
     * Convert the input bytes into 5 bit data.
     * @param bytes The bytes to convert.
     * @returns The data in 5 bit form.
     */
    Bech32.to5Bit = function (bytes) {
        return Bech32.convertBits(bytes, 8, 5, true);
    };
    /**
     * Convert the 5 bit data to 8 bit.
     * @param fiveBit The 5 bit data to convert.
     * @returns The 5 bit data converted to 8 bit.
     */
    Bech32.from5Bit = function (fiveBit) {
        return Bech32.convertBits(fiveBit, 5, 8, false);
    };
    /**
     * Does the given string match the bech32 pattern.
     * @param humanReadablePart The human readable part.
     * @param bech32Text The text to test.
     * @returns True if this is potentially a match.
     */
    Bech32.matches = function (humanReadablePart, bech32Text) {
        if (!bech32Text) {
            return false;
        }
        var regEx = new RegExp("^" + humanReadablePart + "1[" + Bech32.CHARSET + "]{6,}$");
        return regEx.test(bech32Text);
    };
    /**
     * Create the checksum from the human redable part and the data.
     * @param humanReadablePart The human readable part.
     * @param data The data.
     * @returns The checksum.
     * @internal
     */
    Bech32.createChecksum = function (humanReadablePart, data) {
        var expanded = Bech32.humanReadablePartExpand(humanReadablePart);
        var values = new Uint8Array(expanded.length + data.length + 6);
        values.set(expanded, 0);
        values.set(data, expanded.length);
        values.set([0, 0, 0, 0, 0, 0], expanded.length + data.length);
        var mod = Bech32.polymod(values) ^ 1;
        var ret = new Uint8Array(6);
        for (var i = 0; i < 6; i++) {
            ret[i] = (mod >> 5 * (5 - i)) & 31;
        }
        return ret;
    };
    /**
     * Verify the checksum given the humarn readable part and data.
     * @param humanReadablePart The human redable part to validate the checksum.
     * @param data The data to validate the checksum.
     * @returns True if the checksum was verified.
     * @internal
     */
    Bech32.verifyChecksum = function (humanReadablePart, data) {
        var expanded = Bech32.humanReadablePartExpand(humanReadablePart);
        var values = new Uint8Array(expanded.length + data.length);
        values.set(expanded, 0);
        values.set(data, expanded.length);
        return Bech32.polymod(values) === 1;
    };
    /**
     * Calculate the polymod of the values.
     * @param values The values to calculate the polymod for.
     * @returns The polymod of the values.
     * @internal
     */
    Bech32.polymod = function (values) {
        var chk = 1;
        for (var p = 0; p < values.length; p++) {
            var top_1 = chk >> 25;
            chk = ((chk & 0x1FFFFFF) << 5) ^ values[p];
            for (var i = 0; i < 5; ++i) {
                if ((top_1 >> i) & 1) {
                    chk ^= Bech32.GENERATOR[i];
                }
            }
        }
        return chk;
    };
    /**
     * Expand the human readable part.
     * @param humanReadablePart The human readable part to expand.
     * @returns The expanded human readable part.
     * @internal
     */
    Bech32.humanReadablePartExpand = function (humanReadablePart) {
        var ret = new Uint8Array((humanReadablePart.length * 2) + 1);
        var idx = 0;
        for (var i = 0; i < humanReadablePart.length; i++) {
            ret[idx++] = humanReadablePart.charCodeAt(i) >> 5;
        }
        ret[idx++] = 0;
        for (var i = 0; i < humanReadablePart.length; i++) {
            ret[idx++] = humanReadablePart.charCodeAt(i) & 31;
        }
        return ret;
    };
    /**
     * Convert input data from one bit resolution to another.
     * @param data The data to convert.
     * @param fromBits The resolution of the input data.
     * @param toBits The required resolution of the output data.
     * @param padding Include padding in the output.
     * @returns The converted data,
     * @internal
     */
    Bech32.convertBits = function (data, fromBits, toBits, padding) {
        var value = 0;
        var bits = 0;
        var maxV = (1 << toBits) - 1;
        var res = [];
        for (var i = 0; i < data.length; i++) {
            value = (value << fromBits) | data[i];
            bits += fromBits;
            while (bits >= toBits) {
                bits -= toBits;
                res.push((value >> bits) & maxV);
            }
        }
        if (padding) {
            if (bits > 0) {
                res.push((value << (toBits - bits)) & maxV);
            }
        }
        else {
            if (bits >= fromBits) {
                throw new Error("Excess padding");
            }
            if ((value << (toBits - bits)) & maxV) {
                throw new Error("Non-zero padding");
            }
        }
        return new Uint8Array(res);
    };
    /**
     * The alphabet to use.
     * @internal
     */
    Bech32.CHARSET = "qpzry9x8gf2tvdw0s3jn54khce6mua7l";
    /**
     * The separator between human readable part and data.
     * @internal
     */
    Bech32.SEPARATOR = "1";
    /**
     * The generator constants;
     * @internal
     */
    Bech32.GENERATOR = Uint32Array.from([
        0x3B6A57B2,
        0x26508E6D,
        0x1EA119FA,
        0x3D4233DD,
        0x2A1462B3
    ]);
    return Bech32;
}());
exports.Bech32 = Bech32;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVjaDMyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NyeXB0by9iZWNoMzIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLCtCQUErQjtBQUMvQixzQ0FBc0M7QUFDdEMsK0JBQStCOzs7QUFFL0I7OztHQUdHO0FBQ0g7SUFBQTtJQWlSQSxDQUFDO0lBeFBHOzs7OztPQUtHO0lBQ1csYUFBTSxHQUFwQixVQUFxQixpQkFBeUIsRUFBRSxJQUFnQjtRQUM1RCxPQUFPLE1BQU0sQ0FBQyxlQUFlLENBQUMsaUJBQWlCLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNXLHNCQUFlLEdBQTdCLFVBQThCLGlCQUF5QixFQUFFLFFBQW9CO1FBQ3pFLElBQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsaUJBQWlCLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFcEUsSUFBSSxHQUFHLEdBQUcsS0FBRyxpQkFBaUIsR0FBRyxNQUFNLENBQUMsU0FBVyxDQUFDO1FBRXBELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3RDLEdBQUcsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM3QztRQUVELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3RDLEdBQUcsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM3QztRQUVELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7O09BSUc7SUFDVyxhQUFNLEdBQXBC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