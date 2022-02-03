/**
 * Defines the parameters of rent cost calculations on objects which take node resources.
 */
export interface IRent {
    /**
     * Defines the rent of a single virtual byte denoted in IOTA token.
     */
    vByteCost: number;
    /**
     * The factor to be used for data only fields.
     */
    vByteFactorData: number;
    /**
     * The factor to be used for key/lookup generating fields.
     */
    vByteFactorKey: number;
}
