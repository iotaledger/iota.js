// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/**
 * Gossip metrics.
 */
export interface IGossipMetrics {
    /**
     * The number of sent packets.
     */
    sentPackets: number;

    /**
     * The number of dropped sent packets.
     */
    droppedSentPackets: number;

    /**
     * The number of received heartbeats.
     */
    receivedHeartbeats: number;

    /**
     * The number of sent heartbeats.
     */
    sentHeartbeats: string;

    /**
     * The number of received messages.
     */
    receivedMessages: number;

    /**
     * The number of new messages.
     */
    newMessages: number;

    /**
     * The number of known messages.
     */
    knownMessages: number;
}
