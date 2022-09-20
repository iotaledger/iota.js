// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0

import type { HexEncodedString } from "../hexEncodedString";

/**
 * The milestone info.
 */
export interface INodeInfoMilestone {
    /**
     * The milestone index.
     */
    index: number;
    /**
     * The milestone timestamp.
     */
    timestamp?: number;
    /**
     * The milestone id.
     */
    milestoneId?: HexEncodedString;
}
