"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WriteStream = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */
var bigIntHelper_1 = require("./bigIntHelper");
var converter_1 = require("./converter");
/**
 * Keep track of the write index within a stream.
 */
var WriteStream = /** @class */ (function () {
    /**
     * Create a new instance of ReadStream.
     */
    function WriteStream() {
        this._storage = new Uint8Array(WriteStream.CHUNK_SIZE);
        this._writeIndex = 0;
    }
    /**
     * Get the length of the stream.
     * @returns The stream length.
     */
    WriteStream.prototype.length = function () {
        return this._storage.length;
    };
    /**
     * How much unused data is there.
     * @returns The amount of unused data.
     */
    WriteStream.prototype.unused = function () {
        return this._storage.length - this._writeIndex;
    };
    /**
     * Get the final stream as bytes.
     * @returns The final stream.
     */
    WriteStream.prototype.finalBytes = function () {
        return this._storage.subarray(0, this._writeIndex);
    };
    /**
     * Get the final stream as hex.
     * @returns The final stream as hex.
     */
    WriteStream.prototype.finalHex = function () {
        return converter_1.Converter.bytesToHex(this._storage.subarray(0, this._writeIndex));
    };
    /**
     * Get the current write index.
     * @returns The current write index.
     */
    WriteStream.prototype.getWriteIndex = function () {
        return this._writeIndex;
    };
    /**
     * Set the current write index.
     * @param writeIndex The current write index.
     */
    WriteStream.prototype.setWriteIndex = function (writeIndex) {
        this._writeIndex = writeIndex;
        if (writeIndex >= this._storage.length) {
            throw new Error("You cannot set the writeIndex to " + writeIndex + " as the stream is only " + this._storage.length + " in length");
        }
    };
    /**
     * Write fixed length stream.
     * @param name The name of the data we are trying to write.
     * @param length The length of the data to write.
     * @param val The data to write.
     */
    WriteStream.prototype.writeFixedHex = function (name, length, val) {
        if (!converter_1.Converter.isHex(val)) {
            throw new Error("The " + name + " should be in hex format");
        }
        // Hex should be twice the length as each byte is 2 characters
        if (length * 2 !== val.length) {
            throw new Error(name + " length " + val.length + " does not match expected length " + length * 2);
        }
        this.expand(length);
        this._storage.set(converter_1.Converter.hexToBytes(val), this._writeIndex);
        this._writeIndex += length;
    };
    /**
     * Write fixed length stream.
     * @param name The name of the data we are trying to write.
     * @param length The length of the data to write.
     * @param val The data to write.
     */
    WriteStream.prototype.writeBytes = function (name, length, val) {
        this.expand(length);
        this._storage.set(val, this._writeIndex);
        this._writeIndex += length;
    };
    /**
     * Write a byte to the stream.
     * @param name The name of the data we are trying to write.
     * @param val The data to write.
     */
    WriteStream.prototype.writeByte = function (name, val) {
        this.expand(1);
        this._storage[this._writeIndex++] = val & 0xFF;
    };
    /**
     * Write a UInt16 to the stream.
     * @param name The name of the data we are trying to write.
     * @param val The data to write.
     */
    WriteStream.prototype.writeUInt16 = function (name, val) {
        this.expand(2);
        this._storage[this._writeIndex++] = val & 0xFF;
        this._storage[this._writeIndex++] = val >>> 8;
    };
    /**
     * Write a UInt32 to the stream.
     * @param name The name of the data we are trying to write.
     * @param val The data to write.
     */
    WriteStream.prototype.writeUInt32 = function (name, val) {
        this.expand(4);
        this._storage[this._writeIndex++] = val & 0xFF;
        this._storage[this._writeIndex++] = val >>> 8;
        this._storage[this._writeIndex++] = val >>> 16;
        this._storage[this._writeIndex++] = val >>> 24;
    };
    /**
     * Write a UInt64 to the stream.
     * @param name The name of the data we are trying to write.
     * @param val The data to write.
     */
    WriteStream.prototype.writeUInt64 = function (name, val) {
        this.expand(8);
        bigIntHelper_1.BigIntHelper.write8(val, this._storage, this._writeIndex);
        this._writeIndex += 8;
    };
    /**
     * Write a boolean to the stream.
     * @param name The name of the data we are trying to write.
     * @param val The data to write.
     */
    WriteStream.prototype.writeBoolean = function (name, val) {
        this.expand(1);
        this._storage[this._writeIndex++] = val ? 1 : 0;
    };
    /**
     * Expand the storage if there is not enough spave.
     * @param additional The amount of space needed.
     */
    WriteStream.prototype.expand = function (additional) {
        if (this._writeIndex + additional > this._storage.byteLength) {
            var newArr = new Uint8Array(this._storage.length + (Math.ceil(additional / WriteStream.CHUNK_SIZE) * WriteStream.CHUNK_SIZE));
            newArr.set(this._storage, 0);
            this._storage = newArr;
        }
    };
    /**
     * Chunk size to expand the storage.
     * @internal
     */
    WriteStream.CHUNK_SIZE = 4096;
    return WriteStream;
}());
exports.WriteStream = WriteStream;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGVTdHJlYW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvd3JpdGVTdHJlYW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQStCO0FBQy9CLHNDQUFzQztBQUN0QywrQkFBK0I7QUFDL0IsK0NBQThDO0FBQzlDLHlDQUF3QztBQUV4Qzs7R0FFRztBQUNIO0lBbUJJOztPQUVHO0lBQ0g7UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksVUFBVSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksNEJBQU0sR0FBYjtRQUNJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7SUFDaEMsQ0FBQztJQUVEOzs7T0FHRztJQUNJLDRCQUFNLEdBQWI7UUFDSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDbkQsQ0FBQztJQUVEOzs7T0FHRztJQUNJLGdDQUFVLEdBQWpCO1FBQ0ksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRDs7O09BR0c7SUFDSSw4QkFBUSxHQUFmO1FBQ0ksT0FBTyxxQkFBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUVEOzs7T0FHRztJQUNJLG1DQUFhLEdBQXBCO1FBQ0ksT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzVCLENBQUM7SUFFRDs7O09BR0c7SUFDSSxtQ0FBYSxHQUFwQixVQUFxQixVQUFrQjtRQUNuQyxJQUFJLENBQUMsV0FBVyxH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