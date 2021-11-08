import type { ReadStream, WriteStream } from "@iota/util.js";
import { ITransactionPayload } from "../../models/payloads/ITransactionPayload";
/**
 * The minimum length of a transaction payload binary representation.
 */
export declare const MIN_TRANSACTION_PAYLOAD_LENGTH: number;
/**
 * Deserialize the transaction payload from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeTransactionPayload(readStream: ReadStream): ITransactionPayload;
/**
 * Serialize the transaction payload to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeTransactionPayload(writeStream: WriteStream, object: ITransactionPayload): void;
