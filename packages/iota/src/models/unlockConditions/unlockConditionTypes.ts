// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { IAddressUnlockCondition } from "./IAddressUnlockCondition";
import type { IDustDepositReturnUnlockCondition } from "./IDustDepositReturnUnlockCondition";
import type { IExpirationUnlockCondition } from "./IExpirationUnlockCondition";
import type { IGovernorUnlockCondition } from "./IGovernorUnlockCondition";
import type { IStateControllerUnlockCondition } from "./IStateControllerUnlockCondition";
import type { ITimelockUnlockCondition } from "./ITimelockUnlockCondition";

/**
 * All of the unlock condition types.
 */
export type UnlockConditionTypes =
    IAddressUnlockCondition |
    IDustDepositReturnUnlockCondition |
    ITimelockUnlockCondition |
    IExpirationUnlockCondition |
    IStateControllerUnlockCondition |
    IGovernorUnlockCondition;
