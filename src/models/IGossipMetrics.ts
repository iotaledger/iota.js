// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/**
 * Gossip metrics.
 */
export interface IGossipMetrics {
    /**
     * The number of new messages.
     */
    newMessages: number;

    /**
     * The number of known messages.
     */
    knownMessages: number;

    /**
     * The number of received messages.
     */
    receivedMessages: number;

    /**
     * The number of received message requests.
     */
    receivedMessageRequests: number;

    /**
     * The number of received milestone requests.
     */
    receivedMilestoneRequests: number;

    /**
     * The number of received heartbeats.
     */
    receivedHeartbeats: number;

    /**
     * The number of sent messages.
     */
    sentMessages: number;

    /**
     * The number of sent message requests.
     */
    sentMessageRequests: number;

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
