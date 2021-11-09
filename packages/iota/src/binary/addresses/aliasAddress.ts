// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { ReadStream, WriteStream } from "@iota/util.js";
import { ALIAS_ADDRESS_TYPE, IAliasAddress } from "../../models/addresses/IAliasAddress";
import { SMALL_TYPE_LENGTH } from "../commonDataTypes";

/**
 * The length of an alias address.
 */
export const ALIAS_ADDRESS_LENGTH: number = 20;

/**
 * The minimum length of an alias address binary representation.
 */
export const MIN_ALIAS_ADDRESS_LENGTH: number = SMALL_TYPE_LENGTH + ALIAS_ADDRESS_LENGTH;

/**
 * Deserialize the alias address from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeAliasAddress(readStream: ReadStream): IAliasAddress {
    if (!readStream.hasRemaining(MIN_ALIAS_ADDRESS_LENGTH)) {
        throw new Error(
            `Alias address data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_ALIAS_ADDRESS_LENGTH}`
        );
    }

    const type = readStream.readByte("aliasAddress.type");
    if (type !== ALIAS_ADDRESS_TYPE) {
        throw new Error(`Type mismatch in aliasAddress ${type}`);
    }

    const address = readStream.readFixedHex("aliasAddress.address", ALIAS_ADDRESS_LENGTH);

    return {
        type: ALIAS_ADDRESS_TYPE,
        address
    };
}

/**
 * Serialize the alias address to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeAliasAddress(writeStream: WriteStream, object: IAliasAddress): void {
    writeStream.writeByte("aliasAddress.type", object.type);
    writeStream.writeFixedHex("aliasAddress.address", ALIAS_ADDRESS_LENGTH, object.address);
}
