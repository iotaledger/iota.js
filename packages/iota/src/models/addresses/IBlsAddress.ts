// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { ITypeBase } from "../ITypeBase";

/**
 * The global type for the BLS address type.
 */
export const BLS_ADDRESS_TYPE = 1;

/**
 * BLS address.
 */
export interface IBlsAddress extends ITypeBase<1> {
    /**
     * The address.
     */
    address: string;
}
