import type { ReadStream, WriteStream } from "@iota/util.js";
import { IReturnFeatureBlock } from "../../models/featureBlocks/IReturnFeatureBlock";
/**
 * The minimum length of a return feature block binary representation.
 */
export declare const MIN_RETURN_FEATURE_BLOCK_LENGTH: number;
/**
 * Deserialize the return feature block from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeReturnFeatureBlock(readStream: ReadStream): IReturnFeatureBlock;
/**
 * Serialize the return feature block to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeReturnFeatureBlock(writeStream: WriteStream, object: IReturnFeatureBlock): void;
