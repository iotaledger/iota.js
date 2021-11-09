import type { ReadStream, WriteStream } from "@iota/util.js";
import { INftUnlockBlock } from "../../models/unlockBlocks/INftUnlockBlock";
/**
 * The minimum length of a nft unlock block binary representation.
 */
export declare const MIN_NFT_UNLOCK_BLOCK_LENGTH: number;
/**
 * Deserialize the nft unlock block from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeNftUnlockBlock(readStream: ReadStream): INftUnlockBlock;
/**
 * Serialize the nft unlock block to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeNftUnlockBlock(writeStream: WriteStream, object: INftUnlockBlock): void;
