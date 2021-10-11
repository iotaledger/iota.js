// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0

/**
 * Treasury.
 */
export interface ITreasury {
    /**
     * The milestone hash of the treasury.
     */
    milestoneId: string;

    /**
     * The amount for the treasury.
     */
    amount: number;
}
