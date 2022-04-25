// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { IMigratedFunds } from "../IMigratedFunds";
import type { ITypeBase } from "../ITypeBase";
import type { ITreasuryTransactionPayload } from "../payloads/ITreasuryTransactionPayload";

/**
 * The global type for the option.
 */
export const RECEIPT_MILESTONE_OPTION_TYPE = 0;

/**
 * Receipt milestone option.
 */
export interface IReceiptMilestoneOption extends ITypeBase<0> {
    /**
     * The milestone index at which the funds were migrated in the legacy network.
     */
    migratedAt: number;

    /**
     * Whether this Receipt is the final one for a given migrated at index.
     */
    final: boolean;

    /**
     * The index data.
     */
    funds: IMigratedFunds[];

    /**
     * The TreasuryTransaction used to fund the funds.
     */
    transaction: ITreasuryTransactionPayload;
}
