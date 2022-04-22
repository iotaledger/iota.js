// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/**
 * Milestone.
 */
export interface IMqttMilestoneResponse {
    /**
     * The milestone id.
     */
    milestoneId: string;

    /**
     * The milestone index.
     */
    index: number;

    /**
     * The timestamp of the milestone.
     */
    timestamp: number;
}
