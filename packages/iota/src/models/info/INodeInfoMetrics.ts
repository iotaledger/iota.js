// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/**
 * Response from the /info endpoint.
 */
export interface INodeInfoMetrics {
    /**
     * Blocks per second.
     */
    blocksPerSecond: number;

    /**
     * Referenced blocks per second.
     */
    referencedBlocksPerSecond: number;

    /**
     * The rate at which rates are being referenced.
     */
    referencedRate: number;
}
