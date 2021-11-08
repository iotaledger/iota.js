import type { ReadStream, WriteStream } from "@iota/util.js";
import { IMilestonePayload } from "../../models/payloads/IMilestonePayload";
/**
 * The minimum length of a milestone payload binary representation.
 */
export declare const MIN_MILESTONE_PAYLOAD_LENGTH: number;
/**
 * Deserialize the milestone payload from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeMilestonePayload(readStream: ReadStream): IMilestonePayload;
/**
 * Serialize the milestone payload to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeMilestonePayload(writeStream: WriteStream, object: IMilestonePayload): void;
