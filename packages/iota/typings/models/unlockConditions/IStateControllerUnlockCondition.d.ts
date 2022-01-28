import type { AddressTypes } from "../addresses/addressTypes";
import type { ITypeBase } from "../ITypeBase";
/**
 * The global type for the state controller unlock condition.
 */
export declare const STATE_CONTROLLER_UNLOCK_CONDITION_TYPE = 4;
/**
 * State Controller Unlock Condition.
 */
export interface IStateControllerUnlockCondition extends ITypeBase<4> {
    /**
     * The address.
     */
    address: AddressTypes;
}
