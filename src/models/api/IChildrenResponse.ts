// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/**
 * List of children found.
 */
export interface IChildrenResponse {
    /**
     * The message id that the children are for.
     */
    messageId: string;

    /**
     * The max number of results returned.
     */
    maxResults: number;

    /**
     * The number of items returned.
     */
    count: number;

    /**
     * The ids of the messages children.
     */
    childrenMessageIds: string[];
}
