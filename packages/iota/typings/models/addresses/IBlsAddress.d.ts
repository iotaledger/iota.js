import type { ITypeBase } from "../ITypeBase";
/**
 * The global type for the BLS address type.
 */
export declare const BLS_ADDRESS_TYPE = 1;
/**
 * BLS address.
 */
export interface IBlsAddress extends ITypeBase<1> {
    /**
     * The address.
     */
    address: string;
}
