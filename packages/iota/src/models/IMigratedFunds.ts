// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { AddressTypes } from "../models/addresses/addressTypes";
import type { HexEncodedString } from "./hexEncodedString";

/**
 * The migrated funds for receipts.
 */
export interface IMigratedFunds {
    /**
     * The tail transaction hash of the migration bundle.
     */
    tailTransactionHash: HexEncodedString;

    /**
     * The target address of the migrated funds.
     */
    address: AddressTypes;

    /**
     * The amount of the deposit.
     */
    deposit: string;
}
