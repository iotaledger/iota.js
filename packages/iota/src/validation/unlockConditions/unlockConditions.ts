// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import bigInt from "big-integer";
import type { IRent } from "../../models/IRent";
import type { ITypeBase } from "../../models/ITypeBase";
import { ADDRESS_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IAddressUnlockCondition";
import { EXPIRATION_UNLOCK_CONDITION_TYPE, IExpirationUnlockCondition } from "../../models/unlockConditions/IExpirationUnlockCondition";
import { GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IGovernorAddressUnlockCondition";
import { IMMUTABLE_ALIAS_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IImmutableAliasUnlockCondition";
import { STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IStateControllerAddressUnlockCondition";
import { IStorageDepositReturnUnlockCondition, STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IStorageDepositReturnUnlockCondition";
import { TIMELOCK_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/ITimelockUnlockCondition";
import type { UnlockConditionTypes } from "../../models/unlockConditions/unlockConditionTypes";
import { validateAddress } from "../addresses/addresses";
import { failValidation } from "../result";
import { getMinStorageDeposit, validateAscendingOrder, validateDistinct } from "../validationUtils";

/**
 * Validate output unlock conditions.
 * @param unlockConditions The Unlock Conditions to validate.
 * @param amount The output amount that owns unlock conditions.
 * @param rentStructure The rent cost parameters.
 * @throws Error if the validation fails.
 */
export function validateUnlockConditions(
    unlockConditions: UnlockConditionTypes[],
    amount?: string,
    rentStructure?: IRent
) {
    validateDistinct(unlockConditions.map(condition => condition.type), "Output", "unlock condition");

    validateAscendingOrder(unlockConditions, "Output", "Unlock Condition");

    for (const unlockCondition of unlockConditions) {
        validateUnlockCondition(unlockCondition, amount, rentStructure);
    }
}

/**
 * Validate output unlock condition.
 * @param unlockCondition The Unlock Condition to validate.
 * @param amount The output amount that owns unlock conditions.
 * @param rentStructure The rent cost parameters.
 * @throws Error if the validation fails.
 */
export function validateUnlockCondition(
    unlockCondition: UnlockConditionTypes,
    amount?: string,
    rentStructure?: IRent
) {
    switch (unlockCondition.type) {
        case ADDRESS_UNLOCK_CONDITION_TYPE:
            validateAddress(unlockCondition.address);
            break;
        case STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE:
            if (amount && rentStructure) {
                validateStorageDepositReturnUnlockCondition(unlockCondition, amount, rentStructure);
            } else {
                failValidation("Must provide Output amount and Rent structure to validate storage deposit return unlock condition.");
            }
            break;
        case TIMELOCK_UNLOCK_CONDITION_TYPE:
            if (unlockCondition.unixTime === 0) {
                failValidation("Time unlock condition must be greater than zero.");
            }
            break;
        case EXPIRATION_UNLOCK_CONDITION_TYPE:
            validateExpirationUnlockCondition(unlockCondition);
            break;
        case STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE:
            validateAddress(unlockCondition.address);
            break;
        case GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE:
            validateAddress(unlockCondition.address);
            break;
        case IMMUTABLE_ALIAS_UNLOCK_CONDITION_TYPE:
            validateAddress(unlockCondition.address);
            break;
        default:
            failValidation(`Unrecognized Unlock condition type ${(unlockCondition as ITypeBase<number>).type}`);
    }
}

/**
 * Validate storage deposit return unlock condition.
 * @param sdruc The Storage Deposit Return Unlock Condition to validate.
 * @param amount The output amount that owns unlock conditions.
 * @param rentStructure The rent cost parameters.
 * @throws Error if the validation fails.
 */
function validateStorageDepositReturnUnlockCondition(
    sdruc: IStorageDepositReturnUnlockCondition,
    amount: string,
    rentStructure: IRent
) {
    if (bigInt(sdruc.amount).leq(bigInt.zero)) {
        failValidation("Storage deposit amount must be larger than zero.");
    }

    validateAddress(sdruc.returnAddress);

    const minStorageDeposit = getMinStorageDeposit(sdruc.returnAddress, rentStructure);

    if (bigInt(sdruc.amount).lt(minStorageDeposit)) {
        failValidation("Storage deposit return amount is less than the min storage deposit.");
    }

    if (bigInt(sdruc.amount).gt(amount)) {
        failValidation("Storage deposit return amount exceeds target output's deposit.");
    }
}

/**
 * Validate expiration unlock condition.
 * @param euc The Expiration Unlock Condition to validate.
 * @throws Error if the validation fails.
 */
function validateExpirationUnlockCondition(euc: IExpirationUnlockCondition) {
    if (euc.unixTime === 0) {
        throw new Error("Expiration unlock condition must be greater than zero.");
    }

    validateAddress(euc.returnAddress);
}

