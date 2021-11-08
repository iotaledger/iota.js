import type { ReadStream, WriteStream } from "@iota/util.js";
import { IReferenceUnlockBlock } from "../../models/unlockBlocks/IReferenceUnlockBlock";
/**
 * The minimum length of a reference unlock block binary representation.
 */
export declare const MIN_REFERENCE_UNLOCK_BLOCK_LENGTH: number;
/**
 * Deserialize the reference unlock block from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeReferenceUnlockBlock(readStream: ReadStream): IReferenceUnlockBlock;
/**
 * Serialize the reference unlock block to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeReferenceUnlockBlock(writeStream: WriteStream, object: IReferenceUnlockBlock): void;
