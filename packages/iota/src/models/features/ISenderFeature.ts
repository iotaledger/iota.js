// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { AddressTypes } from "../addresses/addressTypes";
import type { ITypeBase } from "../ITypeBase";

/**
 * The global type for the sender feature.
 */
export const SENDER_FEATURE_TYPE = 0;

/**
 * Sender feature.
 */
export interface ISenderFeature extends ITypeBase<0> {
    /**
     * The address.
     */
    address: AddressTypes;
}
