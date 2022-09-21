// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0

import type { HexEncodedString } from "./hexEncodedTypes";

/**
 * Treasury.
 */
export interface ITreasury {
    /**
     * The milestone hash of the treasury.
     */
    milestoneId: HexEncodedString;

    /**
     * The amount for the treasury.
     */
    amount: string;
}
