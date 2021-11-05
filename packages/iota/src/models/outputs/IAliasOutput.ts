// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { IAliasAddress } from "../addresses/IAliasAddress";
import type { IEd25519Address } from "../addresses/IEd25519Address";
import type { IIssuerFeatureBlock } from "../featureBlocks/IIssuerFeatureBlock";
import type { IMetadataFeatureBlock } from "../featureBlocks/IMetadataFeatureBlock";
import type { INativeToken } from "../INativeToken";
import type { ITypeBase } from "../ITypeBase";

/**
 * The global type for the alias output.
 */
export const ALIAS_OUTPUT_TYPE = 4;

/**
 * Alias output.
 */
export interface IAliasOutput extends ITypeBase<4> {
    /**
     * The amount of IOTA tokens held by the output.
     */
    amount: number;

    /**
     * The native tokens held by the output.
     */
    nativeTokens: INativeToken[];

    /**
     * Unique identifier of the alias, which is the BLAKE2b-160 hash of the Output ID that created it.
     */
    aliasId: string;

    /**
     * The address that controls the output.
     */
    stateController: IEd25519Address | IAliasAddress;

    /**
     * The address that governs the output.
     */
    governanceController: IEd25519Address | IAliasAddress;

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
     * Blocks contained by the output.
     */
    blocks: (IIssuerFeatureBlock | IMetadataFeatureBlock)[];
}
