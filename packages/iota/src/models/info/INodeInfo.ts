// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { INodeInfoBaseToken } from "./INodeInfoBaseToken";
import type { INodeInfoMetrics } from "./INodeInfoMetrics";
import type { INodeInfoProtocol } from "./INodeInfoProtocol";
import type { INodeInfoStatus } from "./INodeInfoStatus";

/**
 * Response from the /info endpoint.
 */
export interface INodeInfo {
    /**
     * The name of the node.
     */
    name: string;

    /**
     * The version of node.
     */
    version: string;

    /**
     * The status of the node.
     */
    status: INodeInfoStatus;

    /**
     * The protocol info of the node.
     */
    protocol: INodeInfoProtocol;

    /**
     * The base token info of the node.
     */
    baseToken: INodeInfoBaseToken;

    /**
     * The metrics for the node.
     */
    metrics: INodeInfoMetrics;

    /**
     * Features supported by the node.
     */
    features: string[];

    /**
     * The plugins the node exposes.
     */
    plugins: string[];
}
