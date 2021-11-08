// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { ReadStream, WriteStream } from "@iota/util.js";
import { ISignatureUnlockBlock, SIGNATURE_UNLOCK_BLOCK_TYPE } from "../../models/unlockBlocks/ISignatureUnlockBlock";
import { SMALL_TYPE_LENGTH } from "../commonDataTypes";
import { deserializeSignature, MIN_SIGNATURE_LENGTH, serializeSignature } from "../signatures/signatures";

/**
 * The minimum length of a signature unlock block binary representation.
 */
export const MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH: number = SMALL_TYPE_LENGTH + MIN_SIGNATURE_LENGTH;

/**
 * Deserialize the signature unlock block from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeSignatureUnlockBlock(readStream: ReadStream): ISignatureUnlockBlock {
    if (!readStream.hasRemaining(MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH)) {
        throw new Error(
            `Signature Unlock Block data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH}`
        );
    }

    const type = readStream.readByte("signatureUnlockBlock.type");
    if (type !== SIGNATURE_UNLOCK_BLOCK_TYPE) {
        throw new Error(`Type mismatch in signatureUnlockBlock ${type}`);
    }

    const signature = deserializeSignature(readStream);

    return {
        type: SIGNATURE_UNLOCK_BLOCK_TYPE,
        signature
    };
}

/**
 * Serialize the signature unlock block to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeSignatureUnlockBlock(writeStream: WriteStream, object: ISignatureUnlockBlock): void {
    writeStream.writeByte("signatureUnlockBlock.type", object.type);
    serializeSignature(writeStream, object.signature);
}
