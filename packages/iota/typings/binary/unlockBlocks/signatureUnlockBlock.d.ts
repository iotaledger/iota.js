import type { ReadStream, WriteStream } from "@iota/util.js";
import { ISignatureUnlockBlock } from "../../models/unlockBlocks/ISignatureUnlockBlock";
/**
 * The minimum length of a signature unlock block binary representation.
 */
export declare const MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH: number;
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
