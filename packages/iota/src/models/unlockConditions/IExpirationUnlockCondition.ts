// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { AddressTypes } from "../addresses/addressTypes";
import type { ITypeBase } from "../ITypeBase";

/**
 * The global type for the expiration unlock condition.
 */
export const EXPIRATION_UNLOCK_CONDITION_TYPE = 3;

/**
 * Expiration Unlock Condition.
 */
export interface IExpirationUnlockCondition extends ITypeBase<3> {
    /**
     * The return address.
     */
    returnAddress: AddressTypes;

    /**
     * Before this milestone index the condition is allowed to unlock the output,
     * after that only the address defined in return address.
     */
    milestoneIndex?: number;

    /**
     * Before this unix time, the condition is allowed to unlock the output,
     * after that only the address defined in return address.
     */
    unixTime?: number;
}
