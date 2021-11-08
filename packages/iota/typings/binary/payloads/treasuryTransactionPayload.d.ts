import type { ReadStream, WriteStream } from "@iota/util.js";
import { ITreasuryTransactionPayload } from "../../models/payloads/ITreasuryTransactionPayload";
/**
 * The minimum length of a treasure transaction payload binary representation.
 */
export declare const MIN_TREASURY_TRANSACTION_PAYLOAD_LENGTH: number;
/**
 * Deserialize the treasury transaction payload from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeTreasuryTransactionPayload(readStream: ReadStream): ITreasuryTransactionPayload;
/**
 * Serialize the treasury transaction payload to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeTreasuryTransactionPayload(writeStream: WriteStream, object: ITreasuryTransactionPayload): void;
