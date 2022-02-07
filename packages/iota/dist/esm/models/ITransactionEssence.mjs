// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Blake2b } from "@iota/crypto.js";
/**
 * The global type for the transaction essence.
 */
export const TRANSACTION_ESSENCE_TYPE = 0;
/**
 * Inputs commitment size.
 */
export const INPUTS_COMMITMENT_SIZE = Blake2b.SIZE_256;
