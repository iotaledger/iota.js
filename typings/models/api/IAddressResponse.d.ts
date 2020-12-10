/**
 * Address details.
 */
export interface IAddressResponse {
    /**
     * The type for the address.
     */
    addressType: number;
    /**
     * The address the details are for.
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
     * The balance of the address.
     */
    balance: number;
}
