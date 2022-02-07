import type { ReadStream, WriteStream } from "@iota/util.js";
import { IImmutableAliasUnlockCondition } from "../../models/unlockConditions/IImmutableAliasUnlockCondition";
/**
 * The minimum length of an immutable alias unlock condition binary representation.
 */
export declare const MIN_IMMUTABLE_ALIAS_UNLOCK_CONDITION_LENGTH: number;
/**
 * Deserialize the immutable alias unlock condition from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export declare function deserializeImmutableAliasUnlockCondition(readStream: ReadStream): IImmutableAliasUnlockCondition;
/**
 * Serialize the immutable alias unlock condition to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export declare function serializeImmutableAliasUnlockCondition(writeStream: WriteStream, object: IImmutableAliasUnlockCondition): void;
