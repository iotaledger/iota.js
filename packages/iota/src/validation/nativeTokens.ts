// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import bigInt from "big-integer";
import { MAX_NATIVE_TOKEN_COUNT } from "../binary/nativeTokens";
import type { INativeToken } from "../models/INativeToken";
import type { IValidationResult } from "./result";

/**
 * Validate native tokens.
 * @param object The object to validate.
 * @returns The validation result.
 */
export function validateNativeTokens(object: INativeToken[] | undefined): IValidationResult {
    const result: IValidationResult = { isValid: true };
    const errors: string[] = [];

    if (object) {
        const tokenIds = object.map(token => {
            if (bigInt(token.amount).compare(bigInt.zero) !== 1) {
                errors.push(`Native token ${token.id} must have a value bigger than zero.`);
            }
            return token.id;
        });

        const distinctNativeTokens = new Set(tokenIds);
        if (distinctNativeTokens.size !== tokenIds.length) {
            errors.push("No duplicate tokens are allowed.");
        }

        if (distinctNativeTokens.size > MAX_NATIVE_TOKEN_COUNT) {
            errors.push("Max native tokens count exceeded.");
        }

        const sortedNativeTokens = tokenIds.slice().sort(
            (a, b) => a.localeCompare(b));

        if (tokenIds.toString() !== sortedNativeTokens.toString()) {
            errors.push("Native Tokens must be lexicographically sorted based on Token id.");
        }
    }

    if (errors.length > 0) {
        result.isValid = false;
        result.errors = errors;
    }

    return result;
}
