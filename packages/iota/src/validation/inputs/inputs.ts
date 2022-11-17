// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { MAX_INPUT_COUNT, MIN_INPUT_COUNT } from "../../binary/inputs/inputs";
import { MAX_OUTPUT_COUNT } from "../../binary/outputs/outputs";
import { IUTXOInput, UTXO_INPUT_TYPE } from "../../models/inputs/IUTXOInput";
import { failValidation } from "../result";

/**
 * Validate inputs.
 * @param inputs The inputs to validate.
 * @throws Error if the validation fails.
 */
export function validateInputs(inputs: IUTXOInput[]) {
    if (inputs.length < MIN_INPUT_COUNT || inputs.length > MAX_INPUT_COUNT) {
        failValidation(`Inputs count must be between ${MIN_INPUT_COUNT} and ${MAX_INPUT_COUNT}.`);
    }

    for (const input of inputs) {
        const filteredInputs = inputs.filter(i => i.transactionId === input.transactionId &&
            i.transactionOutputIndex === input.transactionOutputIndex
        );

        if (filteredInputs.length !== 1) {
            failValidation("Each pair of Transaction Id and Transaction Output Index must be unique in the list of inputs.");
            break;
        }
    }

    for (const input of inputs) {
        validateInput(input);
    }
}

/**
 * Validate an input.
 * @param input The input to validate.
 * @throws Error if the validation fails.
 */
export function validateInput(input: IUTXOInput) {
    if (input.type !== UTXO_INPUT_TYPE) {
        failValidation("Input type must denote a UTXO Input.");
    }

    if (input.transactionOutputIndex < 0 || input.transactionOutputIndex >= MAX_OUTPUT_COUNT) {
        failValidation(`Transaction Output Index must be between 0 and ${MAX_INPUT_COUNT}.`);
    }
}
