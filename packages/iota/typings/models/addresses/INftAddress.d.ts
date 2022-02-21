import type { ITypeBase } from "../ITypeBase";
/**
 * The global type for the NFT address type.
 */
export declare const NFT_ADDRESS_TYPE = 16;
/**
 * NFT address.
 */
export interface INftAddress extends ITypeBase<16> {
    /**
     * The NFT Id.
     */
    nftId: string;
}
