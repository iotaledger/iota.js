// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { AddressTypes } from "../addresses/addressTypes";
import type { ITypeBase } from "../ITypeBase";

/**
 * The global type for the governor address unlock condition.
 */
export const GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE = 5;

/**
 * Governor Unlock Condition.
 */
export interface IGovernorAddressUnlockCondition extends ITypeBase<5> {
    /**
     * The address.
     */
    address: AddressTypes;
}