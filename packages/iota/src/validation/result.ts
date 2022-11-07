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
    errors?: string[];
}

/**
 * Merges multiple validation results.
 * @param results Array of results to merge.
 * @returns The merged validation result.
 */
export function mergeValidationResults(...results: IValidationResult[]): IValidationResult {
    if (results.length === 0) {
        return { isValid: true };
    }

    return {
        isValid: results.every(res => res.isValid),
        errors: results.some(res => res.errors !== undefined) ?
            results.flatMap(res => res.errors ?? []) :
            undefined
    };
}

/**
 * Fail validation with error message.
 * @param result The validation result.
 * @param withError The error message.
 * @returns The validation result.
 */
export function failValidation(result: IValidationResult, withError: string): IValidationResult {
    result.isValid = false;

    if (result.errors) {
        result.errors.push(withError);
    } else {
        result.errors = [withError];
    }

    return result;
}

