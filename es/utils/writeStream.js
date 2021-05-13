"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WriteStream = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */
const bigIntHelper_1 = require("./bigIntHelper");
const converter_1 = require("./converter");
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
        return converter_1.Converter.bytesToHex(this._storage.subarray(0, this._writeIndex));
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
        if (!converter_1.Converter.isHex(val)) {
            throw new Error(`The ${name} should be in hex format`);
        }
        // Hex should be twice the length as each byte is 2 characters
        if (length * 2 !== val.length) {
            throw new Error(`${name} length ${val.length} does not match expected length ${length * 2}`);
        }
        this.expand(length);
        this._storage.set(converter_1.Converter.hexToBytes(val), this._writeIndex);
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
        this._storage[this._writeIndex++] = val & 0xFF;
    }
    /**
     * Write a UInt16 to the stream.
     * @param name The name of the data we are trying to write.
     * @param val The data to write.
     */
    writeUInt16(name, val) {
        this.expand(2);
        this._storage[this._writeIndex++] = val & 0xFF;
        this._storage[this._writeIndex++] = val >>> 8;
    }
    /**
     * Write a UInt32 to the stream.
     * @param name The name of the data we are trying to write.
     * @param val The data to write.
     */
    writeUInt32(name, val) {
        this.expand(4);
        this._storage[this._writeIndex++] = val & 0xFF;
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
        bigIntHelper_1.BigIntHelper.write8(val, this._storage, this._writeIndex);
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
            const newArr = new Uint8Array(this._storage.length + (Math.ceil(additional / WriteStream.CHUNK_SIZE) * WriteStream.CHUNK_SIZE));
            newArr.set(this._storage, 0);
            this._storage = newArr;
        }
    }
}
exports.WriteStream = WriteStream;
/**
 * Chunk size to expand the storage.
 * @internal
 */
WriteStream.CHUNK_SIZE = 4096;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGVTdHJlYW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvd3JpdGVTdHJlYW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQStCO0FBQy9CLHNDQUFzQztBQUN0QywrQkFBK0I7QUFDL0IsaURBQThDO0FBQzlDLDJDQUF3QztBQUV4Qzs7R0FFRztBQUNILE1BQWEsV0FBVztJQW1CcEI7O09BRUc7SUFDSDtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxVQUFVLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNO1FBQ1QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztJQUNoQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTTtRQUNULE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUNuRCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksVUFBVTtRQUNiLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksUUFBUTtRQUNYLE9BQU8scUJBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUFFRDs7O09BR0c7SUFDSSxhQUFhO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUM1QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksYUFBYSxDQUFDLFVBQWtCO1FBQ25DLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO1FBRTlCLElBQUksVUFB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