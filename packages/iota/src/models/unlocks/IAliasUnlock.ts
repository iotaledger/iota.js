// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { ITypeBase } from "../ITypeBase";

/**
 * The global type for the alias unlock.
 */
export const ALIAS_UNLOCK_TYPE = 2;

/**
 * An unlock which must reference a previous unlock which unlocks the alias that the input is locked to.
 */
export interface IAliasUnlock extends ITypeBase<2> {
    /**
     * The reference.
     */
    reference: number;
}
