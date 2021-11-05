import type { AddressTypes } from "../addresses/addressTypes";
import type { ITypeBase } from "../ITypeBase";
/**
 * The global type for the sender feature block.
 */
export declare const SENDER_FEATURE_BLOCK_TYPE = 0;
/**
 * Sender feature block.
 */
export interface ISenderFeatureBlock extends ITypeBase<0> {
    /**
     * The address.
     */
    address: AddressTypes;
}
