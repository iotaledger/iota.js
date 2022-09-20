// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0

import type { HexEncodedString } from "../hexEncodedString";

/**
 * Details of an output.
 */
export interface IOutputMetadataResponse {
    /**
     * The block id the output was contained in.
     */
    blockId: HexEncodedString;

    /**
     * The transaction id for the output.
     */
    transactionId: HexEncodedString;

    /**
     * The index for the output.
     */
    outputIndex: number;

    /**
     * Is the output spent.
     */
    isSpent: boolean;

    /**
     * The milestone index at which this output was spent.
     */
    milestoneIndexSpent?: number;

    /**
     * The milestone timestamp this output was spent.
     */
    milestoneTimestampSpent?: number;

    /**
     * The transaction this output was spent with.
     */
    transactionIdSpent?: HexEncodedString;

    /**
     * The milestone index at which this output was booked into the ledger.
     */
    milestoneIndexBooked: number;

    /**
     * The milestone timestamp this output was booked in the ledger.
     */
    milestoneTimestampBooked: number;

    /**
     * The ledger index at which these output was available at.
     */
    ledgerIndex: number;
}
