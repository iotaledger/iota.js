// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { ITypeBase } from "../../models/ITypeBase";
import { MILESTONE_PAYLOAD_TYPE } from "../../models/payloads/IMilestonePayload";
import { TAGGED_DATA_PAYLOAD_TYPE } from "../../models/payloads/ITaggedDataPayload";
import { ITransactionPayload, TRANSACTION_PAYLOAD_TYPE } from "../../models/payloads/ITransactionPayload";
import { TREASURY_TRANSACTION_PAYLOAD_TYPE } from "../../models/payloads/ITreasuryTransactionPayload";
import type { PayloadTypes } from "../../models/payloads/payloadTypes";
import { IValidationResult, mergeValidationResults } from "../result";
import { validateTransactionEssence } from "../transactionEssence";
import { validateUnlocks } from "../unlocks/unlocks";

/**
 * Validate any payload entrypoint.
 * @param object The object to validate.
 * @returns The validation result.
 */
export function validatePayload(object: PayloadTypes | undefined): IValidationResult {
    let result: IValidationResult = { isValid: true };

    if (!object) {
        // Nothing to validate
    } else {
        switch (object.type) {
            case TRANSACTION_PAYLOAD_TYPE:
                result = validateTransactionPayload(object);
                break;
            case MILESTONE_PAYLOAD_TYPE:
                // Unimplemented
                break;
            case TREASURY_TRANSACTION_PAYLOAD_TYPE:
                // Unimplemented
                break;
            case TAGGED_DATA_PAYLOAD_TYPE:
                // Unimplemented
                break;
            default:
                throw new Error(`Unrecognized transaction type ${(object as ITypeBase<number>).type}`);
        }
    }

    return result;
}

/**
 * Validate a transaction payload.
 * @param object The object to validate.
 * @returns The validation result.
 */
export function validateTransactionPayload(object: ITransactionPayload): IValidationResult {
    let txEssenceResult: IValidationResult = { isValid: true };
    let unlocksResult: IValidationResult = { isValid: true };

    if (object.type === TRANSACTION_PAYLOAD_TYPE) {
        txEssenceResult = validateTransactionEssence(object.essence);
        unlocksResult = validateUnlocks(object.unlocks);
    } else {
        throw new Error(`Unrecognized transaction type ${object.type}`);
    }

    return mergeValidationResults(txEssenceResult, unlocksResult);
}

