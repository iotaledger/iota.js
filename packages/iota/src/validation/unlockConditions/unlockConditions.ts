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
import { ValidationHelper } from "../../utils/validationHelper";
import { validateAddress } from "../addresses/addresses";
import { IValidationResult, mergeValidationResults, failValidation } from "../result";

/**
 * The max number of unlock conditions.
 */
const MAX_UNLOCK_CONDITIONS: number = 7;

/**
 * Validate output unlock conditions.
 * @param object The object to validate.
 * @param amount The output amount that owns unlock conditions.
 * @param rentStructure The rent cost parameters.
 * @returns The validation result.
 */
export function validateUnlockConditions(
    object: UnlockConditionTypes[],
    amount?: string,
    rentStructure?: IRent
): IValidationResult {
    const results: IValidationResult[] = [];

    if (object.length > MAX_UNLOCK_CONDITIONS) {
        results.push({
            isValid: false,
            errors: ["Max number of unlock conditions exceeded."]
        });
    }

    results.push(ValidationHelper.validateDistinct(object.map(condition => condition.type), "Output", "unlock condition"));

    for (const unlockCondition of object) {
        results.push(
            validateUnlockCondition(unlockCondition, amount, rentStructure)
        );
    }

    return mergeValidationResults(...results);
}

/**
 * Validate output unlock condition.
 * @param object The object to validate.
 * @param amount The output amount that owns unlock conditions.
 * @param rentStructure The rent cost parameters.
 * @returns The validation result.
 */
export function validateUnlockCondition(
    object: UnlockConditionTypes,
    amount?: string,
    rentStructure?: IRent
): IValidationResult {
    let result: IValidationResult = { isValid: true };

    switch (object.type) {
        case ADDRESS_UNLOCK_CONDITION_TYPE:
            result = validateAddress(object.address);
            break;
        case STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE:
            if (amount && rentStructure) {
                result = validateStorageDepositReturnUnlockCondition(object, amount, rentStructure);
            } else {
                throw new Error("Must provide Output amount and Rent structure to validate storage deposit return unlock condition.");
            }
            break;
        case TIMELOCK_UNLOCK_CONDITION_TYPE:
            if (object.unixTime === 0) {
                result = failValidation(result, "Time unlock condition must be greater than zero.");
            }
            break;
        case EXPIRATION_UNLOCK_CONDITION_TYPE:
            result = validateExpirationUnlockCondition(object);
            break;
        case STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE:
            result = validateAddress(object.address);
            break;
        case GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE:
            result = validateAddress(object.address);
            break;
        case IMMUTABLE_ALIAS_UNLOCK_CONDITION_TYPE:
            result = validateAddress(object.address);
            break;
        default:
            throw new Error(`Unrecognized Unlock condition type ${(object as ITypeBase<number>).type}`);
    }

    return result;
}

/**
 * Validate storage deposit return unlock condition.
 * @param object The object to validate.
 * @param amount The output amount that owns unlock conditions.
 * @param rentStructure The rent cost parameters.
 * @returns The validation result.
 */
function validateStorageDepositReturnUnlockCondition(
    object: IStorageDepositReturnUnlockCondition,
    amount: string,
    rentStructure: IRent
): IValidationResult {
    let result: IValidationResult = { isValid: true };

    if (bigInt(object.amount).eq(bigInt.zero)) {
        result = failValidation(result, "Storage deposit amount must be larger than zero.");
    }

    const minStorageDeposit = ValidationHelper.getMinStorageDeposit(object.returnAddress, rentStructure);

    if (bigInt(object.amount).lt(minStorageDeposit)) {
        result = failValidation(result, "Storage deposit return amount is less than the min storage deposit.");
    }

    if (bigInt(object.amount).gt(amount)) {
        result = failValidation(result, "Storage deposit return amount exceeds target output's deposit.");
    }

    const validateAddressResult = validateAddress(object.returnAddress);

    return mergeValidationResults(result, validateAddressResult);
}

/**
 * Validate expiration unlock condition.
 * @param object The object to validate.
 * @returns The validation result.
 */
function validateExpirationUnlockCondition(object: IExpirationUnlockCondition): IValidationResult {
    let result: IValidationResult = { isValid: true };

    if (object.unixTime === 0) {
        result = failValidation(result, "Expiration unlock condition must be greater than zero.");
    }

    const validateAddressResult = validateAddress(object.returnAddress);

    return mergeValidationResults(result, validateAddressResult);
}
