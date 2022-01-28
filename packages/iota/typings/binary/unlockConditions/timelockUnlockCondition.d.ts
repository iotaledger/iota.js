import type { ReadStream, WriteStream } from "@iota/util.js";
import { ITimelockUnlockCondition } from "../../models/unlockConditions/ITimelockUnlockCondition";
/**
 * The minimum length of an timelock unlock condition binary representation.
 */
export declare const MIN_TIMELOCK_UNLOCK_CONDITION_LENGTH: number;
/**
 * Deserialize the timelock unlock condition from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeTimelockUnlockCondition(readStream: ReadStream): ITimelockUnlockCondition;
/**
 * Serialize the timelock unlock condition to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeTimelockUnlockCondition(writeStream: WriteStream, object: ITimelockUnlockCondition): void;
