// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { IReceiptPayload } from "../IReceiptPayload";

/**
 * Receipts response details.
 */
export interface IReceiptsResponse {
    /**
     * The receipts.
     */
    receipts: {
        /**
         * The milestone index.
         */
        milestoneIndex: number;
        /**
         * The receipt.
         */
        receipt: IReceiptPayload;
    }[];
}
