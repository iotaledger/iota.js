// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import bigInt from "big-integer";
import type { INodeInfoProtocol } from "../../models/info/INodeInfoProtocol";
import type { ITypeBase } from "../../models/ITypeBase";
import type { OutputTypes } from "../../models/outputs/outputTypes";
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
 * @param output The output that owns unlock conditions.
 * @param protocolInfo The Protocol Info.
 * @returns The validation result.
 */
export function validateUnlockConditions(
    object: UnlockConditionTypes[],
    output?: OutputTypes,
    protocolInfo?: INodeInfoProtocol
    ): IValidationResult {
    const results: IValidationResult[] = [];

    if (object.length > MAX_UNLOCK_CONDITIONS) {
        results.push({
            isValid: false,
            errors: ["Max number of unlock conditions exceeded."]
        });
    }

    const distinctUnlockConditions = new Set(object.map(condition => condition.type));
    results.push(ValidationHelper.validateDistinct(distinctUnlockConditions, object.length, "Output", "unlock condition"));

    for (const unlockCondition of object) {
        results.push(
            validateUnlockCondition(unlockCondition, output, protocolInfo)
        );
    }

    return mergeValidationResults(...results);
}

/**
 * Validate output unlock condition.
 * @param object The object to validate.
 * @param output The output that owns unlock conditions.
 * @param protocolInfo The Protocol Info.
 * @returns The validation result.
 */
export function validateUnlockCondition(
    object: UnlockConditionTypes,
    output?: OutputTypes,
    protocolInfo?: INodeInfoProtocol
    ): IValidationResult {
    let result: IValidationResult = { isValid: true };

    switch (object.type) {
        case ADDRESS_UNLOCK_CONDITION_TYPE:
            result = validateAddress(object.address);
            break;
        case STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE:
            if (output && protocolInfo) {
                result = validateStorageDepositReturnUnlockCondition(object, output, protocolInfo);
            } else {
                throw new Error("Must provide Output and Protocol info to validate storage deposit return unlock condition.");
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
 * @param output The output that owns unlock conditions.
 * @param protocol The Protocol Info.
 * @returns The validation result.
 */
function validateStorageDepositReturnUnlockCondition(
    object: IStorageDepositReturnUnlockCondition,
    output: OutputTypes,
    protocol: INodeInfoProtocol
    ): IValidationResult {
    let result: IValidationResult = { isValid: true };

    if (bigInt(object.amount).compare(bigInt.zero) !== 1) {
        result = failValidation(result, "Storage deposit amount must be larger than zero.");
    }

    const minStorageDeposit = ValidationHelper.getMinStorageDeposit(object.returnAddress, protocol.rentStructure);
    if (bigInt(object.amount).compare(minStorageDeposit) !== 1) {
        result = failValidation(result, "Storage deposit return amount is less than the min storage deposit.");
    }

    if (bigInt(object.amount).compare(output.amount) === 1) {
        result = failValidation(result, "Storage deposit return amount exceeds target output's deposit.");
    }

    const validateAddresssResult = validateAddress(object.returnAddress);

    return mergeValidationResults(result, validateAddresssResult);
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

    const validateAddresssResult = validateAddress(object.returnAddress);

    return mergeValidationResults(result, validateAddresssResult);
}
