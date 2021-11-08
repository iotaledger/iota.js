import type { ReadStream, WriteStream } from "@iota/util.js";
import { IReceiptPayload } from "../../models/payloads/IReceiptPayload";
/**
 * The minimum length of a receipt payload binary representation.
 */
export declare const MIN_RECEIPT_PAYLOAD_LENGTH: number;
/**
 * Deserialize the receipt payload from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeReceiptPayload(readStream: ReadStream): IReceiptPayload;
/**
 * Serialize the receipt payload to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeReceiptPayload(writeStream: WriteStream, object: IReceiptPayload): void;
