import type { ReadStream, WriteStream } from "@iota/util.js";
import { IAddressUnlockCondition } from "../../models/unlockConditions/IAddressUnlockCondition";
/**
 * The minimum length of an address unlock condition binary representation.
 */
export declare const MIN_ADDRESS_UNLOCK_CONDITION_LENGTH: number;
/**
 * Deserialize the address unlock condition from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeAddressUnlockCondition(readStream: ReadStream): IAddressUnlockCondition;
/**
 * Serialize the address unlock condition to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeAddressUnlockCondition(writeStream: WriteStream, object: IAddressUnlockCondition): void;
