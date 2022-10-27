// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { IUTXOInput } from "../../models/inputs/IUTXOInput";
import type { IValidationResult } from "../result";

/**
 * Validate inputs.
 * @param object The object to validate.
 * @returns The validation result.
 */
export function validateInputs(object: IUTXOInput[]): IValidationResult {
    // Unimplemented
    return { isValid: true };
}

