// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { AddressTypes } from "../addresses/addressTypes";
import type { ITypeBase } from "../ITypeBase";

/**
 * The global type for the state controller unlock condition.
 */
export const STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE = 4;

/**
 * State Controller Address Unlock Condition.
 */
export interface IStateControllerAddressUnlockCondition extends ITypeBase<4> {
    /**
     * The address.
     */
    address: AddressTypes;
}
