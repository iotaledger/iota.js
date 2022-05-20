// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { ReadStream, WriteStream } from "@iota/util.js";
import { ISignatureUnlock, SIGNATURE_UNLOCK_TYPE } from "../../models/unlocks/ISignatureUnlock";
import { SMALL_TYPE_LENGTH } from "../commonDataTypes";
import { deserializeSignature, MIN_SIGNATURE_LENGTH, serializeSignature } from "../signatures/signatures";

/**
 * The minimum length of a signature unlock binary representation.
 */
export const MIN_SIGNATURE_UNLOCK_LENGTH: number = SMALL_TYPE_LENGTH + MIN_SIGNATURE_LENGTH;

/**
 * Deserialize the signature unlock from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeSignatureUnlock(readStream: ReadStream): ISignatureUnlock {
    if (!readStream.hasRemaining(MIN_SIGNATURE_UNLOCK_LENGTH)) {
        throw new Error(
            `Signature Unlock data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_SIGNATURE_UNLOCK_LENGTH}`
        );
    }

    const type = readStream.readUInt8("signatureUnlock.type");
    if (type !== SIGNATURE_UNLOCK_TYPE) {
        throw new Error(`Type mismatch in signatureUnlock ${type}`);
    }

    const signature = deserializeSignature(readStream);

    return {
        type: SIGNATURE_UNLOCK_TYPE,
        signature
    };
}

/**
 * Serialize the signature unlock to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeSignatureUnlock(writeStream: WriteStream, object: ISignatureUnlock): void {
    writeStream.writeUInt8("signatureUnlock.type", object.type);
    serializeSignature(writeStream, object.signature);
}
