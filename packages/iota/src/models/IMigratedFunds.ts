// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { IEd25519Address } from "./IEd25519Address";

/**
 * The migrated funds for receipts.
 */
export interface IMigratedFunds {
    /**
     * The tail transaction hash of the migration bundle.
     */
    tailTransactionHash: string;

    /**
     * The target address of the migrated funds.
     */
    address: IEd25519Address;

    /**
     * The amount of the deposit.
     */
    deposit: number;
}
