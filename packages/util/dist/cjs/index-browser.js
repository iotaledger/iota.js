(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('big-integer')) :
    typeof define === 'function' && define.amd ? define(['exports', 'big-integer'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.IotaUtil = {}, global.bigInt));
})(this, (function (exports, bigInt) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var bigInt__default = /*#__PURE__*/_interopDefaultLegacy(bigInt);

    // Copyright 2020 IOTA Stiftung
    // SPDX-License-Identifier: Apache-2.0
    /* eslint-disable no-bitwise */
    /* eslint-disable no-mixed-operators */
    /**
     * Class to help with base64 Encoding/Decoding.
     * Sourced from https://github.com/beatgammit/base64-js.
     */
    class Base64 {
        /**
         * Get the byte length of the data.
         * @param base64 The base64 string.
         * @returns The byte length of the data.
         */
        static byteLength(base64) {
            const lens = Base64.getLengths(base64);
            return Base64.calcByteLength(lens[0], lens[1]);
        }
        /**
         * Convert the base 64 string to a byte array.
         * @param base64 The base64 string to convert.
         * @returns The byte array.
         */
        static decode(base64) {
            let tmp;
            const lens = Base64.getLengths(base64);
            const validLen = lens[0];
            const placeHoldersLen = lens[1];
            const arr = new Uint8Array(Base64.calcByteLength(validLen, placeHoldersLen));
            let curByte = 0;
            // if there are placeholders, only get up to the last complete 4 chars
            const len = placeHoldersLen > 0 ? validLen - 4 : validLen;
            let i;
            for (i = 0; i < len; i += 4) {
                tmp =
                    (Base64._REVERSE_LOOKUP[base64.charCodeAt(i)] << 18) |
                        (Base64._REVERSE_LOOKUP[base64.charCodeAt(i + 1)] << 12) |
                        (Base64._REVERSE_LOOKUP[base64.charCodeAt(i + 2)] << 6) |
                        Base64._REVERSE_LOOKUP[base64.charCodeAt(i + 3)];
                arr[curByte++] = (tmp >> 16) & 0xff;
                arr[curByte++] = (tmp >> 8) & 0xff;
                arr[curByte++] = tmp & 0xff;
            }
            if (placeHoldersLen === 2) {
                tmp =
                    (Base64._REVERSE_LOOKUP[base64.charCodeAt(i)] << 2) |
                        (Base64._REVERSE_LOOKUP[base64.charCodeAt(i + 1)] >> 4);
                arr[curByte++] = tmp & 0xff;
            }
            if (placeHoldersLen === 1) {
                tmp =
                    (Base64._REVERSE_LOOKUP[base64.charCodeAt(i)] << 10) |
                        (Base64._REVERSE_LOOKUP[base64.charCodeAt(i + 1)] << 4) |
                        (Base64._REVERSE_LOOKUP[base64.charCodeAt(i + 2)] >> 2);
                arr[curByte++] = (tmp >> 8) & 0xff;
                arr[curByte++] = tmp & 0xff;
            }
            return arr;
        }
        /**
         * Convert a byte array to base 64.
         * @param bytes The byte array to convert.
         * @returns The data as bas64 string.
         */
        static encode(bytes) {
            let tmp;
            const len = bytes.length;
            const extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
            const parts = [];
            const maxChunkLength = 16383; // must be multiple of 3
            // go through the array every three bytes, we'll deal with trailing stuff later
            for (let i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
                parts.push(Base64.encodeChunk(bytes, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
            }
            // pad the end with zeros, but make sure to not forget the extra bytes
            if (extraBytes === 1) {
                tmp = bytes[len - 1];
                parts.push(`${Base64._LOOKUP[tmp >> 2] + Base64._LOOKUP[(tmp << 4) & 0x3f]}==`);
            }
            else if (extraBytes === 2) {
                tmp = (bytes[len - 2] << 8) + bytes[len - 1];
                parts.push(`${Base64._LOOKUP[tmp >> 10] + Base64._LOOKUP[(tmp >> 4) & 0x3f] + Base64._LOOKUP[(tmp << 2) & 0x3f]}=`);
            }
            return parts.join("");
        }
        /**
         * Calculate the byte length.
         * @param validLen The valid length.
         * @param placeHoldersLen The placeholder length.
         * @returns The length.
         * @internal
         */
        static calcByteLength(validLen, placeHoldersLen) {
            return ((validLen + placeHoldersLen) * 3) / 4 - placeHoldersLen;
        }
        /**
         * Get the valid and placeholder lengths from a bas64 string.
         * @param base64 The base64 string.
         * @returns The lengths.
         * @internal
         */
        static getLengths(base64) {
            const len = base64.length;
            if (len % 4 > 0) {
                throw new Error("Invalid string. Length must be a multiple of 4");
            }
            // Trim off extra bytes after placeholder bytes are found
            // See: https://github.com/beatgammit/base64-js/issues/42
            let validLen = base64.indexOf("=");
            if (validLen === -1) {
                validLen = len;
            }
            const placeHoldersLen = validLen === len ? 0 : 4 - (validLen % 4);
            return [validLen, placeHoldersLen];
        }
        /**
         * Convert the triplet to base 64.
         * @param num The number to convert.
         * @returns The base64 erncoding.
         * @internal
         */
        static tripletToBase64(num) {
            return (Base64._LOOKUP[(num >> 18) & 0x3f] +
                Base64._LOOKUP[(num >> 12) & 0x3f] +
                Base64._LOOKUP[(num >> 6) & 0x3f] +
                Base64._LOOKUP[num & 0x3f]);
        }
        /**
         * Encode a chunk.
         * @param bytes The byte array.
         * @param start The start index in the buffer.
         * @param end The end index in the buffer.
         * @returns The encoded chunk.
         * @internal
         */
        static encodeChunk(bytes, start, end) {
            let tmp;
            const output = [];
            for (let i = start; i < end; i += 3) {
                tmp = ((bytes[i] << 16) & 0xff0000) + ((bytes[i + 1] << 8) & 0xff00) + (bytes[i + 2] & 0xff);
                output.push(Base64.tripletToBase64(tmp));
            }
            return output.join("");
        }
    }
    /**
     * Alphabet table for encoding.
     * @internal
     */
    Base64._LOOKUP = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    /**
     * Alphabet table for decoding.
     * @internal
     */
    Base64._REVERSE_LOOKUP = {
        "43": 62,
        "45": 62,
        "47": 63,
        "48": 52,
        "49": 53,
        "50": 54,
        "51": 55,
        "52": 56,
        "53": 57,
        "54": 58,
        "55": 59,
        "56": 60,
        "57": 61,
        "65": 0,
        "66": 1,
        "67": 2,
        "68": 3,
        "69": 4,
        "70": 5,
        "71": 6,
        "72": 7,
        "73": 8,
        "74": 9,
        "75": 10,
        "76": 11,
        "77": 12,
        "78": 13,
        "79": 14,
        "80": 15,
        "81": 16,
        "82": 17,
        "83": 18,
        "84": 19,
        "85": 20,
        "86": 21,
        "87": 22,
        "88": 23,
        "89": 24,
        "90": 25,
        "95": 63,
        "97": 26,
        "98": 27,
        "99": 28,
        "100": 29,
        "101": 30,
        "102": 31,
        "103": 32,
        "104": 33,
        "105": 34,
        "106": 35,
        "107": 36,
        "108": 37,
        "109": 38,
        "110": 39,
        "111": 40,
        "112": 41,
        "113": 42,
        "114": 43,
        "115": 44,
        "116": 45,
        "117": 46,
        "118": 47,
        "119": 48,
        "120": 49,
        "121": 50,
        "122": 51
    };

    // Copyright 2020 IOTA Stiftung
    // SPDX-License-Identifier: Apache-2.0
    /**
     * Class to help with random generation.
     */
    class PlatformHelper {
    }
    /**
     * Is this the browser.
     * @returns True if running in browser.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    PlatformHelper.isNodeJs = false;

    // Copyright 2020 IOTA Stiftung
    /**
     * Class to help with random generation.
     */
    class RandomHelper {
        /**
         * Generate a new random array.
         * @param length The length of buffer to create.
         * @returns The random array.
         */
        static generate(length) {
            {
                const randomBytes = new Uint8Array(length);
                window.crypto.getRandomValues(randomBytes);
                return randomBytes;
            }
        }
    }

    // Copyright 2020 IOTA Stiftung
    /**
     * Helper methods for bigints.
     */
    class BigIntHelper {
        /**
         * Load 3 bytes from array as bigint.
         * @param data The input array.
         * @param byteOffset The start index to read from.
         * @returns The bigint.
         */
        static read3(data, byteOffset) {
            const v0 = (data[byteOffset + 0] + (data[byteOffset + 1] << 8) + (data[byteOffset + 2] << 16)) >>> 0;
            return bigInt__default["default"](v0);
        }
        /**
         * Load 4 bytes from array as bigint.
         * @param data The input array.
         * @param byteOffset The start index to read from.
         * @returns The bigint.
         */
        static read4(data, byteOffset) {
            const v0 = (data[byteOffset + 0] +
                (data[byteOffset + 1] << 8) +
                (data[byteOffset + 2] << 16) +
                (data[byteOffset + 3] << 24)) >>>
                0;
            return bigInt__default["default"](v0);
        }
        /**
         * Load 8 bytes from array as bigint.
         * @param data The data to read from.
         * @param byteOffset The start index to read from.
         * @returns The bigint.
         */
        static read8(data, byteOffset) {
            const v0 = (data[byteOffset + 0] +
                (data[byteOffset + 1] << 8) +
                (data[byteOffset + 2] << 16) +
                (data[byteOffset + 3] << 24)) >>>
                0;
            const v1 = (data[byteOffset + 4] +
                (data[byteOffset + 5] << 8) +
                (data[byteOffset + 6] << 16) +
                (data[byteOffset + 7] << 24)) >>>
                0;
            return bigInt__default["default"](v1).shiftLeft(BigIntHelper.BIG_32).or(v0);
        }
        /**
         * Convert a big int to bytes.
         * @param value The bigint.
         * @param data The buffer to write into.
         * @param byteOffset The start index to write from.
         */
        static write8(value, data, byteOffset) {
            const v0 = Number(value.and(BigIntHelper.BIG_32_MASK));
            const v1 = Number(value.shiftRight(BigIntHelper.BIG_32).and(BigIntHelper.BIG_32_MASK));
            data[byteOffset] = v0 & 0xff;
            data[byteOffset + 1] = (v0 >> 8) & 0xff;
            data[byteOffset + 2] = (v0 >> 16) & 0xff;
            data[byteOffset + 3] = (v0 >> 24) & 0xff;
            data[byteOffset + 4] = v1 & 0xff;
            data[byteOffset + 5] = (v1 >> 8) & 0xff;
            data[byteOffset + 6] = (v1 >> 16) & 0xff;
            data[byteOffset + 7] = (v1 >> 24) & 0xff;
        }
        /**
         * Generate a random bigint.
         * @returns The bitint.
         */
        static random() {
            return BigIntHelper.read8(RandomHelper.generate(8), 0);
        }
    }
    // @internal
    BigIntHelper.BIG_32 = bigInt__default["default"](32);
    // @internal
    BigIntHelper.BIG_32_MASK = bigInt__default["default"](0xffffffff);

    // Copyright 2020 IOTA Stiftung
    /**
     * Convert arrays to and from different formats.
     */
    class Converter {
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
                else if (value > 0xbf && value < 0xe0) {
                    str += String.fromCharCode(((value & 0x1f) << 6) | (array[i + 1] & 0x3f));
                    i += 1;
                }
                else if (value > 0xdf && value < 0xf0) {
                    str += String.fromCharCode(((value & 0x0f) << 12) | ((array[i + 1] & 0x3f) << 6) | (array[i + 2] & 0x3f));
                    i += 2;
                }
                else {
                    // surrogate pair
                    const charCode = (((value & 0x07) << 18) |
                        ((array[i + 1] & 0x3f) << 12) |
                        ((array[i + 2] & 0x3f) << 6) |
                        (array[i + 3] & 0x3f)) -
                        0x010000;
                    str += String.fromCharCode((charCode >> 10) | 0xd800, (charCode & 0x03ff) | 0xdc00);
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
                    bytes.push(0xc0 | (charcode >> 6), 0x80 | (charcode & 0x3f));
                }
                else if (charcode < 0xd800 || charcode >= 0xe000) {
                    bytes.push(0xe0 | (charcode >> 12), 0x80 | ((charcode >> 6) & 0x3f), 0x80 | (charcode & 0x3f));
                }
                else {
                    // surrogate pair
                    i++;
                    // UTF-16 encodes 0x10000-0x10FFFF by
                    // subtracting 0x10000 and splitting the
                    // 20 bits of 0x0-0xFFFFF into two halves
                    charcode = 0x10000 + (((charcode & 0x3ff) << 10) | (utf8.charCodeAt(i) & 0x3ff));
                    bytes.push(0xf0 | (charcode >> 18), 0x80 | ((charcode >> 12) & 0x3f), 0x80 | ((charcode >> 6) & 0x3f), 0x80 | (charcode & 0x3f));
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
                        (Converter.DECODE_LOOKUP[hex.charCodeAt(i++)] << 4) | Converter.DECODE_LOOKUP[hex.charCodeAt(i++)];
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
                bytes[i] = Number.parseInt(binary.slice(i * 8, (i + 1) * 8), 2);
            }
            return bytes;
        }
        /**
         * Convert bytes to base64 string.
         * @param bytes The bytes to convert.
         * @returns A base64 string of the bytes.
         */
        static bytesToBase64(bytes) {
            return Base64.encode(bytes);
        }
        /**
         * Convert a base64 string to bytes.
         * @param base64 The base64 string.
         * @returns The bytes.
         */
        static base64ToBytes(base64) {
            return Base64.decode(base64);
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
                    Converter.ENCODE_LOOKUP[i] = alphabet[(i >> 4) & 0xf] + alphabet[i & 0xf];
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

    /**
     * Keep track of the read index within a stream.
     */
    class ReadStream {
        /**
         * Create a new instance of ReadStream.
         * @param storage The data to access.
         * @param readStartIndex The index to start the reading from.
         */
        constructor(storage, readStartIndex = 0) {
            this._storage = new Uint8Array(storage);
            this._readIndex = readStartIndex;
        }
        /**
         * Get the length of the storage.
         * @returns The storage length.
         */
        length() {
            return this._storage.byteLength;
        }
        /**
         * Does the storage have enough data remaining.
         * @param remaining The amount of space needed.
         * @returns True if it has enough data.
         */
        hasRemaining(remaining) {
            return this._readIndex + remaining <= this._storage.byteLength;
        }
        /**
         * How much unused data is there.
         * @returns The amount of unused data.
         */
        unused() {
            return this._storage.byteLength - this._readIndex;
        }
        /**
         * Get the current read index.
         * @returns The current read index.
         */
        getReadIndex() {
            return this._readIndex;
        }
        /**
         * Set the current read index.
         * @param readIndex The current read index.
         */
        setReadIndex(readIndex) {
            this._readIndex = readIndex;
            if (readIndex >= this._storage.length) {
                throw new Error(`You cannot set the readIndex to ${readIndex} as the stream is only ${this._storage.length} in length`);
            }
        }
        /**
         * Read fixed length as hex.
         * @param name The name of the data we are trying to read.
         * @param length The length of the data to read.
         * @param moveIndex Move the index pointer on.
         * @returns The hex formatted data.
         */
        readFixedHex(name, length, moveIndex = true) {
            if (!this.hasRemaining(length)) {
                throw new Error(`${name} length ${length} exceeds the remaining data ${this.unused()}`);
            }
            const hex = Converter.bytesToHex(this._storage, this._readIndex, length);
            if (moveIndex) {
                this._readIndex += length;
            }
            return hex;
        }
        /**
         * Read an array of byte from the stream.
         * @param name The name of the data we are trying to read.
         * @param length The length of the array to read.
         * @param moveIndex Move the index pointer on.
         * @returns The value.
         */
        readBytes(name, length, moveIndex = true) {
            if (!this.hasRemaining(length)) {
                throw new Error(`${name} length ${length} exceeds the remaining data ${this.unused()}`);
            }
            const val = this._storage.slice(this._readIndex, this._readIndex + length);
            if (moveIndex) {
                this._readIndex += length;
            }
            return val;
        }
        /**
         * Read a byte from the stream.
         * @param name The name of the data we are trying to read.
         * @param moveIndex Move the index pointer on.
         * @returns The value.
         */
        readByte(name, moveIndex = true) {
            if (!this.hasRemaining(1)) {
                throw new Error(`${name} length 1 exceeds the remaining data ${this.unused()}`);
            }
            const val = this._storage[this._readIndex];
            if (moveIndex) {
                this._readIndex += 1;
            }
            return val;
        }
        /**
         * Read a UInt16 from the stream.
         * @param name The name of the data we are trying to read.
         * @param moveIndex Move the index pointer on.
         * @returns The value.
         */
        readUInt16(name, moveIndex = true) {
            if (!this.hasRemaining(2)) {
                throw new Error(`${name} length 2 exceeds the remaining data ${this.unused()}`);
            }
            const val = this._storage[this._readIndex] | (this._storage[this._readIndex + 1] << 8);
            if (moveIndex) {
                this._readIndex += 2;
            }
            return val;
        }
        /**
         * Read a UInt32 from the stream.
         * @param name The name of the data we are trying to read.
         * @param moveIndex Move the index pointer on.
         * @returns The value.
         */
        readUInt32(name, moveIndex = true) {
            if (!this.hasRemaining(4)) {
                throw new Error(`${name} length 4 exceeds the remaining data ${this.unused()}`);
            }
            const val = this._storage[this._readIndex] |
                (this._storage[this._readIndex + 1] * 0x100) |
                (this._storage[this._readIndex + 2] * 0x10000 + this._storage[this._readIndex + 3] * 0x1000000);
            if (moveIndex) {
                this._readIndex += 4;
            }
            return val;
        }
        /**
         * Read a UInt64 from the stream.
         * @param name The name of the data we are trying to read.
         * @param moveIndex Move the index pointer on.
         * @returns The value.
         */
        readUInt64(name, moveIndex = true) {
            if (!this.hasRemaining(8)) {
                throw new Error(`${name} length 8 exceeds the remaining data ${this.unused()}`);
            }
            const val = BigIntHelper.read8(this._storage, this._readIndex);
            if (moveIndex) {
                this._readIndex += 8;
            }
            return val;
        }
        /**
         * Read a boolean from the stream.
         * @param name The name of the data we are trying to read.
         * @param moveIndex Move the index pointer on.
         * @returns The value.
         */
        readBoolean(name, moveIndex = true) {
            if (!this.hasRemaining(1)) {
                throw new Error(`${name} length 1 exceeds the remaining data ${this.unused()}`);
            }
            const val = this._storage[this._readIndex];
            if (moveIndex) {
                this._readIndex += 1;
            }
            return val !== 0;
        }
    }

    /**
     * Keep track of the write index within a stream.
     */
    class WriteStream {
        /**
         * Create a new instance of ReadStream.
         */
        constructor() {
            this._storage = new Uint8Array(WriteStream.CHUNK_SIZE);
            this._writeIndex = 0;
        }
        /**
         * Get the length of the stream.
         * @returns The stream length.
         */
        length() {
            return this._storage.length;
        }
        /**
         * How much unused data is there.
         * @returns The amount of unused data.
         */
        unused() {
            return this._storage.length - this._writeIndex;
        }
        /**
         * Get the final stream as bytes.
         * @returns The final stream.
         */
        finalBytes() {
            return this._storage.subarray(0, this._writeIndex);
        }
        /**
         * Get the final stream as hex.
         * @returns The final stream as hex.
         */
        finalHex() {
            return Converter.bytesToHex(this._storage.subarray(0, this._writeIndex));
        }
        /**
         * Get the current write index.
         * @returns The current write index.
         */
        getWriteIndex() {
            return this._writeIndex;
        }
        /**
         * Set the current write index.
         * @param writeIndex The current write index.
         */
        setWriteIndex(writeIndex) {
            this._writeIndex = writeIndex;
            if (writeIndex >= this._storage.length) {
                throw new Error(`You cannot set the writeIndex to ${writeIndex} as the stream is only ${this._storage.length} in length`);
            }
        }
        /**
         * Write fixed length stream.
         * @param name The name of the data we are trying to write.
         * @param length The length of the data to write.
         * @param val The data to write.
         */
        writeFixedHex(name, length, val) {
            if (!Converter.isHex(val)) {
                throw new Error(`The ${name} should be in hex format`);
            }
            // Hex should be twice the length as each byte is 2 characters
            if (length * 2 !== val.length) {
                throw new Error(`${name} length ${val.length} does not match expected length ${length * 2}`);
            }
            this.expand(length);
            this._storage.set(Converter.hexToBytes(val), this._writeIndex);
            this._writeIndex += length;
        }
        /**
         * Write fixed length stream.
         * @param name The name of the data we are trying to write.
         * @param length The length of the data to write.
         * @param val The data to write.
         */
        writeBytes(name, length, val) {
            this.expand(length);
            this._storage.set(val, this._writeIndex);
            this._writeIndex += length;
        }
        /**
         * Write a byte to the stream.
         * @param name The name of the data we are trying to write.
         * @param val The data to write.
         */
        writeByte(name, val) {
            this.expand(1);
            this._storage[this._writeIndex++] = val & 0xff;
        }
        /**
         * Write a UInt16 to the stream.
         * @param name The name of the data we are trying to write.
         * @param val The data to write.
         */
        writeUInt16(name, val) {
            this.expand(2);
            this._storage[this._writeIndex++] = val & 0xff;
            this._storage[this._writeIndex++] = val >>> 8;
        }
        /**
         * Write a UInt32 to the stream.
         * @param name The name of the data we are trying to write.
         * @param val The data to write.
         */
        writeUInt32(name, val) {
            this.expand(4);
            this._storage[this._writeIndex++] = val & 0xff;
            this._storage[this._writeIndex++] = val >>> 8;
            this._storage[this._writeIndex++] = val >>> 16;
            this._storage[this._writeIndex++] = val >>> 24;
        }
        /**
         * Write a UInt64 to the stream.
         * @param name The name of the data we are trying to write.
         * @param val The data to write.
         */
        writeUInt64(name, val) {
            this.expand(8);
            BigIntHelper.write8(val, this._storage, this._writeIndex);
            this._writeIndex += 8;
        }
        /**
         * Write a boolean to the stream.
         * @param name The name of the data we are trying to write.
         * @param val The data to write.
         */
        writeBoolean(name, val) {
            this.expand(1);
            this._storage[this._writeIndex++] = val ? 1 : 0;
        }
        /**
         * Expand the storage if there is not enough spave.
         * @param additional The amount of space needed.
         */
        expand(additional) {
            if (this._writeIndex + additional > this._storage.byteLength) {
                const newArr = new Uint8Array(this._storage.length + Math.ceil(additional / WriteStream.CHUNK_SIZE) * WriteStream.CHUNK_SIZE);
                newArr.set(this._storage, 0);
                this._storage = newArr;
            }
        }
    }
    /**
     * Chunk size to expand the storage.
     * @internal
     */
    WriteStream.CHUNK_SIZE = 4096;

    exports.Base64 = Base64;
    exports.BigIntHelper = BigIntHelper;
    exports.Converter = Converter;
    exports.PlatformHelper = PlatformHelper;
    exports.RandomHelper = RandomHelper;
    exports.ReadStream = ReadStream;
    exports.WriteStream = WriteStream;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
