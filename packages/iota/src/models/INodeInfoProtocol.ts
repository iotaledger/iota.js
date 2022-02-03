// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { IRent } from "./IRent";

/**
 * Response from the /info endpoint.
 */
export interface INodeInfoProtocol {
    /**
     * The human friendly name of the network on which the node operates on.
     */
    networkName: string;

    /**
     * The human readable part of bech32 addresses.
     */
    bech32HRP: string;

    /**
     * The minimum score required for PoW.
     */
    minPoWScore: number;

    /**
     * The rent structure used by given node/network.
     */
    rentStructure: IRent;
}
