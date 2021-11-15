// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { ReadStream, WriteStream } from "@iota/util.js";
import { BLS_ADDRESS_TYPE, IBlsAddress } from "../../models/addresses/IBlsAddress";
import { SMALL_TYPE_LENGTH } from "../commonDataTypes";

/**
 * The length of a BLS address.
 */
export const BLS_ADDRESS_LENGTH: number = 32;

/**
 * The minimum length of an bls address binary representation.
 */
export const MIN_BLS_ADDRESS_LENGTH: number = SMALL_TYPE_LENGTH + BLS_ADDRESS_LENGTH;

/**
 * Deserialize the bls address from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeBlsAddress(readStream: ReadStream): IBlsAddress {
    if (!readStream.hasRemaining(MIN_BLS_ADDRESS_LENGTH)) {
        throw new Error(
            `BLS address data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_BLS_ADDRESS_LENGTH}`
        );
    }

    const type = readStream.readUInt8("blsAddress.type");
    if (type !== BLS_ADDRESS_TYPE) {
        throw new Error(`Type mismatch in blsAddress ${type}`);
    }

    const address = readStream.readFixedHex("blsAddress.address", BLS_ADDRESS_LENGTH);

    return {
        type: BLS_ADDRESS_TYPE,
        address
    };
}

/**
 * Serialize the bls address to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeBlsAddress(writeStream: WriteStream, object: IBlsAddress): void {
    writeStream.writeUInt8("blsAddress.type", object.type);
    writeStream.writeFixedHex("blsAddress.address", BLS_ADDRESS_LENGTH, object.address);
}
