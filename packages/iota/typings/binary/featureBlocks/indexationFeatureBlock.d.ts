import type { ReadStream, WriteStream } from "@iota/util.js";
import { IIndexationFeatureBlock } from "../../models/featureBlocks/IIndexationFeatureBlock";
/**
 * The minimum length of a indexation feature block binary representation.
 */
export declare const MIN_INDEXATION_FEATURE_BLOCK_LENGTH: number;
/**
 * Deserialize the indexation feature block from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeIndexationFeatureBlock(readStream: ReadStream): IIndexationFeatureBlock;
/**
 * Serialize the indexation feature block to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeIndexationFeatureBlock(writeStream: WriteStream, object: IIndexationFeatureBlock): void;
