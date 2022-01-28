// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { ITypeBase } from "../ITypeBase";

/**
 * The global type for the timelock unlock condition.
 */
export const TIMELOCK_UNLOCK_CONDITION_TYPE = 2;

/**
 * Timelock Unlock Condition.
 */
export interface ITimelockUnlockCondition extends ITypeBase<2> {
    /**
     * The milestone index starting from which the output can be consumed.
     */
    milestoneIndex: number;

    /**
     * Unix time (seconds since Unix epoch) starting from which the output can be consumed.
     */
    unixTime: number;
}
