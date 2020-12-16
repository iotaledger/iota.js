/**
 * Definition of address generator state.
 */
export interface IAccountAddressGeneratorState {
    /**
     * The account index.
     */
    accountIndex: number;
    /**
     * Is this an internal address.
     */
    isInternal: boolean;
    /**
     * The address index.
     */
    addressIndex: number;
}
