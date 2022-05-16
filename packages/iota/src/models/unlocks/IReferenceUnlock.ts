// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { ITypeBase } from "../ITypeBase";

/**
 * The global type for the reference unlock.
 */
export const REFERENCE_UNLOCK_TYPE = 1;

/**
 * An unlock which must reference a previous unlock which unlocks
 * also the input at the same index as this Reference Unlock.
 */
export interface IReferenceUnlock extends ITypeBase<1> {
    /**
     * The reference.
     */
    reference: number;
}
