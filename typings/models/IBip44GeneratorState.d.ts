/**
 * Definition of address generator state.
 */
export interface IBip44GeneratorState {
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
