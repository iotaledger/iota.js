import type { AddressTypes } from "../addresses/addressTypes";
import type { ITypeBase } from "../ITypeBase";
/**
 * The global type for the issuer feature block.
 */
export declare const ISSUER_FEATURE_BLOCK_TYPE = 1;
/**
 * Issuer feature block.
 */
export interface IIssuerFeatureBlock extends ITypeBase<1> {
    /**
     * The address.
     */
    address: AddressTypes;
}
