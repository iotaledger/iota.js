// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { ReadStream, WriteStream } from "@iota/util.js";
import { ISenderFeature, SENDER_FEATURE_TYPE } from "../../models/features/ISenderFeature";
import { deserializeAddress, MIN_ADDRESS_LENGTH, serializeAddress } from "../addresses/addresses";
import { SMALL_TYPE_LENGTH } from "../commonDataTypes";

/**
 * The minimum length of a sender feature binary representation.
 */
export const MIN_SENDER_FEATURE_LENGTH: number = SMALL_TYPE_LENGTH + MIN_ADDRESS_LENGTH;

/**
 * Deserialize the sender feature from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeSenderFeature(readStream: ReadStream): ISenderFeature {
    if (!readStream.hasRemaining(MIN_SENDER_FEATURE_LENGTH)) {
        throw new Error(
            `Sender Feature data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_SENDER_FEATURE_LENGTH}`
        );
    }

    const type = readStream.readUInt8("senderFeature.type");
    if (type !== SENDER_FEATURE_TYPE) {
        throw new Error(`Type mismatch in senderFeature ${type}`);
    }

    const address = deserializeAddress(readStream);

    return {
        type: SENDER_FEATURE_TYPE,
        address
    };
}

/**
 * Serialize the sender feature to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeSenderFeature(writeStream: WriteStream, object: ISenderFeature): void {
    writeStream.writeUInt8("senderFeature.type", object.type);
    serializeAddress(writeStream, object.address);
}
