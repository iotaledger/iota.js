// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { AddressTypes } from "../addresses/addressTypes";
import type { ITypeBase } from "../ITypeBase";

/**
 * The global type for the governor unlock condition.
 */
export const GOVERNOR_UNLOCK_CONDITION_TYPE = 5;

/**
 * Governor Unlock Condition.
 */
export interface IGovernorUnlockCondition extends ITypeBase<5> {
    /**
     * The address.
     */
    address: AddressTypes;
}
