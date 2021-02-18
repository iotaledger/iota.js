/**
 * Keep track of the write index within a stream.
 */
export declare class WriteStream {
    /**
     * Create a new instance of ReadStream.
     */
    constructor();
    /**
     * Get the length of the stream.
     * @returns The stream length.
     */
    length(): number;
    /**
     * How much unused data is there.
     * @returns The amount of unused data.
     */
    unused(): number;
    /**
     * Get the final stream as bytes.
     * @returns The final stream.
     */
    finalBytes(): Uint8Array;
    /**
     * Get the final stream as hex.
     * @returns The final stream as hex.
     */
    finalHex(): string;
    /**
     * Get the current write index.
     * @returns The current write index.
     */
    getWriteIndex(): number;
    /**
     * Set the current write index.
     * @param writeIndex The current write index.
     */
    setWriteIndex(writeIndex: number): void;
    /**
     * Write fixed length stream.
     * @param name The name of the data we are trying to write.
     * @param length The length of the data to write.
     * @param val The data to write.
     */
    writeFixedHex(name: string, length: number, val: string): void;
    /**
     * Write fixed length stream.
     * @param name The name of the data we are trying to write.
     * @param length The length of the data to write.
     * @param val The data to write.
     */
    writeBytes(name: string, length: number, val: Uint8Array): void;
    /**
     * Write a byte to the stream.
     * @param name The name of the data we are trying to write.
     * @param val The data to write.
     */
    writeByte(name: string, val: number): void;
    /**
     * Write a UInt16 to the stream.
     * @param name The name of the data we are trying to write.
     * @param val The data to write.
     */
    writeUInt16(name: string, val: number): void;
    /**
     * Write a UInt32 to the stream.
     * @param name The name of the data we are trying to write.
     * @param val The data to write.
     */
    writeUInt32(name: string, val: number): void;
    /**
     * Write a UInt64 to the stream.
     * @param name The name of the data we are trying to write.
     * @param val The data to write.
     */
    writeUInt64(name: string, val: bigint): void;
    /**
     * Write a boolean to the stream.
     * @param name The name of the data we are trying to write.
     * @param val The data to write.
     */
    writeBoolean(name: string, val: boolean): void;
    /**
     * Expand the storage if there is not enough spave.
     * @param additional The amount of space needed.
     */
    private expand;
}
