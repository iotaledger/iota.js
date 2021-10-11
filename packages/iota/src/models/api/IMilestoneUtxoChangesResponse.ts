// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/**
 * Milestone.
 */
export interface IMilestoneUtxoChangesResponse {
    /**
     * The milestone index.
     */
    index: number;

    /**
     * The output IDs (transaction hash + output index) of the newly created outputs.
     */
    createdOutputs: string[];

    /**
     * The output IDs (transaction hash + output index) of the consumed (spent) outputs.
     */
    consumedOutputs: string[];
}
