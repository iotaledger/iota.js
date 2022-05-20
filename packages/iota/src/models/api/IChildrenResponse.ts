// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/**
 * List of children found.
 */
export interface IChildrenResponse {
    /**
     * The block id that the children are for.
     */
    blockId: string;

    /**
     * The max number of results returned.
     */
    maxResults: number;

    /**
     * The number of items returned.
     */
    count: number;

    /**
     * The ids of the blocks children.
     */
    children: string[];
}
