import type { AddressTypes } from "../addresses/addressTypes";
import type { ITypeBase } from "../ITypeBase";
/**
 * The global type for the address unlock condition.
 */
export declare const ADDRESS_UNLOCK_CONDITION_TYPE = 0;
/**
 * Address Unlock Condition.
 */
export interface IAddressUnlockCondition extends ITypeBase<0> {
    /**
     * The address.
     */
    address: AddressTypes;
}
