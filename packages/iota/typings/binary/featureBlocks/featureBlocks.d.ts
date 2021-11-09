import type { ReadStream, WriteStream } from "@iota/util.js";
import type { FeatureBlockTypes } from "../../models/featureBlocks/featureBlockTypes";
import type { ITypeBase } from "../../models/ITypeBase";
/**
 * The minimum length of a feature blocks tokens list.
 */
export declare const MIN_FEATURE_BLOCKS_LENGTH: number;
/**
 * The minimum length of a feature block binary representation.
 */
export declare const MIN_FEATURE_BLOCK_LENGTH: number;
/**
 * Deserialize the feature blocks from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeFeatureBlocks(readStream: ReadStream): FeatureBlockTypes[];
/**
 * Serialize the feature blocks to binary.
 * @param writeStream The stream to write the data to.
 * @param objects The objects to serialize.
 */
export declare function serializeFeatureBlocks(writeStream: WriteStream, objects: FeatureBlockTypes[]): void;
/**
 * Deserialize the feature block from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeFeatureBlock(readStream: ReadStream): FeatureBlockTypes;
/**
 * Serialize the feature block to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeFeatureBlock(writeStream: WriteStream, object: ITypeBase<number>): void;
