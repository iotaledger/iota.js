import type { AddressTypes } from "../addresses/addressTypes";
import type { ITypeBase } from "../ITypeBase";
/**
 * The global type for the immutable alias unlock condition.
 */
export declare const IMMUTABLE_ALIAS_UNLOCK_CONDITION_TYPE = 6;
/**
 * Immutable Alias Unlock Condition.
 */
export interface IImmutableAliasUnlockCondition extends ITypeBase<6> {
    /**
     * The address.
     */
    address: AddressTypes;
}
