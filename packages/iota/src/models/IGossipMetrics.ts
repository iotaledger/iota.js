// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/**
 * Gossip metrics.
 */
export interface IGossipMetrics {
    /**
     * The number of new blocks.
     */
    newBlocks: number;

    /**
     * The number of known blocks.
     */
    knownBlocks: number;

    /**
     * The number of received blocks.
     */
    receivedBlocks: number;

    /**
     * The number of received block requests.
     */
    receivedBlockRequests: number;

    /**
     * The number of received milestone requests.
     */
    receivedMilestoneRequests: number;

    /**
     * The number of received heartbeats.
     */
    receivedHeartbeats: number;

    /**
     * The number of sent blocks.
     */
    sentBlocks: number;

    /**
     * The number of sent block requests.
     */
    sentBlockRequests: number;

    /**
     * The number of sent miletsone requests.
     */
    sentMilestoneRequests: number;

    /**
     * The number of sent heartbeats.
     */
    sentHeartbeats: number;

    /**
     * The number of dropped sent packets.
     */
    droppedPackets: number;
}
