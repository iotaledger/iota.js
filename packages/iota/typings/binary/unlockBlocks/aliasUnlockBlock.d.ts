import type { ReadStream, WriteStream } from "@iota/util.js";
import { IAliasUnlockBlock } from "../../models/unlockBlocks/IAliasUnlockBlock";
/**
 * The minimum length of a alias unlock block binary representation.
 */
export declare const MIN_ALIAS_UNLOCK_BLOCK_LENGTH: number;
/**
 * Deserialize the alias unlock block from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeAliasUnlockBlock(readStream: ReadStream): IAliasUnlockBlock;
/**
 * Serialize the alias unlock block to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeAliasUnlockBlock(writeStream: WriteStream, object: IAliasUnlockBlock): void;
