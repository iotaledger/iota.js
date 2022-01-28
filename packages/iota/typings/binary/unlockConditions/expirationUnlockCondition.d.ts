import type { ReadStream, WriteStream } from "@iota/util.js";
import { IExpirationUnlockCondition } from "../../models/unlockConditions/IExpirationUnlockCondition";
/**
 * The minimum length of an expiration unlock condition binary representation.
 */
export declare const MIN_EXPIRATION_UNLOCK_CONDITION_LENGTH: number;
/**
 * Deserialize the expiration unlock condition from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeExpirationUnlockCondition(readStream: ReadStream): IExpirationUnlockCondition;
/**
 * Serialize the expiration unlock condition to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeExpirationUnlockCondition(writeStream: WriteStream, object: IExpirationUnlockCondition): void;
