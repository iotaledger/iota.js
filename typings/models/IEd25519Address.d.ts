import { ITypeBase } from "./ITypeBase";
/**
 * The global type for the address type.
 */
export declare const ED25519_ADDRESS_TYPE: number;
/**
 * Ed25519Address address.
 */
export interface IEd25519Address extends ITypeBase<1> {
    /**
     * The address.
     */
    address: string;
}
