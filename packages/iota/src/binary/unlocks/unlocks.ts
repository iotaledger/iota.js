// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { ReadStream, WriteStream } from "@iota/util.js";
import type { ITypeBase } from "../../models/ITypeBase";
import { ALIAS_UNLOCK_TYPE } from "../../models/unlocks/IAliasUnlock";
import { NFT_UNLOCK_TYPE } from "../../models/unlocks/INftUnlock";
import { REFERENCE_UNLOCK_TYPE } from "../../models/unlocks/IReferenceUnlock";
import { SIGNATURE_UNLOCK_TYPE } from "../../models/unlocks/ISignatureUnlock";
import type { UnlockTypes } from "../../models/unlocks/unlockTypes";
import {
    deserializeAliasUnlock,
    MIN_ALIAS_UNLOCK_LENGTH,
    serializeAliasUnlock
} from "./aliasUnlock";
import {
    deserializeNftUnlock,
    MIN_NFT_UNLOCK_LENGTH,
    serializeNftUnlock
} from "./nftUnlock";
import {
    deserializeReferenceUnlock,
    MIN_REFERENCE_UNLOCK_LENGTH,
    serializeReferenceUnlock
} from "./referenceUnlock";
import {
    deserializeSignatureUnlock,
    MIN_SIGNATURE_UNLOCK_LENGTH,
    serializeSignatureUnlock
} from "./signatureUnlock";

/**
 * The minimum length of an unlock binary representation.
 */
export const MIN_UNLOCK_LENGTH: number = Math.min(
    MIN_SIGNATURE_UNLOCK_LENGTH,
    MIN_REFERENCE_UNLOCK_LENGTH,
    MIN_ALIAS_UNLOCK_LENGTH,
    MIN_NFT_UNLOCK_LENGTH
);

/**
 * Deserialize the unlocks from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeUnlocks(readStream: ReadStream): UnlockTypes[] {
    const numUnlocks = readStream.readUInt16("transactionEssence.numUnlocks");
    const unlocks: UnlockTypes[] = [];
    for (let i = 0; i < numUnlocks; i++) {
        unlocks.push(deserializeUnlock(readStream));
    }
    return unlocks;
}

/**
 * Serialize the unlocks to binary.
 * @param writeStream The stream to write the data to.
 * @param objects The objects to serialize.
 */
export function serializeUnlocks(writeStream: WriteStream, objects: UnlockTypes[]): void {
    writeStream.writeUInt16("transactionEssence.numUnlocks", objects.length);

    for (let i = 0; i < objects.length; i++) {
        serializeUnlock(writeStream, objects[i]);
    }
}

/**
 * Deserialize the unlock from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeUnlock(readStream: ReadStream): UnlockTypes {
    if (!readStream.hasRemaining(MIN_UNLOCK_LENGTH)) {
        throw new Error(
            `Unlock data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_UNLOCK_LENGTH}`
        );
    }

    const type = readStream.readUInt8("unlock.type", false);
    let unlock;

    if (type === SIGNATURE_UNLOCK_TYPE) {
        unlock = deserializeSignatureUnlock(readStream);
    } else if (type === REFERENCE_UNLOCK_TYPE) {
        unlock = deserializeReferenceUnlock(readStream);
    } else if (type === ALIAS_UNLOCK_TYPE) {
        unlock = deserializeAliasUnlock(readStream);
    } else if (type === NFT_UNLOCK_TYPE) {
        unlock = deserializeNftUnlock(readStream);
    } else {
        throw new Error(`Unrecognized unlock type ${type}`);
    }

    return unlock;
}

/**
 * Serialize the unlock to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeUnlock(writeStream: WriteStream, object: UnlockTypes): void {
    if (object.type === SIGNATURE_UNLOCK_TYPE) {
        serializeSignatureUnlock(writeStream, object);
    } else if (object.type === REFERENCE_UNLOCK_TYPE) {
        serializeReferenceUnlock(writeStream, object);
    } else if (object.type === ALIAS_UNLOCK_TYPE) {
        serializeAliasUnlock(writeStream, object);
    } else if (object.type === NFT_UNLOCK_TYPE) {
        serializeNftUnlock(writeStream, object);
    } else {
        throw new Error(`Unrecognized unlock type ${(object as ITypeBase<number>).type}`);
    }
}
