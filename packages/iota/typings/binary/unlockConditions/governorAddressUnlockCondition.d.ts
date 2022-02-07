import type { ReadStream, WriteStream } from "@iota/util.js";
import { IGovernorAddressUnlockCondition } from "../../models/unlockConditions/IGovernorAddressUnlockCondition";
/**
 * The minimum length of an governor unlock condition binary representation.
 */
export declare const MIN_GOVERNOR_ADDRESS_UNLOCK_CONDITION_LENGTH: number;
/**
 * Deserialize the governor address unlock condition from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeGovernorAddressUnlockCondition(readStream: ReadStream): IGovernorAddressUnlockCondition;
/**
 * Serialize the governor address unlock condition to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeGovernorAddressUnlockCondition(writeStream: WriteStream, object: IGovernorAddressUnlockCondition): void;
