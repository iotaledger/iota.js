// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { MAX_INPUT_COUNT } from "../../binary/inputs/inputs";
import type { ITypeBase } from "../../models/ITypeBase";
import { ED25519_SIGNATURE_TYPE, IEd25519Signature } from "../../models/signatures/IEd25519Signature";
import { IAliasUnlock, ALIAS_UNLOCK_TYPE } from "../../models/unlocks/IAliasUnlock";
import { INftUnlock, NFT_UNLOCK_TYPE } from "../../models/unlocks/INftUnlock";
import { IReferenceUnlock, REFERENCE_UNLOCK_TYPE } from "../../models/unlocks/IReferenceUnlock";
import { ISignatureUnlock, SIGNATURE_UNLOCK_TYPE } from "../../models/unlocks/ISignatureUnlock";
import type { UnlockTypes } from "../../models/unlocks/unlockTypes";
import { failValidation, IValidationResult, mergeValidationResults } from "../result";

/**
 * Validate unlocks.
 * @param unlocks The unlocks to validate.
 * @returns The validation result.
 */
export function validateUnlocks(unlocks: UnlockTypes[]): IValidationResult {
    const results: IValidationResult[] = [];
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
                    results.push({
                        isValid: false,
                        errors: [`The Signature Unlock at index ${index} must be unique.`]
                    });
                }

                seenSignatures.push(unlock.signature);

                results.push(validateSignatureUnlock(unlock));
                break;
            case REFERENCE_UNLOCK_TYPE:
            case ALIAS_UNLOCK_TYPE:
            case NFT_UNLOCK_TYPE:
                results.push(validateReferenceUnlock(unlock, index, unlocks[unlock.reference]));
                break;
            default:
                results.push({
                    isValid: false,
                    errors: ["Unlock type must match one of these types: Signature, Reference, Alias and NFT."]
                });
                throw new Error(`Unrecognized Unlock type ${(unlocks[index] as ITypeBase<number>).type}`);
        }
    }

    return mergeValidationResults(...results);
}

/**
 * Validate signature unlock.
 * @param sigUnlock The unlock to validate.
 * @returns The validation result.
 */
function validateSignatureUnlock(sigUnlock: ISignatureUnlock): IValidationResult {
    let result: IValidationResult = { isValid: true };

    if (sigUnlock.signature.type !== ED25519_SIGNATURE_TYPE) {
        result = failValidation(result, "Signature must contain an Ed25519 Signature.");
    }

    return result;
}

/**
 * Validate reference, alias or nft unlock.
 * @param unlock The unlock to validate.
 * @param index The index of the refUnlock in unlocks array.
 * @param referencedUnlock The referenced unlock.
 * @returns The validation result.
 */
function validateReferenceUnlock(
    unlock: IReferenceUnlock | IAliasUnlock | INftUnlock,
    index: number,
    referencedUnlock?: UnlockTypes
): IValidationResult {
    let result: IValidationResult = { isValid: true };

    if (unlock.reference >= index) {
        result = failValidation(result, `The Reference Unlock at index ${index} must have Reference < ${index}`);
    }

    if (referencedUnlock === undefined || referencedUnlock.type !== SIGNATURE_UNLOCK_TYPE) {
        result = failValidation(result, `The Unlock at index ${index} must Reference a Signature Unlock.`);
    }

    if (unlock.reference < 0 || unlock.reference >= MAX_INPUT_COUNT) {
        result = failValidation(result, `Reference Unlock Index must be between 0 and ${MAX_INPUT_COUNT}.`);
    }

    return result;
}

