import type { ReadStream, WriteStream } from "@iota/util.js";
import { IExpirationMilestoneIndexFeatureBlock } from "../../models/featureBlocks/IExpirationMilestoneIndexFeatureBlock";
/**
 * The minimum length of a expiration milestone index feature block binary representation.
 */
export declare const MIN_EXPIRATION_MILESTONE_INDEX_FEATURE_BLOCK_LENGTH: number;
/**
 * Deserialize the expiration milestone index feature block from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeExpirationMilestoneIndexFeatureBlock(readStream: ReadStream): IExpirationMilestoneIndexFeatureBlock;
/**
 * Serialize the expiration milestone index feature block to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeExpirationMilestoneIndexFeatureBlock(writeStream: WriteStream, object: IExpirationMilestoneIndexFeatureBlock): void;
