// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { IReceiptPayload } from "../IReceiptPayload";

/**
 * Receipts response details.
 */
export interface IReceiptsResponse {
    /**
     * The receipts.
     */
    receipts: IReceiptPayload[];
}
