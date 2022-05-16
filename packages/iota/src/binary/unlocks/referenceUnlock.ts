// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { ReadStream, WriteStream } from "@iota/util.js";
import { IReferenceUnlock, REFERENCE_UNLOCK_TYPE } from "../../models/unlocks/IReferenceUnlock";
import { SMALL_TYPE_LENGTH, UINT16_SIZE } from "../commonDataTypes";

/**
 * The minimum length of a reference unlock binary representation.
 */
export const MIN_REFERENCE_UNLOCK_LENGTH: number = SMALL_TYPE_LENGTH + UINT16_SIZE;

/**
 * Deserialize the reference unlock from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeReferenceUnlock(readStream: ReadStream): IReferenceUnlock {
    if (!readStream.hasRemaining(MIN_REFERENCE_UNLOCK_LENGTH)) {
        throw new Error(
            `Reference Unlock data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_REFERENCE_UNLOCK_LENGTH}`
        );
    }

    const type = readStream.readUInt8("referenceUnlock.type");
    if (type !== REFERENCE_UNLOCK_TYPE) {
        throw new Error(`Type mismatch in referenceUnlock ${type}`);
    }

    const reference = readStream.readUInt16("referenceUnlock.reference");

    return {
        type: REFERENCE_UNLOCK_TYPE,
        reference
    };
}

/**
 * Serialize the reference unlock to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeReferenceUnlock(writeStream: WriteStream, object: IReferenceUnlock): void {
    writeStream.writeUInt8("referenceUnlock.type", object.type);
    writeStream.writeUInt16("referenceUnlock.reference", object.reference);
}
