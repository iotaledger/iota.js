// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { ReadStream, WriteStream } from "@iota/util.js";
import type { AddressTypes } from "../../models/addresses/addressTypes";
import { ED25519_ADDRESS_TYPE } from "../../models/addresses/IEd25519Address";
import { deserializeEd25519Address, MIN_ED25519_ADDRESS_LENGTH, serializeEd25519Address } from "./ed25519Address";

/**
 * The minimum length of an address binary representation.
 */
export const MIN_ADDRESS_LENGTH: number = MIN_ED25519_ADDRESS_LENGTH;

/**
 * Deserialize the address from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeAddress(readStream: ReadStream): AddressTypes {
    if (!readStream.hasRemaining(MIN_ADDRESS_LENGTH)) {
        throw new Error(
            `Address data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_ADDRESS_LENGTH}`
        );
    }

    const type = readStream.readByte("address.type", false);
    let address;

    if (type === ED25519_ADDRESS_TYPE) {
        address = deserializeEd25519Address(readStream);
    } else {
        throw new Error(`Unrecognized address type ${type}`);
    }

    return address;
}

/**
 * Serialize the address to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeAddress(writeStream: WriteStream, object: AddressTypes): void {
    if (object.type === ED25519_ADDRESS_TYPE) {
        serializeEd25519Address(writeStream, object);
    } else {
        throw new Error(`Unrecognized address type ${object.type}`);
    }
}
