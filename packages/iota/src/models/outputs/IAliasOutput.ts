// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { FeatureBlockTypes } from "../featureBlocks/featureBlockTypes";
import type { ITypeBase } from "../ITypeBase";
import type { ICommonOutput } from "./ICommonOutput";

/**
 * The global type for the alias output.
 */
export const ALIAS_OUTPUT_TYPE = 4;

/**
 * Alias output.
 */
export interface IAliasOutput extends ITypeBase<4>, ICommonOutput {
    /**
     * The amount of IOTA tokens held by the output.
     */
    amount: number;

    /**
     * Unique identifier of the alias, which is the BLAKE2b-160 hash of the Output ID that created it.
     */
    aliasId: string;

    /**
     * A counter that must increase by 1 every time the alias is state transitioned.
     */
    stateIndex: number;

    /**
     * Metadata that can only be changed by the state controller.
     */
    stateMetadata: string;

    /**
     * A counter that denotes the number of foundries created by this alias account.
     */
    foundryCounter: number;

    /**
     * Immutable blocks contained by the output.
     */
    immutableBlocks: FeatureBlockTypes[];
}
