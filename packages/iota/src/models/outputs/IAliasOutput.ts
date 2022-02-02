// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { FeatureBlockTypes } from "../../models/featureBlocks/featureBlockTypes";
import type { UnlockConditionTypes } from "../../models/unlockConditions/unlockConditionTypes";
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
     * The unlock conditions for the output.
     */
    unlockConditions: UnlockConditionTypes[];

    /**
     * Feature blocks contained by the output.
     */
    featureBlocks: FeatureBlockTypes[];
}
