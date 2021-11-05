import type { ReadStream, WriteStream } from "@iota/util.js";
import { IReferenceUnlockBlock } from "../models/unlockBlocks/IReferenceUnlockBlock";
import { ISignatureUnlockBlock } from "../models/unlockBlocks/ISignatureUnlockBlock";
import type { UnlockBlockTypes } from "../models/unlockBlocks/unlockBlockTypes";
/**
 * The minimum length of an unlock block binary representation.
 */
export declare const MIN_UNLOCK_BLOCK_LENGTH: number;
/**
 * The minimum length of a signature unlock block binary representation.
 */
export declare const MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH: number;
/**
 * The minimum length of a reference unlock block binary representation.
 */
export declare const MIN_REFERENCE_UNLOCK_BLOCK_LENGTH: number;
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
/**
 * Deserialize the signature unlock block from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeSignatureUnlockBlock(readStream: ReadStream): ISignatureUnlockBlock;
/**
 * Serialize the signature unlock block to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeSignatureUnlockBlock(writeStream: WriteStream, object: ISignatureUnlockBlock): void;
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
