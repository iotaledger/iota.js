/**
 * Details of an outputs response.
 */
export interface IOutputsResponse {
    /**
     * The max number of results returned.
     */
    maxResults: number;
    /**
     * The number of items returned.
     */
    count: number;
    /**
     * The ids of the outputs.
     */
    outputIds: string[];
    /**
     * The ledger index at which these outputs where available at.
     */
    ledgerIndex: number;
}
