import type { ReadStream, WriteStream } from "@iota/util.js";
import { ITaggedDataPayload } from "../../models/payloads/ITaggedDataPayload";
/**
 * The minimum length of a tagged data payload binary representation.
 */
export declare const MIN_TAGGED_DATA_PAYLOAD_LENGTH: number;
/**
 * The maximum length of a tag.
 */
export declare const MAX_TAG_LENGTH: number;
/**
 * Deserialize the tagged data payload from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeTaggedDataPayload(readStream: ReadStream): ITaggedDataPayload;
/**
 * Serialize the tagged data payload to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeTaggedDataPayload(writeStream: WriteStream, object: ITaggedDataPayload): void;
