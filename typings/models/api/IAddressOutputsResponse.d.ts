/**
 * List of outputs for an address.
 */
export interface IAddressOutputsResponse {
    /**
     * The type for the address.
     */
    addressType: number;
    /**
     * The address that the outputs are for.
     */
    address: string;
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
