// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { ITypeBase } from "../ITypeBase";

/**
 * The global type for the NFT unlock.
 */
export const NFT_UNLOCK_TYPE = 3;

/**
 * An unlock which must reference a previous unlock which unlocks the NFT that the input is locked to.
 */
export interface INftUnlock extends ITypeBase<3> {
    /**
     * The reference.
     */
    reference: number;
}
