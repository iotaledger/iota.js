// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { HexHelper } from "@iota/util.js";
import bigInt from "big-integer";
import { ISimpleTokenScheme, SIMPLE_TOKEN_SCHEME_TYPE } from "../../models/tokenSchemes/ISimpleTokenScheme";
import { failValidation } from "../validationUtils";

/**
 * Validate simple token scheme.
 * @param tokenScheme The scheme to validate.
 * @throws Error if the validation fails.
 */
export function validateSimpleTokenScheme(tokenScheme: ISimpleTokenScheme) {
    if (tokenScheme.type !== SIMPLE_TOKEN_SCHEME_TYPE) {
        failValidation("Token scheme type must denote a Simple token scheme.");
    }

    const minted = HexHelper.toBigInt256(tokenScheme.mintedTokens);
    const melted = HexHelper.toBigInt256(tokenScheme.meltedTokens);
    const tokenSupply = minted.minus(melted);
    if (tokenSupply.gt(HexHelper.toBigInt256(tokenScheme.maximumSupply))) {
        failValidation("The difference of Minted Tokens and Melted Tokens must not be greater than Maximum Supply.");
    }

    if (HexHelper.toBigInt256(tokenScheme.meltedTokens).gt(HexHelper.toBigInt256(tokenScheme.mintedTokens))) {
        failValidation("Melted Tokens must not be greater than Minted Tokens.");
    }

    if (HexHelper.toBigInt256(tokenScheme.maximumSupply).leq(bigInt.zero)) {
        failValidation("Token Maximum Supply must be larger than zero.");
    }
}

