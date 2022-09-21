// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { HexEncodedString } from "../hexEncodedTypes";
import type { ITypeBase } from "../ITypeBase";

/**
 * The global type for the ed25519 address type.
 */
export const ED25519_ADDRESS_TYPE = 0;

/**
 * Ed25519Address address.
 */
export interface IEd25519Address extends ITypeBase<0> {
    /**
     * The public key hash.
     */
    pubKeyHash: HexEncodedString;
}
