// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { ReadStream, WriteStream } from "@iota/util.js";
import { ISenderFeatureBlock, SENDER_FEATURE_BLOCK_TYPE } from "../../models/featureBlocks/ISenderFeatureBlock";
import { deserializeAddress, MIN_ADDRESS_LENGTH, serializeAddress } from "../addresses/addresses";
import { SMALL_TYPE_LENGTH } from "../commonDataTypes";

/**
 * The minimum length of a sender feature block binary representation.
 */
export const MIN_SENDER_FEATURE_BLOCK_LENGTH: number = SMALL_TYPE_LENGTH + MIN_ADDRESS_LENGTH;

/**
 * Deserialize the sender feature block from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeSenderFeatureBlock(readStream: ReadStream): ISenderFeatureBlock {
    if (!readStream.hasRemaining(MIN_SENDER_FEATURE_BLOCK_LENGTH)) {
        throw new Error(
            `Sender Feature Block data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_SENDER_FEATURE_BLOCK_LENGTH}`
        );
    }

    const type = readStream.readUInt8("senderFeatureBlock.type");
    if (type !== SENDER_FEATURE_BLOCK_TYPE) {
        throw new Error(`Type mismatch in senderFeatureBlock ${type}`);
    }

    const address = deserializeAddress(readStream);

    return {
        type: SENDER_FEATURE_BLOCK_TYPE,
        address
    };
}

/**
 * Serialize the sender feature block to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeSenderFeatureBlock(writeStream: WriteStream, object: ISenderFeatureBlock): void {
    writeStream.writeUInt8("senderFeatureBlock.type", object.type);
    serializeAddress(writeStream, object.address);
}
