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
     * Is the node healthy.
     */
    isHealthy: boolean;
    /**
     * The network id.
     */
    networkId: string;
    /**
     * The minimum score required for PoW.
     */
    minPoWScore: number;
    /**
     * The human readable part of bech32 addresses.
     */
    bech32HRP: string;
    /**
     * The latest milestone index.
     */
    latestMilestoneIndex: number;
    /**
     * The latest milestone timestamp.
     */
    latestMilestoneTimestamp: number;
    /**
     * The confirmed milestone index.
     */
    confirmedMilestoneIndex: number;
    /**
     * The pruning index.
     */
    pruningIndex: number;
    /**
     * Features supported by the node.
     */
    features: string[];
    /**
     * Messages per second.
     */
    messagesPerSecond: number;
    /**
     * Referenced messages per second.
     */
    referencedMessagesPerSecond: number;
    /**
     * The rate at which rates are being referenced.
     */
    referencedRate: number;
}
