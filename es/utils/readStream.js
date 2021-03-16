"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadStream = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */
var bigIntHelper_1 = require("./bigIntHelper");
var converter_1 = require("./converter");
/**
 * Keep track of the read index within a stream.
 */
var ReadStream = /** @class */ (function () {
    /**
     * Create a new instance of ReadStream.
     * @param storage The data to access.
     * @param readStartIndex The index to start the reading from.
     */
    function ReadStream(storage, readStartIndex) {
        if (readStartIndex === void 0) { readStartIndex = 0; }
        this._storage = new Uint8Array(storage);
        this._readIndex = readStartIndex;
    }
    /**
     * Get the length of the storage.
     * @returns The storage length.
     */
    ReadStream.prototype.length = function () {
        return this._storage.byteLength;
    };
    /**
     * Does the storage have enough data remaining.
     * @param remaining The amount of space needed.
     * @returns True if it has enough data.
     */
    ReadStream.prototype.hasRemaining = function (remaining) {
        return this._readIndex + remaining <= this._storage.byteLength;
    };
    /**
     * How much unused data is there.
     * @returns The amount of unused data.
     */
    ReadStream.prototype.unused = function () {
        return this._storage.byteLength - this._readIndex;
    };
    /**
     * Get the current read index.
     * @returns The current read index.
     */
    ReadStream.prototype.getReadIndex = function () {
        return this._readIndex;
    };
    /**
     * Set the current read index.
     * @param readIndex The current read index.
     */
    ReadStream.prototype.setReadIndex = function (readIndex) {
        this._readIndex = readIndex;
        if (readIndex >= this._storage.length) {
            throw new Error("You cannot set the readIndex to " + readIndex + " as the stream is only " + this._storage.length + " in length");
        }
    };
    /**
     * Read fixed length as hex.
     * @param name The name of the data we are trying to read.
     * @param length The length of the data to read.
     * @param moveIndex Move the index pointer on.
     * @returns The hex formatted data.
     */
    ReadStream.prototype.readFixedHex = function (name, length, moveIndex) {
        if (moveIndex === void 0) { moveIndex = true; }
        if (!this.hasRemaining(length)) {
            throw new Error(name + " length " + length + " exceeds the remaining data " + this.unused());
        }
        var hex = converter_1.Converter.bytesToHex(this._storage, this._readIndex, length);
        if (moveIndex) {
            this._readIndex += length;
        }
        return hex;
    };
    /**
     * Read an array of byte from the stream.
     * @param name The name of the data we are trying to read.
     * @param length The length of the array to read.
     * @param moveIndex Move the index pointer on.
     * @returns The value.
     */
    ReadStream.prototype.readBytes = function (name, length, moveIndex) {
        if (moveIndex === void 0) { moveIndex = true; }
        if (!this.hasRemaining(length)) {
            throw new Error(name + " length " + length + " exceeds the remaining data " + this.unused());
        }
        var val = this._storage.slice(this._readIndex, this._readIndex + length);
        if (moveIndex) {
            this._readIndex += length;
        }
        return val;
    };
    /**
     * Read a byte from the stream.
     * @param name The name of the data we are trying to read.
     * @param moveIndex Move the index pointer on.
     * @returns The value.
     */
    ReadStream.prototype.readByte = function (name, moveIndex) {
        if (moveIndex === void 0) { moveIndex = true; }
        if (!this.hasRemaining(1)) {
            throw new Error(name + " length 1 exceeds the remaining data " + this.unused());
        }
        var val = this._storage[this._readIndex];
        if (moveIndex) {
            this._readIndex += 1;
        }
        return val;
    };
    /**
     * Read a UInt16 from the stream.
     * @param name The name of the data we are trying to read.
     * @param moveIndex Move the index pointer on.
     * @returns The value.
     */
    ReadStream.prototype.readUInt16 = function (name, moveIndex) {
        if (moveIndex === void 0) { moveIndex = true; }
        if (!this.hasRemaining(2)) {
            throw new Error(name + " length 2 exceeds the remaining data " + this.unused());
        }
        var val = this._storage[this._readIndex] |
            (this._storage[this._readIndex + 1] << 8);
        if (moveIndex) {
            this._readIndex += 2;
        }
        return val;
    };
    /**
     * Read a UInt32 from the stream.
     * @param name The name of the data we are trying to read.
     * @param moveIndex Move the index pointer on.
     * @returns The value.
     */
    ReadStream.prototype.readUInt32 = function (name, moveIndex) {
        if (moveIndex === void 0) { moveIndex = true; }
        if (!this.hasRemaining(4)) {
            throw new Error(name + " length 4 exceeds the remaining data " + this.unused());
        }
        var val = (this._storage[this._readIndex]) |
            (this._storage[this._readIndex + 1] * 0x100) |
            (this._storage[this._readIndex + 2] * 0x10000) +
                (this._storage[this._readIndex + 3] * 0x1000000);
        if (moveIndex) {
            this._readIndex += 4;
        }
        return val;
    };
    /**
     * Read a UInt64 from the stream.
     * @param name The name of the data we are trying to read.
     * @param moveIndex Move the index pointer on.
     * @returns The value.
     */
    ReadStream.prototype.readUInt64 = function (name, moveIndex) {
        if (moveIndex === void 0) { moveIndex = true; }
        if (!this.hasRemaining(8)) {
            throw new Error(name + " length 8 exceeds the remaining data " + this.unused());
        }
        var val = bigIntHelper_1.BigIntHelper.read8(this._storage, this._readIndex);
        if (moveIndex) {
            this._readIndex += 8;
        }
        return val;
    };
    /**
     * Read a boolean from the stream.
     * @param name The name of the data we are trying to read.
     * @param moveIndex Move the index pointer on.
     * @returns The value.
     */
    ReadStream.prototype.readBoolean = function (name, moveIndex) {
        if (moveIndex === void 0) { moveIndex = true; }
        if (!this.hasRemaining(1)) {
            throw new Error(name + " length 1 exceeds the remaining data " + this.unused());
        }
        var val = this._storage[this._readIndex];
        if (moveIndex) {
            this._readIndex += 1;
        }
        return val !== 0;
    };
    return ReadStream;
}());
exports.ReadStream = ReadStream;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZFN0cmVhbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9yZWFkU3RyZWFtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtCQUErQjtBQUMvQixzQ0FBc0M7QUFDdEMsK0JBQStCO0FBQy9CLCtDQUE4QztBQUM5Qyx5Q0FBd0M7QUFFeEM7O0dBRUc7QUFDSDtJQWFJOzs7O09BSUc7SUFDSCxvQkFBWSxPQUFtQixFQUFFLGNBQTBCO1FBQTFCLCtCQUFBLEVBQUEsa0JBQTBCO1FBQ3ZELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxjQUFjLENBQUM7SUFDckMsQ0FBQztJQUVEOzs7T0FHRztJQUNJLDJCQUFNLEdBQWI7UUFDSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO0lBQ3BDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksaUNBQVksR0FBbkIsVUFBb0IsU0FBaUI7UUFDakMsT0FBTyxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUNuRSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksMkJBQU0sR0FBYjtRQUNJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN0RCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksaUNBQVksR0FBbkI7UUFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDM0IsQ0FBQztJQUVEOzs7T0FHRztJQUNJLGlDQUFZLEdBQW5CLFVBQW9CLFNBQWlCO1FBQ2pDLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBRTVCLElBQUksU0FBUyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO1lBQ25DLE1BQU0sSUFBSSxLQUFLLENBQUMscUNB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