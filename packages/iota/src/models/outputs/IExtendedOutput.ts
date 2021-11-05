// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { AddressTypes } from "../addresses/addressTypes";
import type { FeatureBlockTypes } from "../featureBlocks/featureBlockTypes";
import type { INativeToken } from "../INativeToken";
import type { ITypeBase } from "../ITypeBase";

/**
 * The global type for the extended output.
 */
export const EXTENDED_OUTPUT_TYPE = 3;

/**
 * Extended output.
 */
export interface IExtendedOutput extends ITypeBase<3> {
    /**
     * The address.
     */
    address: AddressTypes;

    /**
     * The amount of IOTA coins to held by the output.
     */
    amount: number;

    /**
     * The native tokens held by the output.
     */
    nativeTokens: INativeToken[];

    /**
     * Blocks contained by the output.
     */
    blocks: FeatureBlockTypes[];
}
