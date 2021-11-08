// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { ReadStream, WriteStream } from "@iota/util.js";
import type { ITypeBase } from "../../models/ITypeBase";
import { REFERENCE_UNLOCK_BLOCK_TYPE } from "../../models/unlockBlocks/IReferenceUnlockBlock";
import { SIGNATURE_UNLOCK_BLOCK_TYPE } from "../../models/unlockBlocks/ISignatureUnlockBlock";
import type { UnlockBlockTypes } from "../../models/unlockBlocks/unlockBlockTypes";
import { deserializeReferenceUnlockBlock, MIN_REFERENCE_UNLOCK_BLOCK_LENGTH, serializeReferenceUnlockBlock } from "./referenceUnlockBlock";
import { deserializeSignatureUnlockBlock, MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH, serializeSignatureUnlockBlock } from "./signatureUnlockBlock";

/**
 * The minimum length of an unlock block binary representation.
 */
export const MIN_UNLOCK_BLOCK_LENGTH: number =
    Math.min(
        MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH,
        MIN_REFERENCE_UNLOCK_BLOCK_LENGTH
    );

/**
 * Deserialize the unlock blocks from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeUnlockBlocks(readStream: ReadStream): UnlockBlockTypes[] {
    const numUnlockBlocks = readStream.readUInt16("transactionEssence.numUnlockBlocks");
    const unlockBlocks: UnlockBlockTypes[] = [];
    for (let i = 0; i < numUnlockBlocks; i++) {
        unlockBlocks.push(deserializeUnlockBlock(readStream));
    }
    return unlockBlocks;
}

/**
 * Serialize the unlock blocks to binary.
 * @param writeStream The stream to write the data to.
 * @param objects The objects to serialize.
 */
export function serializeUnlockBlocks(
    writeStream: WriteStream,
    objects: UnlockBlockTypes[]
): void {
    writeStream.writeUInt16("transactionEssence.numUnlockBlocks", objects.length);

    for (let i = 0; i < objects.length; i++) {
        serializeUnlockBlock(writeStream, objects[i]);
    }
}

/**
 * Deserialize the unlock block from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeUnlockBlock(readStream: ReadStream): UnlockBlockTypes {
    if (!readStream.hasRemaining(MIN_UNLOCK_BLOCK_LENGTH)) {
        throw new Error(
            `Unlock Block data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_UNLOCK_BLOCK_LENGTH}`
        );
    }

    const type = readStream.readByte("unlockBlock.type", false);
    let unlockBlock;

    if (type === SIGNATURE_UNLOCK_BLOCK_TYPE) {
        unlockBlock = deserializeSignatureUnlockBlock(readStream);
    } else if (type === REFERENCE_UNLOCK_BLOCK_TYPE) {
        unlockBlock = deserializeReferenceUnlockBlock(readStream);
    } else {
        throw new Error(`Unrecognized unlock block type ${type}`);
    }

    return unlockBlock;
}

/**
 * Serialize the unlock block to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeUnlockBlock(
    writeStream: WriteStream,
    object: UnlockBlockTypes
): void {
    if (object.type === SIGNATURE_UNLOCK_BLOCK_TYPE) {
        serializeSignatureUnlockBlock(writeStream, object);
    } else if (object.type === REFERENCE_UNLOCK_BLOCK_TYPE) {
        serializeReferenceUnlockBlock(writeStream, object);
    } else {
        throw new Error(`Unrecognized unlock block type ${(object as ITypeBase<number>).type}`);
    }
}

