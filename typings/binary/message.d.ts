import type { IMessage } from "../models/IMessage";
import type { ReadStream } from "../utils/readStream";
import type { WriteStream } from "../utils/writeStream";
/**
 * The maximum length of a message.
 */
export declare const MAX_MESSAGE_LENGTH: number;
/**
 * The maximum number of parents.
 */
export declare const MAX_NUMBER_PARENTS: number;
/**
 * The minimum number of parents.
 */
export declare const MIN_NUMBER_PARENTS: number;
/**
 * Deserialize the message from binary.
 * @param readStream The message to deserialize.
 * @returns The deserialized message.
 */
export declare function deserializeMessage(readStream: ReadStream): IMessage;
/**
 * Serialize the message essence to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeMessage(writeStream: WriteStream, object: IMessage): void;
