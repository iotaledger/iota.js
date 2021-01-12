// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/**
 * Milestone.
 */
export interface IMilestoneResponse {
    /**
     * The milestone index.
     */
    index: number;

    /**
     * The message id of the milestone.
     */
    messageId: string;

    /**
     * The timestamp of the milestone.
     */
    timestamp: number;
}
