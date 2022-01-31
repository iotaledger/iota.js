/**
 * Details of an outputs response from the indexer plugin.
 */
export interface IOutputsResponse {
    /**
     * The ledger index at which these outputs where available at.
     */
    ledgerIndex: number;
    /**
     * The maximum count of results that are returned by the node.
     */
    limit: number;
    /**
     * The offset to use for getting the next results.
     */
    offset: string;
    /**
     * The actual count of results that are returned.
     */
    count: number;
    /**
     * The output IDs (transaction hash + output index) of the outputs on this address.
     */
    data: string[];
}
