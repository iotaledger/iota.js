// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { AddressTypes } from "../addresses/addressTypes";
import type { ITypeBase } from "../ITypeBase";

/**
 * The global type for the issuer feature.
 */
export const ISSUER_FEATURE_TYPE = 1;

/**
 * Issuer feature.
 */
export interface IIssuerFeature extends ITypeBase<1> {
    /**
     * The address.
     */
    address: AddressTypes;
}
