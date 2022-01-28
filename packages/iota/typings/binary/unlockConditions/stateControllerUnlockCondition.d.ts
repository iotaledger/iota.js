import type { ReadStream, WriteStream } from "@iota/util.js";
import { IStateControllerUnlockCondition } from "../../models/unlockConditions/IStateControllerUnlockCondition";
/**
 * The minimum length of an state controller unlock condition binary representation.
 */
export declare const MIN_STATE_CONTROLLER_UNLOCK_CONDITION_LENGTH: number;
/**
 * Deserialize the state controller unlock condition from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeStateControllerUnlockCondition(readStream: ReadStream): IStateControllerUnlockCondition;
/**
 * Serialize the state controller unlock condition to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeStateControllerUnlockCondition(writeStream: WriteStream, object: IStateControllerUnlockCondition): void;
