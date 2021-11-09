import type { ReadStream, WriteStream } from "@iota/util.js";
import { IExpirationUnixFeatureBlock } from "../../models/featureBlocks/IExpirationUnixFeatureBlock";
/**
 * The minimum length of a expiration unix feature block binary representation.
 */
export declare const MIN_EXPIRATION_UNIX_FEATURE_BLOCK_LENGTH: number;
/**
 * Deserialize the expiration unix feature block from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeExpirationUnixFeatureBlock(readStream: ReadStream): IExpirationUnixFeatureBlock;
/**
 * Serialize the expiration unix feature block to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeExpirationUnixFeatureBlock(writeStream: WriteStream, object: IExpirationUnixFeatureBlock): void;
