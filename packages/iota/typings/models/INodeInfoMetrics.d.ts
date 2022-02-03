/**
 * Response from the /info endpoint.
 */
export interface INodeInfoMetrics {
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
