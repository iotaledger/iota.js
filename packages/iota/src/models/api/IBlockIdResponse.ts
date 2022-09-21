// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0

import type { HexEncodedString } from "../hexEncodedTypes";

/**
 * Block id response.
 */
export interface IBlockIdResponse {
    /**
     * The block id.
     */
    blockId: HexEncodedString;
}
