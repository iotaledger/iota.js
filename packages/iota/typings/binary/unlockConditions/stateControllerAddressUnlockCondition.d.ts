import type { ReadStream, WriteStream } from "@iota/util.js";
import { IStateControllerAddressUnlockCondition } from "../../models/unlockConditions/IStateControllerAddressUnlockCondition";
/**
 * The minimum length of an state controller address unlock condition binary representation.
 */
export declare const MIN_STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_LENGTH: number;
/**
 * Deserialize the state controller address unlock condition from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeStateControllerAddressUnlockCondition(readStream: ReadStream): IStateControllerAddressUnlockCondition;
/**
 * Serialize the state controller address unlock condition to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeStateControllerAddressUnlockCondition(writeStream: WriteStream, object: IStateControllerAddressUnlockCondition): void;
