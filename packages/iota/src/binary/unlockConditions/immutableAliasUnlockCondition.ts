// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { ReadStream, WriteStream } from "@iota/util.js";
import { IImmutableAliasUnlockCondition, IMMUTABLE_ALIAS_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IImmutableAliasUnlockCondition";
import { deserializeAddress, MIN_ADDRESS_LENGTH, serializeAddress } from "../addresses/addresses";
import { SMALL_TYPE_LENGTH } from "../commonDataTypes";

/**
 * The minimum length of an immutable alias unlock condition binary representation.
 */
export const MIN_IMMUTABLE_ALIAS_UNLOCK_CONDITION_LENGTH: number = SMALL_TYPE_LENGTH + MIN_ADDRESS_LENGTH;

/**
 * Deserialize the immutable alias unlock condition from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeImmutableAliasUnlockCondition(readStream: ReadStream): IImmutableAliasUnlockCondition {
    if (!readStream.hasRemaining(MIN_IMMUTABLE_ALIAS_UNLOCK_CONDITION_LENGTH)) {
        throw new Error(
            `Immutable Alias unlock condition data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_IMMUTABLE_ALIAS_UNLOCK_CONDITION_LENGTH}`
        );
    }

    const type = readStream.readUInt8("immutableAliasUnlockCondition.type");
    if (type !== IMMUTABLE_ALIAS_UNLOCK_CONDITION_TYPE) {
        throw new Error(`Type mismatch in immutableAliasUnlockCondition ${type}`);
    }

    const address = deserializeAddress(readStream);

    return {
        type: IMMUTABLE_ALIAS_UNLOCK_CONDITION_TYPE,
        address
    };
}

/**
 * Serialize the immutable alias unlock condition to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeImmutableAliasUnlockCondition(
    writeStream: WriteStream, object: IImmutableAliasUnlockCondition): void {
    writeStream.writeUInt8("immutableAliasUnlockCondition.type", object.type);
    serializeAddress(writeStream, object.address);
}
