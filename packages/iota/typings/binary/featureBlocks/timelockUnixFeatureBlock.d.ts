import type { ReadStream, WriteStream } from "@iota/util.js";
import { ITimelockUnixFeatureBlock } from "../../models/featureBlocks/ITimelockUnixFeatureBlock";
/**
 * The minimum length of a timelock unix feature block binary representation.
 */
export declare const MIN_TIMELOCK_UNIX_FEATURE_BLOCK_LENGTH: number;
/**
 * Deserialize the timelock unix feature block from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeTimelockUnixFeatureBlock(readStream: ReadStream): ITimelockUnixFeatureBlock;
/**
 * Serialize the timelock unix feature block to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeTimelockUnixFeatureBlock(writeStream: WriteStream, object: ITimelockUnixFeatureBlock): void;
