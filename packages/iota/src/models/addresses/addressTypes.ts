// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { IAliasAddress } from "./IAliasAddress";
import type { IBlsAddress } from "./IBlsAddress";
import type { IEd25519Address } from "./IEd25519Address";
import type { INftAddress } from "./INftAddress";

/**
 * All of the address types.
 */
export type AddressTypes = IEd25519Address | IAliasAddress | INftAddress | IBlsAddress;
