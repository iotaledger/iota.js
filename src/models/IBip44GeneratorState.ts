// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0

/**
 * Definition of address generator state.
 */
export interface IBip44GeneratorState {
    /**
     * The account index.
     */
    accountIndex: number;

    /**
     * Is this an internal address.
     */
    isInternal: boolean;

    /**
     * The address index.
     */
    addressIndex: number;
}
