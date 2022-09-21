// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0

import type { HexEncodedAmount } from "./hexEncodedTypes";

/**
 * Native token.
 */
export interface INativeToken {
    /**
     * Identifier of the native token.
     */
    id: string;

    /**
     * Amount of native tokens of the given Token ID.
     */
    amount: HexEncodedAmount;
}

