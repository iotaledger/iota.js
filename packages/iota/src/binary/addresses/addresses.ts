// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { ReadStream, WriteStream } from "@iota/util.js";
import type { AddressTypes } from "../../models/addresses/addressTypes";
import { ALIAS_ADDRESS_TYPE, IAliasAddress } from "../../models/addresses/IAliasAddress";
import { BLS_ADDRESS_TYPE, IBlsAddress } from "../../models/addresses/IBlsAddress";
import { ED25519_ADDRESS_TYPE, IEd25519Address } from "../../models/addresses/IEd25519Address";
import { NFT_ADDRESS_TYPE, INftAddress } from "../../models/addresses/INftAddress";
import type { ITypeBase } from "../../models/ITypeBase";
import { deserializeAliasAddress, MIN_ALIAS_ADDRESS_LENGTH, serializeAliasAddress } from "./aliasAddress";
import { deserializeBlsAddress, MIN_BLS_ADDRESS_LENGTH, serializeBlsAddress } from "./blsAddress";
import { deserializeEd25519Address, MIN_ED25519_ADDRESS_LENGTH, serializeEd25519Address } from "./ed25519Address";
import { deserializeNftAddress, MIN_NFT_ADDRESS_LENGTH, serializeNftAddress } from "./nftAddress";

/**
 * The minimum length of an address binary representation.
 */
export const MIN_ADDRESS_LENGTH: number = Math.min(
    MIN_ED25519_ADDRESS_LENGTH,
    MIN_ALIAS_ADDRESS_LENGTH,
    MIN_BLS_ADDRESS_LENGTH,
    MIN_NFT_ADDRESS_LENGTH
);

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
    } else if (type === ALIAS_ADDRESS_TYPE) {
        address = deserializeAliasAddress(readStream);
    } else if (type === BLS_ADDRESS_TYPE) {
        address = deserializeBlsAddress(readStream);
    } else if (type === NFT_ADDRESS_TYPE) {
        address = deserializeNftAddress(readStream);
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
export function serializeAddress(writeStream: WriteStream, object: ITypeBase<number>): void {
    if (object.type === ED25519_ADDRESS_TYPE) {
        serializeEd25519Address(writeStream, object as IEd25519Address);
    } else if (object.type === ALIAS_ADDRESS_TYPE) {
        serializeAliasAddress(writeStream, object as IAliasAddress);
    } else if (object.type === BLS_ADDRESS_TYPE) {
        serializeBlsAddress(writeStream, object as IBlsAddress);
    } else if (object.type === NFT_ADDRESS_TYPE) {
        serializeNftAddress(writeStream, object as INftAddress);
    } else {
        throw new Error(`Unrecognized address type ${object.type}`);
    }
}
