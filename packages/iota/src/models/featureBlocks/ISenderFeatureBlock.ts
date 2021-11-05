// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { AddressTypes } from "../addresses/addressTypes";
import type { ITypeBase } from "../ITypeBase";

/**
 * The global type for the sender feature block.
 */
export const SENDER_FEATURE_BLOCK_TYPE = 0;

/**
 * Sender feature block.
 */
export interface ISenderFeatureBlock extends ITypeBase<0> {
    /**
     * The address.
     */
    address: AddressTypes;
}
