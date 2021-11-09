// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Blake2b } from "@iota/crypto.js";
/**
 * Byte length for a uint8 field.
 */
export const UINT8_SIZE = 1;
/**
 * Byte length for a uint16 field.
 */
export const UINT16_SIZE = 2;
/**
 * Byte length for a uint32 field.
 */
export const UINT32_SIZE = 4;
/**
 * Byte length for a uint64 field.
 */
export const UINT64_SIZE = 8;
/**
 * Byte length for a uint256 field.
 */
export const UINT256_SIZE = 32;
/**
 * Byte length for a message id.
 */
export const MESSAGE_ID_LENGTH = Blake2b.SIZE_256;
/**
 * Byte length for a transaction id.
 */
export const TRANSACTION_ID_LENGTH = Blake2b.SIZE_256;
/**
 * Byte length for a merkle prrof.
 */
export const MERKLE_PROOF_LENGTH = Blake2b.SIZE_256;
/**
 * Byte length for a type length.
 */
export const TYPE_LENGTH = UINT32_SIZE;
/**
 * Byte length for a small type length.
 */
export const SMALL_TYPE_LENGTH = UINT8_SIZE;
/**
 * Byte length for a string length.
 */
export const STRING_LENGTH = UINT16_SIZE;
/**
 * Byte length for an array length.
 */
export const ARRAY_LENGTH = UINT16_SIZE;
