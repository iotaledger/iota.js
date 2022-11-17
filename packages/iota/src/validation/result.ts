// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0

/**
 * The validation result object.
 */
export interface IValidationResult {
    /**
     * Is the subject valid.
     */
    isValid: boolean;
    /**
     * The validation failure messages, in case on invalid subject.
     */
    error?: string;
}

/**
 * Fail validation with error message.
 * @param withError The error message.
 * @throws Error with message.
 */
export function failValidation(withError: string) {
    throw new Error(withError);
}
