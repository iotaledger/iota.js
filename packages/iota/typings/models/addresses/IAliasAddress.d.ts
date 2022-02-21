import type { ITypeBase } from "../ITypeBase";
/**
 * The global type for the alias address type.
 */
export declare const ALIAS_ADDRESS_TYPE = 8;
/**
 * Alias address.
 */
export interface IAliasAddress extends ITypeBase<8> {
    /**
     * The alias id.
     */
    aliasId: string;
}
