// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { IMigratedFunds } from "./IMigratedFunds";
import { ITypeBase } from "./ITypeBase";

/**
 * The global type for the payload.
 */
export const RECEIPT_PAYLOAD_TYPE = 3;

/**
 * Receipt payload.
 */
export interface IReceiptPayload extends ITypeBase<3> {
    /**
     * The milestone index at which the funds were migrated in the legacy network.
     */
    migratedAt: number;

    /**
     * The index data.
     */
    funds: IMigratedFunds[];
}
