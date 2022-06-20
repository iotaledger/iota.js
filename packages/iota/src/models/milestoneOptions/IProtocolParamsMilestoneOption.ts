// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { ITypeBase } from "../ITypeBase";

/**
 * The global type for the option.
 */
export const PROTOCOL_PARAMETERS_MILESTONE_OPTION_TYPE = 1;

/**
 * Protocol Parameters Milestone Option.
 */
export interface IProtocolParamsMilestoneOption extends ITypeBase<1> {
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
