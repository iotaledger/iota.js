import type { IAddressUnlockCondition } from "./IAddressUnlockCondition";
import type { IDustDepositReturnUnlockCondition } from "./IDustDepositReturnUnlockCondition";
import type { IExpirationUnlockCondition } from "./IExpirationUnlockCondition";
import type { IGovernorAddressUnlockCondition } from "./IGovernorAddressUnlockCondition";
import type { IImmutableAliasUnlockCondition } from "./IImmutableAliasUnlockCondition";
import type { IStateControllerAddressUnlockCondition } from "./IStateControllerAddressUnlockCondition";
import type { ITimelockUnlockCondition } from "./ITimelockUnlockCondition";
/**
 * All of the unlock condition types.
 */
export declare type UnlockConditionTypes = IAddressUnlockCondition | IDustDepositReturnUnlockCondition | ITimelockUnlockCondition | IExpirationUnlockCondition | IStateControllerAddressUnlockCondition | IGovernorAddressUnlockCondition | IImmutableAliasUnlockCondition;
