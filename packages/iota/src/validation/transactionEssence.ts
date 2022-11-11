// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { INodeInfoProtocol } from "../models/info/INodeInfoProtocol";
import { ITransactionEssence, TRANSACTION_ESSENCE_TYPE } from "../models/ITransactionEssence";
import { validateEssencePayload } from "./essencePayload/essencePayload";
import { validateInputs } from "./inputs/inputs";
import { validateOutputs } from "./outputs/outputs";
import { failValidation, IValidationResult, mergeValidationResults } from "./result";

/**
 * Validate a transaction essence.
 * @param transactionEssence The Transaction Essence to validate.
 * @param protocolInfo The Protocol Info.
 * @returns The validation result.
 */
export function validateTransactionEssence(transactionEssence: ITransactionEssence, protocolInfo: INodeInfoProtocol
): IValidationResult {
    const validateInputsResult = validateInputs(transactionEssence.inputs);
    const validateOutputsResult = validateOutputs(transactionEssence.outputs, protocolInfo);
    let validatePayloadResult: IValidationResult = { isValid: true };
    let validateTypeResult: IValidationResult = { isValid: true };

    if (transactionEssence.payload) {
        validatePayloadResult = validateEssencePayload(transactionEssence.payload);
    }

    if (transactionEssence.type !== TRANSACTION_ESSENCE_TYPE) {
        validateTypeResult = failValidation(validateTypeResult, `Transaction Essence Type value must be ${TRANSACTION_ESSENCE_TYPE}.`);
    }

    return mergeValidationResults(
        validateInputsResult, validateOutputsResult, validatePayloadResult, validateTypeResult
    );
}

