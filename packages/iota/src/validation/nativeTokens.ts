// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { HexHelper } from "@iota/util.js";
import bigInt from "big-integer";
import { MAX_NATIVE_TOKEN_COUNT } from "../binary/nativeTokens";
import type { INativeToken } from "../models/INativeToken";
import { failValidation } from "./result";
import { validateDistinct } from "./validationUtils";

/**
 * Validate native tokens.
 * @param nativeTokens The Native Tokens to validate.
 * @throws Error if the validation fails.
 */
export function validateNativeTokens(nativeTokens?: INativeToken[]) {
    if (nativeTokens) {
        const tokenIds = nativeTokens.map(token => token.id);

        validateDistinct(tokenIds, "Native tokens", "token");

        if (nativeTokens.length > MAX_NATIVE_TOKEN_COUNT) {
            failValidation(`Native tokens count must not be greater than max native token count (${MAX_NATIVE_TOKEN_COUNT}).`);
        }

        const sortedNativeTokens = tokenIds.slice().sort((a, b) => a.localeCompare(b));
        if (tokenIds.toString() !== sortedNativeTokens.toString()) {
            failValidation("Native Tokens must be lexicographically sorted based on Token id.");
        }

        for (const token of nativeTokens) {
            validateNativeToken(token);
        }
    }
}

/**
 * Validate a native token.
 * @param nativeToken The Native Token to validate.
 * @throws Error if the validation fails.
 */
 export function validateNativeToken(nativeToken: INativeToken) {
    if (bigInt(HexHelper.toBigInt256(nativeToken.amount)).leq(bigInt.zero)) {
        failValidation(`Native token ${nativeToken.id} must have a value greater than zero.`);
    }
}

