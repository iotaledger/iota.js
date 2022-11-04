// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { INodeInfoProtocol } from "../../models/info/INodeInfoProtocol";
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
 * @param payload The payload to validate.
 * @param protocolInfo The Protocol Info.
 * @returns The validation result.
 */
export function validatePayload(
    payload: PayloadTypes | undefined, protocolInfo: INodeInfoProtocol
): IValidationResult {
    let result: IValidationResult = { isValid: true };

    if (!payload) {
        // Nothing to validate
    } else {
        switch (payload.type) {
            case TRANSACTION_PAYLOAD_TYPE:
                result = validateTransactionPayload(payload, protocolInfo);
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
                throw new Error(`Unrecognized transaction type ${(payload as ITypeBase<number>).type}`);
        }
    }

    return result;
}

/**
 * Validate a transaction payload.
 * @param transactionPayload The transaction payload to validate.
 * @param protocolInfo The Protocol Info.
 * @returns The validation result.
 */
export function validateTransactionPayload(
    transactionPayload: ITransactionPayload, protocolInfo: INodeInfoProtocol
): IValidationResult {
    let txEssenceResult: IValidationResult = { isValid: true };
    let unlocksResult: IValidationResult = { isValid: true };

    if (transactionPayload.type === TRANSACTION_PAYLOAD_TYPE) {
        txEssenceResult = validateTransactionEssence(transactionPayload.essence, protocolInfo);
        unlocksResult = validateUnlocks(transactionPayload.unlocks);
    } else {
        throw new Error(`Unrecognized transaction type ${transactionPayload.type}`);
    }

    return mergeValidationResults(txEssenceResult, unlocksResult);
}

