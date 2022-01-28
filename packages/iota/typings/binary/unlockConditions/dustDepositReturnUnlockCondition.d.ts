import type { ReadStream, WriteStream } from "@iota/util.js";
import { IDustDepositReturnUnlockCondition } from "../../models/unlockConditions/IDustDepositReturnUnlockCondition";
/**
 * The minimum length of an dust deposit return unlock condition binary representation.
 */
export declare const MIN_DUST_DEPOSIT_RETURN_UNLOCK_CONDITION_LENGTH: number;
/**
 * Deserialize the dust deposit return unlock condition from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeDustDepositReturnUnlockCondition(readStream: ReadStream): IDustDepositReturnUnlockCondition;
/**
 * Serialize the dust deposit return unlock condition to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeDustDepositReturnUnlockCondition(writeStream: WriteStream, object: IDustDepositReturnUnlockCondition): void;
