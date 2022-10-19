// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { ITransactionEssence } from "../models/ITransactionEssence";
import { validateInputs } from "./inputs/inputs";
import { validateOutputs } from "./outputs/outputs";
import { IValidationResult, mergeValidationResults } from "./result";

/**
 * Validate a transaction essence.
 * @param object The object to validate.
 * @returns The validation result.
 */
export function validateTransactionEssence(object: ITransactionEssence): IValidationResult {
    const validateInputsResult = validateInputs(object.inputs);
    const validateOutputsResult = validateOutputs(object.outputs);

    return mergeValidationResults(validateInputsResult, validateOutputsResult);
}

