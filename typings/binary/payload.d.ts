import { IIndexationPayload } from "../models/IIndexationPayload";
import { IMilestonePayload } from "../models/IMilestonePayload";
import { ITransactionPayload } from "../models/ITransactionPayload";
import { ReadStream } from "../utils/readStream";
import { WriteStream } from "../utils/writeStream";
export declare const MIN_PAYLOAD_LENGTH: number;
export declare const MIN_MILESTONE_PAYLOAD_LENGTH: number;
export declare const MIN_INDEXATION_PAYLOAD_LENGTH: number;
export declare const MIN_TRANSACTION_PAYLOAD_LENGTH: number;
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
export declare function deserializePayload(readStream: ReadStream): IIndexationPayload | IMilestonePayload | ITransactionPayload | undefined;
/**
 * Serialize the payload essence to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializePayload(writeStream: WriteStream, object: IIndexationPayload | IMilestonePayload | ITransactionPayload | undefined): void;
/**
 * Deserialize the transaction payload from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeTransactionPayload(readStream: ReadStream): ITransactionPayload;
/**
 * Serialize the transaction payload essence to binary.
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
 * Serialize the milestone payload essence to binary.
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
 * Serialize the indexation payload essence to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeIndexationPayload(writeStream: WriteStream, object: IIndexationPayload): void;
