// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { FeatureBlockTypes } from "../featureBlocks/featureBlockTypes";
import type { INativeToken } from "../INativeToken";
import type { ITypeBase } from "../ITypeBase";
import type { UnlockConditionTypes } from "../unlockConditions/unlockConditionTypes";

/**
 * The global type for the NFT output.
 */
export const NFT_OUTPUT_TYPE = 6;

/**
 * NFT output.
 */
export interface INftOutput extends ITypeBase<6> {
    /**
     * The amount of IOTA tokens held by the output.
     */
    amount: number;

    /**
     * The native tokens held by the output.
     */
    nativeTokens: INativeToken[];

    /**
     * Unique identifier of the NFT, which is the BLAKE2b-160 hash of the Output ID that created it.
     */
    nftId: string;

    /**
     * Binary metadata attached immutably to the NFT.
     */
    immutableData: string;

    /**
     * The unlock conditions for the output.
     */
    unlockConditions: UnlockConditionTypes[];

    /**
     * Blocks contained by the output.
     */
    blocks: FeatureBlockTypes[];
}
