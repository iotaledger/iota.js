"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WriteStream = void 0;
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
    };
    /**
     * Write fixed length stream.
     * @param name The name of the data we are trying to write.
     * @param length The length of the data to write.
     * @param val The data to write.
     */
    WriteStream.prototype.writeFixedHex = function (name, length, val) {
        if (!converter_1.Converter.isHex(val)) {
            throw new Error("The " + val + " should be in hex format");
        }
        // Hex should be twice the length as each byte is 2 ascii characters
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
     * Write a string to the stream.
     * @param name The name of the data we are trying to write.
     * @param val The data to write.
     * @returns The string.
     */
    WriteStream.prototype.writeString = function (name, val) {
        this.writeUInt16(name, val.length);
        this.expand(val.length);
        this._storage.set(converter_1.Converter.asciiToBytes(val), this._writeIndex);
        this._writeIndex += val.length;
        return val;
    };
    /**
     * Expand the storage if there is not enough spave.
     * @param additional The amount of space needed.
     */
    WriteStream.prototype.expand = function (additional) {
        if (this._writeIndex + additional > this._storage.byteLength) {
            var newArr = new Uint8Array(this._storage.length + WriteStream.CHUNK_SIZE);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGVTdHJlYW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvd3JpdGVTdHJlYW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQStCO0FBQy9CLCtDQUE4QztBQUM5Qyx5Q0FBd0M7QUFFeEM7O0dBRUc7QUFDSDtJQW1CSTs7T0FFRztJQUNIO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLFVBQVUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUVEOzs7T0FHRztJQUNJLDRCQUFNLEdBQWI7UUFDSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO0lBQ2hDLENBQUM7SUFFRDs7O09BR0c7SUFDSSw0QkFBTSxHQUFiO1FBQ0ksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQ25ELENBQUM7SUFFRDs7O09BR0c7SUFDSSxnQ0FBVSxHQUFqQjtRQUNJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksOEJBQVEsR0FBZjtRQUNJLE9BQU8scUJBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUFFRDs7O09BR0c7SUFDSSxtQ0FBYSxHQUFwQjtRQUNJLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUM1QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksbUNBQWEsR0FBcEIsVUFBcUIsVUFBa0I7UUFDbkMsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7SUFDbEMsQ0FBQztJ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