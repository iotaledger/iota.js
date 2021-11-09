import type { ReadStream, WriteStream } from "@iota/util.js";
import { ITimelockMilestoneIndexFeatureBlock } from "../../models/featureBlocks/ITimelockMilestoneIndexFeatureBlock";
/**
 * The minimum length of a timelock milestone index feature block binary representation.
 */
export declare const MIN_TIMELOCK_MILESTONE_INDEX_FEATURE_BLOCK_LENGTH: number;
/**
 * Deserialize the timelock milestone index feature block from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeTimelockMilestoneIndexFeatureBlock(readStream: ReadStream): ITimelockMilestoneIndexFeatureBlock;
/**
 * Serialize the timelock milestone index feature block to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeTimelockMilestoneIndexFeatureBlock(writeStream: WriteStream, object: ITimelockMilestoneIndexFeatureBlock): void;
