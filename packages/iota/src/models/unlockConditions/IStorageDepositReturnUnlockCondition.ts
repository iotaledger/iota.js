// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { AddressTypes } from "../addresses/addressTypes";
import type { ITypeBase } from "../ITypeBase";

/**
 * The global type for the storage deposit return unlock condition.
 */
export const STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE = 1;

/**
 * Storage Desposit Return Unlock Condition.
 */
export interface IStorageDepositReturnUnlockCondition extends ITypeBase<1> {
    /**
     * The return address.
     */
    returnAddress: AddressTypes;

    /**
     * Amount of IOTA tokens the consuming transaction should deposit to the address defined in return address.
     */
    returnAmount: string;
}
