// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { MAX_INPUT_COUNT, MIN_INPUT_COUNT } from "../../binary/inputs/inputs";
import { MAX_OUTPUT_COUNT } from "../../binary/outputs/outputs";
import { IUTXOInput, UTXO_INPUT_TYPE } from "../../models/inputs/IUTXOInput";
import { failValidation, IValidationResult, mergeValidationResults } from "../result";

/**
 * Validate inputs.
 * @param object The object to validate.
 * @returns The validation result.
 */
export function validateInputs(object: IUTXOInput[]): IValidationResult {
    let result: IValidationResult = { isValid: true };

    if (object.length < MIN_INPUT_COUNT || object.length > MAX_INPUT_COUNT) {
        result = failValidation(result, `Inputs count must be between ${MIN_INPUT_COUNT} and ${MAX_INPUT_COUNT}.`);
    }

    for (const input of object) {
        const filteredInputs = object.filter(i => i.transactionId === input.transactionId &&
            i.transactionOutputIndex === input.transactionOutputIndex
        );

        if (filteredInputs.length !== 1) {
            result = failValidation(result, "Each pair of Transaction Id and Transaction Output Index must be unique in the list of inputs.");
        }
    }

    for (const input of object) {
        result = mergeValidationResults(result, validateInput(input));
    }

    return result;
}

/**
 * Validate input.
 * @param object The object to validate.
 * @returns The validation result.
 */
 export function validateInput(object: IUTXOInput): IValidationResult {
    let result: IValidationResult = { isValid: true };

    if (object.type !== UTXO_INPUT_TYPE) {
        result = failValidation(result, "Input type must denote a UTXO Input.");
    }

    if (object.transactionOutputIndex < 0 || object.transactionOutputIndex >= MAX_OUTPUT_COUNT) {
        result = failValidation(result, `Transaction Output Index must be between 0 and ${MAX_INPUT_COUNT}.`);
    }

    return result;
}
