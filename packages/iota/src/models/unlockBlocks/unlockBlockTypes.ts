// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { IAliasUnlockBlock } from "./IAliasUnlockBlock";
import type { INftUnlockBlock } from "./INftUnlockBlock";
import type { IReferenceUnlockBlock } from "./IReferenceUnlockBlock";
import type { ISignatureUnlockBlock } from "./ISignatureUnlockBlock";

/**
 * All of the unlock block types.
 */
export type UnlockBlockTypes = ISignatureUnlockBlock | IReferenceUnlockBlock | IAliasUnlockBlock | INftUnlockBlock;
