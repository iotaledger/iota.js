import type { ReadStream, WriteStream } from "@iota/util.js";
import { ISenderFeatureBlock } from "../../models/featureBlocks/ISenderFeatureBlock";
/**
 * The minimum length of a sender feature block binary representation.
 */
export declare const MIN_SENDER_FEATURE_BLOCK_LENGTH: number;
/**
 * Deserialize the sender feature block from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeSenderFeatureBlock(readStream: ReadStream): ISenderFeatureBlock;
/**
 * Serialize the sender feature block to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeSenderFeatureBlock(writeStream: WriteStream, object: ISenderFeatureBlock): void;
