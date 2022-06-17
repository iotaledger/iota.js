// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0

/**
 * Defines changing protocol parameters in a milestone.
 */
export interface INodeInfoProtocolParamsMilestoneOpt {
    /**
     * Defines the type of MilestoneOpt.
     */
    type: number;

    /**
     * The milestone index at which these protocol parameters become active.
     */
    targetMilestoneIndex: number;

    /**
     * The to be applied protocol version.
     */
    protocolVersion: number;

    /**
     * The protocol parameters in binary form. Hex-encoded with 0x prefix.
     */
    params: string;
}
