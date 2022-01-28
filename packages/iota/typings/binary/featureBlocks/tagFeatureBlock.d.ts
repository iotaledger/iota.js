import type { ReadStream, WriteStream } from "@iota/util.js";
import { ITagFeatureBlock } from "../../models/featureBlocks/ITagFeatureBlock";
/**
 * The minimum length of a tag feature block binary representation.
 */
export declare const MIN_TAG_FEATURE_BLOCK_LENGTH: number;
/**
 * Deserialize the tag feature block from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeTagFeatureBlock(readStream: ReadStream): ITagFeatureBlock;
/**
 * Serialize the tag feature block to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeTagFeatureBlock(writeStream: WriteStream, object: ITagFeatureBlock): void;
