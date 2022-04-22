// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { ITypeBase } from "../ITypeBase";

/**
 * The global type for the payload.
 */
export const POW_MILESTONE_OPTION_TYPE = 1;

/**
 * Receipt payload.
 */
export interface IPoWMilestoneOption extends ITypeBase<1> {
    /**
     * The next PoW score.
     */
    nextPoWScore: number;

    /**
     * The milestone at which the next PoW score becomes active.
     */
    nextPoWScoreMilestoneIndex: number;
}
