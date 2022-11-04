// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { INodeInfoProtocol } from "../models/info/INodeInfoProtocol";
import type { ITransactionEssence } from "../models/ITransactionEssence";
import { validateInputs } from "./inputs/inputs";
import { validateOutputs } from "./outputs/outputs";
import { IValidationResult, mergeValidationResults } from "./result";

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

    return mergeValidationResults(validateInputsResult, validateOutputsResult);
}
