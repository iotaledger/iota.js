import type { AddressTypes } from "../addresses/addressTypes";
import type { ITypeBase } from "../ITypeBase";
/**
 * The global type for the simple output.
 */
export declare const SIMPLE_OUTPUT_TYPE = 0;
/**
 * Simple output.
 */
export interface ISimpleOutput extends ITypeBase<0> {
    /**
     * The address.
     */
    address: AddressTypes;
    /**
     * The amount of the output.
     */
    amount: number;
}
