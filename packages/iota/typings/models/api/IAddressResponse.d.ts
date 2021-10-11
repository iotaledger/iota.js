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
     * The balance of the address.
     */
    balance: number;
    /**
     * The address is allowed to be sent dust.
     */
    dustAllowed: boolean;
    /**
     * The ledger index at which these outputs where available at.
     */
    ledgerIndex: number;
}
