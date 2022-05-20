// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { ReadStream, WriteStream } from "@iota/util.js";
import { IAliasUnlock, ALIAS_UNLOCK_TYPE } from "../../models/unlocks/IAliasUnlock";
import { SMALL_TYPE_LENGTH, UINT16_SIZE } from "../commonDataTypes";

/**
 * The minimum length of a alias unlock binary representation.
 */
export const MIN_ALIAS_UNLOCK_LENGTH: number = SMALL_TYPE_LENGTH + UINT16_SIZE;

/**
 * Deserialize the alias unlock from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeAliasUnlock(readStream: ReadStream): IAliasUnlock {
    if (!readStream.hasRemaining(MIN_ALIAS_UNLOCK_LENGTH)) {
        throw new Error(
            `Alias Unlock data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_ALIAS_UNLOCK_LENGTH}`
        );
    }

    const type = readStream.readUInt8("aliasUnlock.type");
    if (type !== ALIAS_UNLOCK_TYPE) {
        throw new Error(`Type mismatch in aliasUnlock ${type}`);
    }

    const reference = readStream.readUInt16("aliasUnlock.reference");

    return {
        type: ALIAS_UNLOCK_TYPE,
        reference
    };
}

/**
 * Serialize the alias unlock to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeAliasUnlock(writeStream: WriteStream, object: IAliasUnlock): void {
    writeStream.writeUInt8("aliasUnlock.type", object.type);
    writeStream.writeUInt16("aliasUnlock.reference", object.reference);
}
