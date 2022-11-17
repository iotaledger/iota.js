// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { MAX_INPUT_COUNT } from "../../binary/inputs/inputs";
import { ED25519_SIGNATURE_TYPE, IEd25519Signature } from "../../models/signatures/IEd25519Signature";
import { IAliasUnlock, ALIAS_UNLOCK_TYPE } from "../../models/unlocks/IAliasUnlock";
import { INftUnlock, NFT_UNLOCK_TYPE } from "../../models/unlocks/INftUnlock";
import { IReferenceUnlock, REFERENCE_UNLOCK_TYPE } from "../../models/unlocks/IReferenceUnlock";
import { ISignatureUnlock, SIGNATURE_UNLOCK_TYPE } from "../../models/unlocks/ISignatureUnlock";
import type { UnlockTypes } from "../../models/unlocks/unlockTypes";
import { failValidation } from "../result";

/**
 * Validate unlocks.
 * @param unlocks The unlocks to validate.
 * @throws Error if the validation fails.
 */
export function validateUnlocks(unlocks: UnlockTypes[]) {
    const seenSignatures: IEd25519Signature[] = [];

    for (let index = 0; index < unlocks.length; index++) {
        const unlock = unlocks[index];

        switch (unlock.type) {
            case SIGNATURE_UNLOCK_TYPE:
                if (
                    seenSignatures.some(sig =>
                        sig.type === unlock.signature.type &&
                        sig.publicKey === unlock.signature.publicKey &&
                        sig.signature === unlock.signature.signature
                    )
                ) {
                    failValidation(`The Signature Unlock at index ${index} must be unique.`);
                }

                seenSignatures.push(unlock.signature);

                validateSignatureUnlock(unlock);
                break;
            case REFERENCE_UNLOCK_TYPE:
            case ALIAS_UNLOCK_TYPE:
            case NFT_UNLOCK_TYPE:
                validateReferenceUnlock(unlock, index, unlocks[unlock.reference]);
                break;
            default:
                failValidation("Unlock type must match one of these types: Signature, Reference, Alias and NFT.");
        }
    }
}

/**
 * Validate signature unlock.
 * @param sigUnlock The unlock to validate.
 * @throws Error if the validation fails.
 */
function validateSignatureUnlock(sigUnlock: ISignatureUnlock) {
    if (sigUnlock.signature.type !== ED25519_SIGNATURE_TYPE) {
        throw new Error("Signature must contain an Ed25519 Signature.");
    }
}

/**
 * Validate reference, alias or nft unlock.
 * @param unlock The unlock to validate.
 * @param index The index of the refUnlock in unlocks array.
 * @param referencedUnlock The referenced unlock.
 * @throws Error if the validation fails.
 */
function validateReferenceUnlock(
    unlock: IReferenceUnlock | IAliasUnlock | INftUnlock,
    index: number,
    referencedUnlock?: UnlockTypes
) {
    if (unlock.reference >= index) {
        failValidation(`The Reference Unlock at index ${index} must have Reference < ${index}`);
    }

    if (referencedUnlock === undefined || referencedUnlock.type !== SIGNATURE_UNLOCK_TYPE) {
        failValidation(`The Unlock at index ${index} must Reference a Signature Unlock.`);
    }

    if (unlock.reference < 0 || unlock.reference >= MAX_INPUT_COUNT) {
        failValidation(`Reference Unlock Index must be between 0 and ${MAX_INPUT_COUNT}.`);
    }
}

