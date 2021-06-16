import type { ITypeBase } from "./ITypeBase";
/**
 * The global type for the address type.
 */
export declare const ED25519_ADDRESS_TYPE = 0;
/**
 * Ed25519Address address.
 */
export interface IEd25519Address extends ITypeBase<0> {
    /**
     * The address.
     */
    address: string;
}
