// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { INativeToken } from "../models/INativeToken";
import type { IValidationResult } from "./result";

/**
 * Validate native tokens.
 * @param object The object to validate.
 * @returns The validation result.
 */
export function validateNativeTokens(object: INativeToken[] | undefined): IValidationResult {
    return { isValid: true };
}

