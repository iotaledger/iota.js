// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { FeatureBlockTypes } from "../featureBlocks/featureBlockTypes";
import type { INativeToken } from "../INativeToken";
import type { UnlockConditionTypes } from "../unlockConditions/unlockConditionTypes";

/**
 * Common output properties.
 */
export interface ICommonOutput {
    /**
     * The native tokens held by the output.
     */
    nativeTokens: INativeToken[];

    /**
     * The unlock conditions for the output.
     */
    unlockConditions: UnlockConditionTypes[];

    /**
     * Feature blocks contained by the output.
     */
    featureBlocks: FeatureBlockTypes[];
}
