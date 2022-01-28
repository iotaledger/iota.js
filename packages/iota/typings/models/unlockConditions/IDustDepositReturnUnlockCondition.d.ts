import type { AddressTypes } from "../addresses/addressTypes";
import type { ITypeBase } from "../ITypeBase";
/**
 * The global type for the dust deposit return unlock condition.
 */
export declare const DUST_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE = 1;
/**
 * Dust Desposit Return Unlock Condition.
 */
export interface IDustDepositReturnUnlockCondition extends ITypeBase<1> {
    /**
     * The return address.
     */
    returnAddress: AddressTypes;
    /**
     * Amount of IOTA tokens the consuming transaction should deposit to the address defined in return address.
     */
    amount: number;
}
