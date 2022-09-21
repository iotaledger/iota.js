// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { HexEncodedAmount } from "../hexEncodedTypes";
import type { ITypeBase } from "../ITypeBase";

/**
 * The global type for the simple token scheme.
 */
export const SIMPLE_TOKEN_SCHEME_TYPE = 0;

/**
 * Simple token scheme.
 */
export interface ISimpleTokenScheme extends ITypeBase<0> {
    /**
     * Amount of tokens minted by this foundry.
     */
    mintedTokens: HexEncodedAmount;

    /**
     * Amount of tokens melted by this foundry.
     */
    meltedTokens: HexEncodedAmount;

    /**
     * Maximum supply of tokens controlled by this foundry.
     */
    maximumSupply: HexEncodedAmount;
}
