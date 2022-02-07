// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { FeatureBlockTypes } from "../featureBlocks/featureBlockTypes";
import type { ITypeBase } from "../ITypeBase";
import type { ICommonOutput } from "./ICommonOutput";

/**
 * The global type for the NFT output.
 */
export const NFT_OUTPUT_TYPE = 6;

/**
 * NFT output.
 */
export interface INftOutput extends ITypeBase<6>, ICommonOutput {
    /**
     * The amount of IOTA tokens held by the output.
     */
    amount: number;

    /**
     * Unique identifier of the NFT, which is the BLAKE2b-160 hash of the Output ID that created it.
     */
    nftId: string;

    /**
     * Immutable blocks contained by the output.
     */
    immutableBlocks: FeatureBlockTypes[];
}
