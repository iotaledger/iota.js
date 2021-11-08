import type { ReadStream, WriteStream } from "@iota/util.js";
import type { PayloadTypes } from "../../models/payloads/payloadTypes";
/**
 * The minimum length of a payload binary representation.
 */
export declare const MIN_PAYLOAD_LENGTH: number;
/**
 * Deserialize the payload from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializePayload(readStream: ReadStream): PayloadTypes | undefined;
/**
 * Serialize the payload essence to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializePayload(writeStream: WriteStream, object: PayloadTypes | undefined): void;
