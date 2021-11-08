import type { ReadStream, WriteStream } from "@iota/util.js";
import type { UnlockBlockTypes } from "../../models/unlockBlocks/unlockBlockTypes";
/**
 * The minimum length of an unlock block binary representation.
 */
export declare const MIN_UNLOCK_BLOCK_LENGTH: number;
/**
 * Deserialize the unlock blocks from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeUnlockBlocks(readStream: ReadStream): UnlockBlockTypes[];
/**
 * Serialize the unlock blocks to binary.
 * @param writeStream The stream to write the data to.
 * @param objects The objects to serialize.
 */
export declare function serializeUnlockBlocks(writeStream: WriteStream, objects: UnlockBlockTypes[]): void;
/**
 * Deserialize the unlock block from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeUnlockBlock(readStream: ReadStream): UnlockBlockTypes;
/**
 * Serialize the unlock block to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeUnlockBlock(writeStream: WriteStream, object: UnlockBlockTypes): void;
