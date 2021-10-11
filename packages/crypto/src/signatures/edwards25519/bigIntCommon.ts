// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */
import bigInt, { BigInteger } from "big-integer";

/**
 * This is a port of the Go code from https://github.com/hdevalence/ed25519consensus
 * which is an extension of https://github.com/golang/crypto/tree/master/ed25519
 * which is in turn a port of the “ref10” implementation of ed25519 from SUPERCOP.
 */

// @internal
export const BIG_1_SHIFTL_20: BigInteger = bigInt(1).shiftLeft(20);
// @internal
export const BIG_1_SHIFTL_24: BigInteger = bigInt(1).shiftLeft(24);
// @internal
export const BIG_1_SHIFTL_25: BigInteger = bigInt(1).shiftLeft(25);

// @internal
export const BIG_ARR: BigInteger[] = [
    bigInt(0),
    bigInt(1),
    bigInt(2),
    bigInt(3),
    bigInt(4),
    bigInt(5),
    bigInt(6),
    bigInt(7),
    bigInt(8),
    bigInt(9),
    bigInt(10),
    bigInt(11),
    bigInt(12),
    bigInt(13),
    bigInt(14),
    bigInt(15),
    bigInt(16),
    bigInt(17),
    bigInt(18),
    bigInt(19),
    bigInt(20),
    bigInt(21),
    bigInt(22),
    bigInt(23),
    bigInt(24),
    bigInt(25),
    bigInt(26)
];

// @internal
export const BIG_38: BigInteger = bigInt(38);

// @internal
export const BIG_666643: BigInteger = bigInt(666643);
// @internal
export const BIG_470296: BigInteger = bigInt(470296);
// @internal
export const BIG_654183: BigInteger = bigInt(654183);
// @internal
export const BIG_997805: BigInteger = bigInt(997805);
// @internal
export const BIG_136657: BigInteger = bigInt(136657);
// @internal
export const BIG_683901: BigInteger = bigInt(683901);
// @internal
export const BIG_2097151: BigInteger = bigInt(2097151);
// @internal
export const BIG_8388607: BigInteger = bigInt(8388607);
