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
class Bech32 {
    /**
     * Encode the buffer.
     * @param humanReadablePart The header
     * @param data The data to encode.
     * @returns The encoded data.
     */
    static encode(humanReadablePart, data) {
        return Bech32.encode5BitArray(humanReadablePart, Bech32.to5Bit(data));
    }
    /**
     * Encode the 5 bit data buffer.
     * @param humanReadablePart The header
     * @param data5Bit The data to encode.
     * @returns The encoded data.
     */
    static encode5BitArray(humanReadablePart, data5Bit) {
        const checksum = Bech32.createChecksum(humanReadablePart, data5Bit);
        let ret = `${humanReadablePart}${Bech32.SEPARATOR}`;
        for (let i = 0; i < data5Bit.length; i++) {
            ret += Bech32.CHARSET.charAt(data5Bit[i]);
        }
        for (let i = 0; i < checksum.length; i++) {
            ret += Bech32.CHARSET.charAt(checksum[i]);
        }
        return ret;
    }
    /**
     * Decode a bech32 string.
     * @param bech The text to decode.
     * @returns The decoded data or undefined if it could not be decoded.
     */
    static decode(bech) {
        const result = Bech32.decodeTo5BitArray(bech);
        return result ? {
            humanReadablePart: result.humanReadablePart,
            data: Bech32.from5Bit(result.data)
        } : undefined;
    }
    /**
     * Decode a bech32 string to 5 bit array.
     * @param bech The text to decode.
     * @returns The decoded data or undefined if it could not be decoded.
     */
    static decodeTo5BitArray(bech) {
        bech = bech.toLowerCase();
        const separatorPos = bech.lastIndexOf(Bech32.SEPARATOR);
        if (separatorPos === -1) {
            throw new Error(`There is no separator character ${Bech32.SEPARATOR} in the data`);
        }
        if (separatorPos < 1) {
            throw new Error(`The separator position is ${separatorPos}, which is too early in the string`);
        }
        if (separatorPos + 7 > bech.length) {
            throw new Error(`The separator position is ${separatorPos}, which doesn't leave enough space for data`);
        }
        const data = new Uint8Array(bech.length - separatorPos - 1);
        let idx = 0;
        for (let i = separatorPos + 1; i < bech.length; i++) {
            const d = Bech32.CHARSET.indexOf(bech.charAt(i));
            if (d === -1) {
                throw new Error(`Data contains characters not in the charset ${bech.charAt(i)}`);
            }
            data[idx++] = Bech32.CHARSET.indexOf(bech.charAt(i));
        }
        const humanReadablePart = bech.slice(0, separatorPos);
        if (!Bech32.verifyChecksum(humanReadablePart, data)) {
            return;
        }
        return { humanReadablePart, data: data.slice(0, -6) };
    }
    /**
     * Convert the input bytes into 5 bit data.
     * @param bytes The bytes to convert.
     * @returns The data in 5 bit form.
     */
    static to5Bit(bytes) {
        return Bech32.convertBits(bytes, 8, 5, true);
    }
    /**
     * Convert the 5 bit data to 8 bit.
     * @param fiveBit The 5 bit data to convert.
     * @returns The 5 bit data converted to 8 bit.
     */
    static from5Bit(fiveBit) {
        return Bech32.convertBits(fiveBit, 5, 8, false);
    }
    /**
     * Does the given string match the bech32 pattern.
     * @param humanReadablePart The human readable part.
     * @param bech32Text The text to test.
     * @returns True if this is potentially a match.
     */
    static matches(humanReadablePart, bech32Text) {
        if (!bech32Text) {
            return false;
        }
        const regEx = new RegExp(`^${humanReadablePart}1[${Bech32.CHARSET}]{6,}$`);
        return regEx.test(bech32Text);
    }
    /**
     * Create the checksum from the human redable part and the data.
     * @param humanReadablePart The human readable part.
     * @param data The data.
     * @returns The checksum.
     * @internal
     */
    static createChecksum(humanReadablePart, data) {
        const expanded = Bech32.humanReadablePartExpand(humanReadablePart);
        const values = new Uint8Array(expanded.length + data.length + 6);
        values.set(expanded, 0);
        values.set(data, expanded.length);
        values.set([0, 0, 0, 0, 0, 0], expanded.length + data.length);
        const mod = Bech32.polymod(values) ^ 1;
        const ret = new Uint8Array(6);
        for (let i = 0; i < 6; i++) {
            ret[i] = (mod >> 5 * (5 - i)) & 31;
        }
        return ret;
    }
    /**
     * Verify the checksum given the humarn readable part and data.
     * @param humanReadablePart The human redable part to validate the checksum.
     * @param data The data to validate the checksum.
     * @returns True if the checksum was verified.
     * @internal
     */
    static verifyChecksum(humanReadablePart, data) {
        const expanded = Bech32.humanReadablePartExpand(humanReadablePart);
        const values = new Uint8Array(expanded.length + data.length);
        values.set(expanded, 0);
        values.set(data, expanded.length);
        return Bech32.polymod(values) === 1;
    }
    /**
     * Calculate the polymod of the values.
     * @param values The values to calculate the polymod for.
     * @returns The polymod of the values.
     * @internal
     */
    static polymod(values) {
        let chk = 1;
        for (let p = 0; p < values.length; p++) {
            const top = chk >> 25;
            chk = ((chk & 0x1FFFFFF) << 5) ^ values[p];
            for (let i = 0; i < 5; ++i) {
                if ((top >> i) & 1) {
                    chk ^= Bech32.GENERATOR[i];
                }
            }
        }
        return chk;
    }
    /**
     * Expand the human readable part.
     * @param humanReadablePart The human readable part to expand.
     * @returns The expanded human readable part.
     * @internal
     */
    static humanReadablePartExpand(humanReadablePart) {
        const ret = new Uint8Array((humanReadablePart.length * 2) + 1);
        let idx = 0;
        for (let i = 0; i < humanReadablePart.length; i++) {
            ret[idx++] = humanReadablePart.charCodeAt(i) >> 5;
        }
        ret[idx++] = 0;
        for (let i = 0; i < humanReadablePart.length; i++) {
            ret[idx++] = humanReadablePart.charCodeAt(i) & 31;
        }
        return ret;
    }
    /**
     * Convert input data from one bit resolution to another.
     * @param data The data to convert.
     * @param fromBits The resolution of the input data.
     * @param toBits The required resolution of the output data.
     * @param padding Include padding in the output.
     * @returns The converted data,
     * @internal
     */
    static convertBits(data, fromBits, toBits, padding) {
        let value = 0;
        let bits = 0;
        const maxV = (1 << toBits) - 1;
        const res = [];
        for (let i = 0; i < data.length; i++) {
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
    }
}
exports.Bech32 = Bech32;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVjaDMyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NyeXB0by9iZWNoMzIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLCtCQUErQjtBQUMvQixzQ0FBc0M7QUFDdEMsK0JBQStCOzs7QUFFL0I7OztHQUdHO0FBQ0gsTUFBYSxNQUFNO0lBeUJmOzs7OztPQUtHO0lBQ0ksTUFBTSxDQUFDLE1BQU0sQ0FBQyxpQkFBeUIsRUFBRSxJQUFnQjtRQUM1RCxPQUFPLE1BQU0sQ0FBQyxlQUFlLENBQUMsaUJBQWlCLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLE1BQU0sQ0FBQyxlQUFlLENBQUMsaUJBQXlCLEVBQUUsUUFBb0I7UUFDekUsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUVwRSxJQUFJLEdBQUcsR0FBRyxHQUFHLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUVwRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN0QyxHQUFHLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDN0M7UUFFRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN0QyxHQUFHLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDN0M7UUFFRCxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksTUFBTSxD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