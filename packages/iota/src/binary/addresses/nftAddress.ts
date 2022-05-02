// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { ReadStream, WriteStream } from "@iota/util.js";
import { NFT_ADDRESS_TYPE, INftAddress } from "../../models/addresses/INftAddress";
import { SMALL_TYPE_LENGTH } from "../commonDataTypes";

// A better place for this id would be in outputs/nftOutput, but importing it from there
// causes other constats computed from it to have value NaN during serialization
/* eslint-disable no-warning-comments */
// TODO: Find fix for the weird typescript issue
/**
 * The length of an NFT Id.
 */
export const NFT_ID_LENGTH: number = 32;

/**
 * The minimum length of an nft address binary representation.
 */
export const MIN_NFT_ADDRESS_LENGTH: number = SMALL_TYPE_LENGTH + NFT_ID_LENGTH;

/**
 * Deserialize the nft address from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeNftAddress(readStream: ReadStream): INftAddress {
    if (!readStream.hasRemaining(MIN_NFT_ADDRESS_LENGTH)) {
        throw new Error(
            `NFT address data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_NFT_ADDRESS_LENGTH}`
        );
    }

    const type = readStream.readUInt8("nftAddress.type");
    if (type !== NFT_ADDRESS_TYPE) {
        throw new Error(`Type mismatch in nftAddress ${type}`);
    }

    const address = readStream.readFixedHex("nftAddress.nftId", NFT_ID_LENGTH);

    return {
        type: NFT_ADDRESS_TYPE,
        nftId: address
    };
}

/**
 * Serialize the nft address to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeNftAddress(writeStream: WriteStream, object: INftAddress): void {
    writeStream.writeUInt8("nftAddress.type", object.type);
    writeStream.writeFixedHex("nftAddress.nftId", NFT_ID_LENGTH, object.nftId);
}

