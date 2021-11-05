// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { IAliasAddress } from "../addresses/IAliasAddress";
import type { IMetadataFeatureBlock } from "../featureBlocks/IMetadataFeatureBlock";
import type { INativeToken } from "../INativeToken";
import type { ITypeBase } from "../ITypeBase";

/**
 * The global type for the NFT output.
 */
export const NFT_OUTPUT_TYPE = 6;

/**
 * NFT output.
 */
export interface INftOutput extends ITypeBase<6> {
    /**
     * The address associated with the output.
     */
    address: IAliasAddress;

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
    nftId: number;

    /**
     * Binary metadata attached immutably to the NFT.
     */
    immutableData: string;

    /**
     * Blocks contained by the output.
     */
    blocks: IMetadataFeatureBlock[];
}
