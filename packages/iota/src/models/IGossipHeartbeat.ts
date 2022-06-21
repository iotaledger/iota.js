// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/**
 * Gossip heartbeat.
 */
export interface IGossipHeartbeat {
    /**
     * Solid milestone index.
     */
    solidMilestoneIndex: number;

    /**
     * Pruned milestone index.
     */
    prunedMilestoneIndex: number;

    /**
     * Latest milestone index.
     */
    latestMilestoneIndex: number;

    /**
     * Connected peers.
     */
    connectedPeers: number;

    /**
     * Synced peers.
     */
    syncedPeers: number;
}
