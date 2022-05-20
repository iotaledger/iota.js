// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { ReadStream, WriteStream } from "@iota/util.js";
import { INftUnlock, NFT_UNLOCK_TYPE } from "../../models/unlocks/INftUnlock";
import { SMALL_TYPE_LENGTH, UINT16_SIZE } from "../commonDataTypes";

/**
 * The minimum length of a nft unlock binary representation.
 */
export const MIN_NFT_UNLOCK_LENGTH: number = SMALL_TYPE_LENGTH + UINT16_SIZE;

/**
 * Deserialize the nft unlock from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeNftUnlock(readStream: ReadStream): INftUnlock {
    if (!readStream.hasRemaining(MIN_NFT_UNLOCK_LENGTH)) {
        throw new Error(
            `Nft Unlock data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_NFT_UNLOCK_LENGTH}`
        );
    }

    const type = readStream.readUInt8("nftUnlock.type");
    if (type !== NFT_UNLOCK_TYPE) {
        throw new Error(`Type mismatch in nftUnlock ${type}`);
    }

    const reference = readStream.readUInt16("nftUnlock.reference");

    return {
        type: NFT_UNLOCK_TYPE,
        reference
    };
}

/**
 * Serialize the nft unlock to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeNftUnlock(writeStream: WriteStream, object: INftUnlock): void {
    writeStream.writeUInt8("nftUnlock.type", object.type);
    writeStream.writeUInt16("nftUnlock.reference", object.reference);
}
