import type { ReadStream, WriteStream } from "@iota/util.js";
import { IGovernorUnlockCondition } from "../../models/unlockConditions/IGovernorUnlockCondition";
/**
 * The minimum length of an governor unlock condition binary representation.
 */
export declare const MIN_GOVERNOR_UNLOCK_CONDITION_LENGTH: number;
/**
 * Deserialize the governor unlock condition from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeGovernorUnlockCondition(readStream: ReadStream): IGovernorUnlockCondition;
/**
 * Serialize the governor unlock condition to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeGovernorUnlockCondition(writeStream: WriteStream, object: IGovernorUnlockCondition): void;
