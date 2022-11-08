// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { HexHelper } from "@iota/util.js";
import bigInt from "big-integer";
import { ISimpleTokenScheme, SIMPLE_TOKEN_SCHEME_TYPE } from "../../models/tokenSchemes/ISimpleTokenScheme";
import { failValidation, IValidationResult } from "../result";

/**
 * Validate simple token scheme.
 * @param tokenScheme The scheme to validate.
 * @returns The validation result.
 */
export function validateSimpleTokenScheme(tokenScheme: ISimpleTokenScheme): IValidationResult {
    let result: IValidationResult = { isValid: true };

    if (tokenScheme.type !== SIMPLE_TOKEN_SCHEME_TYPE) {
        result = failValidation(result, "Token scheme type must denote a Simple token scheme.");
    }

    const minted = HexHelper.toBigInt256(tokenScheme.mintedTokens);
    const melted = HexHelper.toBigInt256(tokenScheme.meltedTokens);
    const tokenSupply = minted.minus(melted);
    if (tokenSupply.gt(HexHelper.toBigInt256(tokenScheme.maximumSupply))) {
        result = failValidation(result, "The difference of Minted Tokens and Melted Tokens must not be greater than Maximum Supply.");
    }

    if (HexHelper.toBigInt256(tokenScheme.meltedTokens).gt(HexHelper.toBigInt256(tokenScheme.mintedTokens))) {
        result = failValidation(result, "Melted Tokens must not be greater than Minted Tokens.");
    }

    if (HexHelper.toBigInt256(tokenScheme.maximumSupply).leq(bigInt.zero)) {
        result = failValidation(result, "Token Maximum Supply must be larger than zero.");
    }

    return result;
}
