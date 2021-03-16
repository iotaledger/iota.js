/**
 * Keep track of the read index within a stream.
 */
export declare class ReadStream {
    /**
     * Create a new instance of ReadStream.
     * @param storage The data to access.
     * @param readStartIndex The index to start the reading from.
     */
    constructor(storage: Uint8Array, readStartIndex?: number);
    /**
     * Get the length of the storage.
     * @returns The storage length.
     */
    length(): number;
    /**
     * Does the storage have enough data remaining.
     * @param remaining The amount of space needed.
     * @returns True if it has enough data.
     */
    hasRemaining(remaining: number): boolean;
    /**
     * How much unused data is there.
     * @returns The amount of unused data.
     */
    unused(): number;
    /**
     * Get the current read index.
     * @returns The current read index.
     */
    getReadIndex(): number;
    /**
     * Set the current read index.
     * @param readIndex The current read index.
     */
    setReadIndex(readIndex: number): void;
    /**
     * Read fixed length as hex.
     * @param name The name of the data we are trying to read.
     * @param length The length of the data to read.
     * @param moveIndex Move the index pointer on.
     * @returns The hex formatted data.
     */
    readFixedHex(name: string, length: number, moveIndex?: boolean): string;
    /**
     * Read an array of byte from the stream.
     * @param name The name of the data we are trying to read.
     * @param length The length of the array to read.
     * @param moveIndex Move the index pointer on.
     * @returns The value.
     */
    readBytes(name: string, length: number, moveIndex?: boolean): Uint8Array;
    /**
     * Read a byte from the stream.
     * @param name The name of the data we are trying to read.
     * @param moveIndex Move the index pointer on.
     * @returns The value.
     */
    readByte(name: string, moveIndex?: boolean): number;
    /**
     * Read a UInt16 from the stream.
     * @param name The name of the data we are trying to read.
     * @param moveIndex Move the index pointer on.
     * @returns The value.
     */
    readUInt16(name: string, moveIndex?: boolean): number;
    /**
     * Read a UInt32 from the stream.
     * @param name The name of the data we are trying to read.
     * @param moveIndex Move the index pointer on.
     * @returns The value.
     */
    readUInt32(name: string, moveIndex?: boolean): number;
    /**
     * Read a UInt64 from the stream.
     * @param name The name of the data we are trying to read.
     * @param moveIndex Move the index pointer on.
     * @returns The value.
     */
    readUInt64(name: string, moveIndex?: boolean): bigint;
    /**
     * Read a boolean from the stream.
     * @param name The name of the data we are trying to read.
     * @param moveIndex Move the index pointer on.
     * @returns The value.
     */
    readBoolean(name: string, moveIndex?: boolean): boolean;
}
