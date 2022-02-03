import type { INodeInfoMetrics } from "./INodeInfoMetrics";
import type { INodeInfoProtocol } from "./INodeInfoProtocol";
import type { INodeInfoStatus } from "./INodeInfoStatus";
/**
 * Response from the /info endpoint.
 */
export interface INodeInfo {
    /**
     * The name of the node software.
     */
    name: string;
    /**
     * The version of the software running on the node.
     */
    version: string;
    /**
     * The status of the node.
     */
    status: INodeInfoStatus;
    /**
     * The protocol information of the node.
     */
    protocol: INodeInfoProtocol;
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
