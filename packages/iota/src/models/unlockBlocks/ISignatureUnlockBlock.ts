// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { IEd25519Signature } from "../IEd25519Signature";
import type { ITypeBase } from "../ITypeBase";

/**
 * The global type for the unlock block.
 */
export const SIGNATURE_UNLOCK_BLOCK_TYPE = 0;

/**
 * An unlock block holding one or more signatures unlocking one or more inputs..
 */
export interface ISignatureUnlockBlock extends ITypeBase<0> {
    /**
     * The signature.
     */
    signature: IEd25519Signature;
}
