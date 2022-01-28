import type { ReadStream, WriteStream } from "@iota/util.js";
import type { ITypeBase } from "../../models/ITypeBase";
import type { UnlockConditionTypes } from "../../models/unlockConditions/unlockConditionTypes";
/**
 * The minimum length of a unlock conditions list.
 */
export declare const MIN_UNLOCK_CONDITIONS_LENGTH: number;
/**
 * The minimum length of a unlock conditions binary representation.
 */
export declare const MIN_UNLOCK_CONDITION_LENGTH: number;
/**
 * Deserialize the unlock conditions from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeUnlockConditions(readStream: ReadStream): UnlockConditionTypes[];
/**
 * Serialize the unlock conditions to binary.
 * @param writeStream The stream to write the data to.
 * @param objects The objects to serialize.
 */
export declare function serializeUnlockConditions(writeStream: WriteStream, objects: UnlockConditionTypes[]): void;
/**
 * Deserialize the unlock condition from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeUnlockCondition(readStream: ReadStream): UnlockConditionTypes;
/**
 * Serialize the unlock condition to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeUnlockCondition(writeStream: WriteStream, object: ITypeBase<number>): void;
