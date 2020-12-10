import { ITypeBase } from "./ITypeBase";

/**
 * The global type for the address type.
 */
export const ED25519_ADDRESS_TYPE: number = 1;

/**
 * Ed25519Address address.
 */
export interface IEd25519Address extends ITypeBase<1> {
    /**
     * The address.
     */
    address: string;
}
