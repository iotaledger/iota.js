// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import bigInt from "big-integer";
import { MAX_NATIVE_TOKEN_COUNT } from "../binary/nativeTokens";
import type { INativeToken } from "../models/INativeToken";
import { ValidationHelper } from "../utils/validationHelper";
import { IValidationResult, failValidation, mergeValidationResults } from "./result";

/**
 * Validate native tokens.
 * @param object The object to validate.
 * @returns The validation result.
 */
export function validateNativeTokens(object: INativeToken[] | undefined): IValidationResult {
    let result: IValidationResult = { isValid: true };

    if (object) {
        const tokenIds = object.map(token => {
            result = mergeValidationResults(result, validateNativeToken(token));
            return token.id;
        });

        const distinctNativeTokens = new Set(tokenIds);
        result = mergeValidationResults(result, ValidationHelper.validateDistinct(distinctNativeTokens, object.length, "Output", "unlock condition"));

        if (distinctNativeTokens.size !== tokenIds.length) {
            result = failValidation(result, "No duplicate tokens are allowed.");
        }

        if (distinctNativeTokens.size > MAX_NATIVE_TOKEN_COUNT) {
            result = failValidation(result, "Max native tokens count exceeded.");
        }

        const sortedNativeTokens = tokenIds.slice().sort((a, b) => a.localeCompare(b));
        if (tokenIds.toString() !== sortedNativeTokens.toString()) {
            result = failValidation(result, "Native Tokens must be lexicographically sorted based on Token id.");
        }
    }

    return result;
}

/**
 * Validate a native token.
 * @param object The object to validate.
 * @returns The validation result.
 */
 export function validateNativeToken(object: INativeToken): IValidationResult {
    let result: IValidationResult = { isValid: true };

    if (bigInt(object.amount).compare(bigInt.zero) !== 1) {
        result = failValidation(result, `Native token ${object.id} must have a value bigger than zero.`);
    }

    return result;
}
