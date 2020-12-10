"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadStream = void 0;
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
            throw new Error(name + " length " + 1 + " exceeds the remaining data " + this.unused());
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
            throw new Error(name + " length " + 2 + " exceeds the remaining data " + this.unused());
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
            throw new Error(name + " length " + 4 + " exceeds the remaining data " + this.unused());
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
            throw new Error(name + " length " + 8 + " exceeds the remaining data " + this.unused());
        }
        var val = bigIntHelper_1.BigIntHelper.read8(this._storage, this._readIndex);
        if (moveIndex) {
            this._readIndex += 8;
        }
        return val;
    };
    /**
     * Read a string from the stream.
     * @param name The name of the data we are trying to read.
     * @param moveIndex Move the index pointer on.
     * @returns The string.
     */
    ReadStream.prototype.readString = function (name, moveIndex) {
        if (moveIndex === void 0) { moveIndex = true; }
        var stringLength = this.readUInt16(name);
        if (!this.hasRemaining(stringLength)) {
            throw new Error(name + " length " + stringLength + " exceeds the remaining data " + this.unused());
        }
        var val = converter_1.Converter.bytesToAscii(this._storage, this._readIndex, stringLength);
        if (moveIndex) {
            this._readIndex += stringLength;
        }
        return val;
    };
    return ReadStream;
}());
exports.ReadStream = ReadStream;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZFN0cmVhbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9yZWFkU3RyZWFtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtCQUErQjtBQUMvQiwrQ0FBOEM7QUFDOUMseUNBQXdDO0FBRXhDOztHQUVHO0FBQ0g7SUFhSTs7OztPQUlHO0lBQ0gsb0JBQVksT0FBbUIsRUFBRSxjQUEwQjtRQUExQiwrQkFBQSxFQUFBLGtCQUEwQjtRQUN2RCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxVQUFVLEdBQUcsY0FBYyxDQUFDO0lBQ3JDLENBQUM7SUFFRDs7O09BR0c7SUFDSSwyQkFBTSxHQUFiO1FBQ0ksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUNwQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLGlDQUFZLEdBQW5CLFVBQW9CLFNBQWlCO1FBQ2pDLE9BQU8sSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDbkUsQ0FBQztJQUVEOzs7T0FHRztJQUNJLDJCQUFNLEdBQWI7UUFDSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDdEQsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNJLGlDQUFZLEdBQW5CLFVBQW9CLElBQVksRUFBRSxNQUFjLEVBQUUsU0FBeUI7UUFBekIsMEJBQUEsRUFBQSxnQkFBeUI7UUFDdkUsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDNUIsTUFBTSxJQUFJLEtBQUssQ0FBSSxJQUFJLGdCQUFXLE1BQU0sb0NBQ0wsSUFBSSxDQUFDLE1BQU0sRUFBSSxDQUFDLENBQUM7U0FDdkQ7UUFDRCxJQUFNLEdBQUcsR0FBRyxxQkFBUyxDQUFD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