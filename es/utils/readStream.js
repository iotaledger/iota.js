"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadStream = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */
const bigIntHelper_1 = require("./bigIntHelper");
const converter_1 = require("./converter");
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
        const hex = converter_1.Converter.bytesToHex(this._storage, this._readIndex, length);
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
        const val = this._storage[this._readIndex] |
            (this._storage[this._readIndex + 1] << 8);
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
        const val = (this._storage[this._readIndex]) |
            (this._storage[this._readIndex + 1] * 0x100) |
            (this._storage[this._readIndex + 2] * 0x10000) +
                (this._storage[this._readIndex + 3] * 0x1000000);
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
        const val = bigIntHelper_1.BigIntHelper.read8(this._storage, this._readIndex);
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
exports.ReadStream = ReadStream;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZFN0cmVhbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9yZWFkU3RyZWFtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtCQUErQjtBQUMvQixzQ0FBc0M7QUFDdEMsK0JBQStCO0FBQy9CLGlEQUE4QztBQUM5QywyQ0FBd0M7QUFFeEM7O0dBRUc7QUFDSCxNQUFhLFVBQVU7SUFhbkI7Ozs7T0FJRztJQUNILFlBQVksT0FBbUIsRUFBRSxpQkFBeUIsQ0FBQztRQUN2RCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxVQUFVLEdBQUcsY0FBYyxDQUFDO0lBQ3JDLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNO1FBQ1QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUNwQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLFlBQVksQ0FBQyxTQUFpQjtRQUNqQyxPQUFPLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO0lBQ25FLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNO1FBQ1QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3RELENBQUM7SUFFRDs7O09BR0c7SUFDSSxZQUFZO1FBQ2YsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzNCLENBQUM7SUFFRDs7O09BR0c7SUFDSSxZQUFZLENBQUMsU0FBaUI7UUFDakMsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFFNUIsSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7WUFDbkMsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQ0FBbUMsU0FDbkQsMEJBQTBCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxZ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