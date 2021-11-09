import type { ReadStream, WriteStream } from "@iota/util.js";
import { IMetadataFeatureBlock } from "../../models/featureBlocks/IMetadataFeatureBlock";
/**
 * The minimum length of a metadata feature block binary representation.
 */
export declare const MIN_METADATA_FEATURE_BLOCK_LENGTH: number;
/**
 * Deserialize the metadata feature block from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeMetadataFeatureBlock(readStream: ReadStream): IMetadataFeatureBlock;
/**
 * Serialize the metadata feature block to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeMetadataFeatureBlock(writeStream: WriteStream, object: IMetadataFeatureBlock): void;
