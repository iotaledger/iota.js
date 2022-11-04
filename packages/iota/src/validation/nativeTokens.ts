// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import bigInt from "big-integer";
import { MAX_NATIVE_TOKEN_COUNT } from "../binary/nativeTokens";
import type { INativeToken } from "../models/INativeToken";
import { ValidationHelper } from "../utils/validationHelper";
import { IValidationResult, failValidation, mergeValidationResults } from "./result";

/**
 * Validate native tokens.
 * @param nativeTokens The Native Tokens to validate.
 * @returns The validation result.
 */
export function validateNativeTokens(nativeTokens: INativeToken[] | undefined): IValidationResult {
    let result: IValidationResult = { isValid: true };

    if (nativeTokens) {
        const tokenIds = nativeTokens.map(token => token.id);

        result = mergeValidationResults(result, ValidationHelper.validateDistinct(tokenIds, "Array", "native token"));

        if (nativeTokens.length > MAX_NATIVE_TOKEN_COUNT) {
            result = failValidation(result, "Max native tokens count exceeded.");
        }

        const sortedNativeTokens = tokenIds.slice().sort((a, b) => a.localeCompare(b));
        if (tokenIds.toString() !== sortedNativeTokens.toString()) {
            result = failValidation(result, "Native Tokens must be lexicographically sorted based on Token id.");
        }

        for (const token of nativeTokens) {
            result = mergeValidationResults(result, validateNativeToken(token));
        }
    }

    return result;
}

/**
 * Validate a native token.
 * @param nativeToken The Native Token to validate.
 * @returns The validation result.
 */
 export function validateNativeToken(nativeToken: INativeToken): IValidationResult {
    let result: IValidationResult = { isValid: true };

    if (bigInt(nativeToken.amount).compare(bigInt.zero) !== 1) {
        result = failValidation(result, `Native token ${nativeToken.id} must have a value bigger than zero.`);
    }

    return result;
}

