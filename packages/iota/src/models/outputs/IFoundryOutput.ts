// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { FeatureBlockTypes } from "../featureBlocks/featureBlockTypes";
import type { ITypeBase } from "../ITypeBase";
import type { TokenSchemeTypes } from "../tokenSchemes/tokenSchemeTypes";
import type { ICommonOutput } from "./ICommonOutput";

/**
 * The global type for the foundry output.
 */
export const FOUNDRY_OUTPUT_TYPE = 5;

/**
 * Foundry output.
 */
export interface IFoundryOutput extends ITypeBase<5>, ICommonOutput {
    /**
     * The amount of IOTA tokens held by the output.
     */
    amount: string;

    /**
     * The serial number of the foundry with respect to the controlling alias.
     */
    serialNumber: number;

    /**
     * Data that is always the last 12 bytes of ID of the tokens produced by this foundry.
     */
    tokenTag: string;

    /**
     * The token scheme for the foundry.
     */
    tokenScheme: TokenSchemeTypes;

    /**
     * Immutable blocks contained by the output.
     */
    immutableFeatureBlocks: FeatureBlockTypes[];
}
