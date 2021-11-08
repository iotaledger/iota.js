import type { ReadStream, WriteStream } from "@iota/util.js";
import { IIndexationPayload } from "../../models/payloads/IIndexationPayload";
/**
 * The minimum length of an indexation payload binary representation.
 */
export declare const MIN_INDEXATION_PAYLOAD_LENGTH: number;
/**
 * The minimum length of a indexation key.
 */
export declare const MIN_INDEXATION_KEY_LENGTH: number;
/**
 * The maximum length of a indexation key.
 */
export declare const MAX_INDEXATION_KEY_LENGTH: number;
/**
 * Deserialize the indexation payload from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeIndexationPayload(readStream: ReadStream): IIndexationPayload;
/**
 * Serialize the indexation payload to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeIndexationPayload(writeStream: WriteStream, object: IIndexationPayload): void;
