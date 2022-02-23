import type { ReadStream, WriteStream } from "@iota/util.js";
import { IStorageDepositReturnUnlockCondition } from "../../models/unlockConditions/IStorageDepositReturnUnlockCondition";
/**
 * The minimum length of an storage deposit return unlock condition binary representation.
 */
export declare const MIN_STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_LENGTH: number;
/**
 * Deserialize the storage deposit return unlock condition from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeStorageDepositReturnUnlockCondition(readStream: ReadStream): IStorageDepositReturnUnlockCondition;
/**
 * Serialize the storage deposit return unlock condition to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeStorageDepositReturnUnlockCondition(writeStream: WriteStream, object: IStorageDepositReturnUnlockCondition): void;
