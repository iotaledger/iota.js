import { IIndexationPayload } from "../models/IIndexationPayload";
import { IMilestonePayload } from "../models/IMilestonePayload";
import { IReceiptPayload } from "../models/IReceiptPayload";
import { ITransactionPayload } from "../models/ITransactionPayload";
import { ITreasuryTransactionPayload } from "../models/ITreasuryTransactionPayload";
import type { ReadStream } from "../utils/readStream";
import type { WriteStream } from "../utils/writeStream";
/**
 * The minimum length of a payload binary representation.
 */
export declare const MIN_PAYLOAD_LENGTH: number;
/**
 * The minimum length of a milestone payload binary representation.
 */
export declare const MIN_MILESTONE_PAYLOAD_LENGTH: number;
/**
 * The minimum length of an indexation payload binary representation.
 */
export declare const MIN_INDEXATION_PAYLOAD_LENGTH: number;
/**
 * The minimum length of a transaction payload binary representation.
 */
export declare const MIN_TRANSACTION_PAYLOAD_LENGTH: number;
/**
 * The minimum length of a receipt payload binary representation.
 */
export declare const MIN_RECEIPT_PAYLOAD_LENGTH: number;
/**
 * The minimum length of a treasure transaction payload binary representation.
 */
export declare const MIN_TREASURY_TRANSACTION_PAYLOAD_LENGTH: number;
/**
 * The minimum length of a indexation key.
 */
export declare const MIN_INDEXATION_KEY_LENGTH: number;
/**
 * The maximum length of a indexation key.
 */
export declare const MAX_INDEXATION_KEY_LENGTH: number;
/**
 * Deserialize the payload from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializePayload(readStream: ReadStream): ITransactionPayload | IMilestonePayload | IIndexationPayload | ITreasuryTransactionPayload | IReceiptPayload | undefined;
/**
 * Serialize the payload essence to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializePayload(writeStream: WriteStream, object: ITransactionPayload | IMilestonePayload | IIndexationPayload | ITreasuryTransactionPayload | IReceiptPayload | undefined): void;
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
