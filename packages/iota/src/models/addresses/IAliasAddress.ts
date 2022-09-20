// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { HexEncodedString } from "../hexEncodedString";
import type { ITypeBase } from "../ITypeBase";

/**
 * The global type for the alias address type.
 */
export const ALIAS_ADDRESS_TYPE = 8;

/**
 * Alias address.
 */
export interface IAliasAddress extends ITypeBase<8> {
    /**
     * The alias id.
     */
    aliasId: HexEncodedString;
}
