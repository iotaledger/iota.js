import { BigIntHelper } from "./bigIntHelper";
import { Converter } from "./converter";
/**
 * Keep track of the write index within a stream.
 */
export class WriteStream {
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
     * Write a UInt256 to the stream.
     * @param name The name of the data we are trying to write.
     * @param val The data to write.
     */
    writeUInt256(name, val) {
        this.expand(32);
        BigIntHelper.write32(val, this._storage, this._writeIndex);
        this._writeIndex += 32;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGVTdHJlYW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvd3JpdGVTdHJlYW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0EsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFeEM7O0dBRUc7QUFDSCxNQUFNLE9BQU8sV0FBVztJQW1CcEI7O09BRUc7SUFDSDtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxVQUFVLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNO1FBQ1QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztJQUNoQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTTtRQUNULE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUNuRCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksVUFBVTtRQUNiLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksUUFBUTtRQUNYLE9BQU8sU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUVEOzs7T0FHRztJQUNJLGFBQWE7UUFDaEIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzVCLENBQUM7SUFFRDs7O09BR0c7SUFDSSxhQUFhLENBQUMsVUFBa0I7UUFDbkMsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFV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