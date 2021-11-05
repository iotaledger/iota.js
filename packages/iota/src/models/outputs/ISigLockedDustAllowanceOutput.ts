// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { AddressTypes } from "../addresses/addressTypes";
import type { ITypeBase } from "../ITypeBase";

/**
 * The global type for the sig locked dust allowance output.
 * @deprecated
 */
export const SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE = 1;

/**
 * Signature locked single output.
 * @deprecated
 */
export interface ISigLockedDustAllowanceOutput extends ITypeBase<1> {
    /**
     * The address.
     */
    address: AddressTypes;

    /**
     * The amount of the output.
     */
    amount: number;
}
