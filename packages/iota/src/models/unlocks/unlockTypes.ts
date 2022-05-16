// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { IAliasUnlock } from "./IAliasUnlock";
import type { INftUnlock } from "./INftUnlock";
import type { IReferenceUnlock } from "./IReferenceUnlock";
import type { ISignatureUnlock } from "./ISignatureUnlock";

/**
 * All of the unlock types.
 */
export type UnlockTypes = ISignatureUnlock | IReferenceUnlock | IAliasUnlock | INftUnlock;
