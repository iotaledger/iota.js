// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import bigInt from "big-integer";
import type { INodeInfoProtocol } from "../../models/info/INodeInfoProtocol";
import type { ITypeBase } from "../../models/ITypeBase";
import type { OutputTypes } from "../../models/outputs/outputTypes";
import { IAddressUnlockCondition, ADDRESS_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IAddressUnlockCondition";
import { EXPIRATION_UNLOCK_CONDITION_TYPE, IExpirationUnlockCondition } from "../../models/unlockConditions/IExpirationUnlockCondition";
import { GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE, IGovernorAddressUnlockCondition } from "../../models/unlockConditions/IGovernorAddressUnlockCondition";
import { IImmutableAliasUnlockCondition, IMMUTABLE_ALIAS_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IImmutableAliasUnlockCondition";
import { IStateControllerAddressUnlockCondition, STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IStateControllerAddressUnlockCondition";
import { IStorageDepositReturnUnlockCondition, STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IStorageDepositReturnUnlockCondition";
import { ITimelockUnlockCondition, TIMELOCK_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/ITimelockUnlockCondition";
import type { UnlockConditionTypes } from "../../models/unlockConditions/unlockConditionTypes";
import { TransactionHelper } from "../../utils/transactionHelper";
import { validateAddress } from "../addresses/addresses";
import { IValidationResult, mergeValidationResults, failValidation } from "../result";

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

    if (object.length > 7) {
        results.push({
            isValid: false,
            errors: ["Max number of unlock conditions exceeded."]
        });
    }

    const distinctUnlockConditions = new Set(object.map(condition => condition.type));
    if (distinctUnlockConditions.size !== object.length) {
        results.push({
            isValid: false,
            errors: ["Output must not contain more than one unlock condition of each type."]
        });
    }

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
            result = validateAddressUnlockCondition(object);
            break;
        case STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE:
            if (output && protocolInfo) {
                result = validateStorageDepositReturnUnlockCondition(object, output, protocolInfo);
            } else {
                throw new Error("Must provide Output and Protocol info to validate storage deposit return unlock condition.");
            }
            break;
        case TIMELOCK_UNLOCK_CONDITION_TYPE:
            result = validateTimeUnlockCondition(object);
            break;
        case EXPIRATION_UNLOCK_CONDITION_TYPE:
            result = validateExpirationUnlockCondition(object);
            break;
        case STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE:
            result = validateStateControllerAddressUnlockCondition(object);
            break;
        case GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE:
            result = validateGovernorAddressUnlockCondition(object);
            break;
        case IMMUTABLE_ALIAS_UNLOCK_CONDITION_TYPE:
            result = validateImmutableAliasUnlockCondition(object);
            break;
        default:
            throw new Error(`Unrecognized Unlock condition type ${(object as ITypeBase<number>).type}`);
    }

    return result;
}

/**
 * Validate address unlock condition.
 * @param object The object to validate.
 * @returns The validation result.
 */
export function validateAddressUnlockCondition(object: IAddressUnlockCondition): IValidationResult {
    const result: IValidationResult = { isValid: true };

    if (object.type !== ADDRESS_UNLOCK_CONDITION_TYPE) {
        failValidation(result, `Type mismatch in address unlock condition ${object.type}`);
    }

    const validateAddresssResult = validateAddress(object.address);

    return mergeValidationResults(result, validateAddresssResult);
}

/**
 * Validate storage deposit return unlock condition.
 * @param object The object to validate.
 * @param output The output that owns unlock conditions.
 * @param protocol The Protocol Info.
 * @returns The validation result.
 */
export function validateStorageDepositReturnUnlockCondition(
    object: IStorageDepositReturnUnlockCondition,
    output: OutputTypes,
    protocol: INodeInfoProtocol
    ): IValidationResult {
    const result: IValidationResult = { isValid: true };

    if (object.type !== STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE) {
        failValidation(result, `Type mismatch in storage deposit return unlock condition ${object.type}`);
    }

    if (bigInt(object.amount).compare(bigInt.zero) !== 1) {
        failValidation(result, "Storage deposit amount must be larger than zero.");
    }

    const minStorageDeposit = TransactionHelper.getMinStorageDeposit(object.returnAddress, protocol.rentStructure);
    if (bigInt(object.amount).compare(minStorageDeposit) !== 1) {
        failValidation(result, "Storage deposit return amount is less than the min storage deposit.");
    }

    if (bigInt(object.amount).compare(output.amount) === 1) {
        failValidation(result, "Storage deposit return amount exceeds target output's deposit.");
    }

    const validateAddresssResult = validateAddress(object.returnAddress);

    return mergeValidationResults(result, validateAddresssResult);
}

/**
 * Validate time unlock condition.
 * @param object The object to validate.
 * @returns The validation result.
 */
export function validateTimeUnlockCondition(object: ITimelockUnlockCondition): IValidationResult {
    const result: IValidationResult = { isValid: true };

    if (object.type !== TIMELOCK_UNLOCK_CONDITION_TYPE) {
        failValidation(result, `Type mismatch in time unlock condition ${object.type}`);
    }

    if (object.unixTime === 0) {
        failValidation(result, "Time unlock condition must be greater than zero.");
    }

    return result;
}

/**
 * Validate expiration unlock condition.
 * @param object The object to validate.
 * @returns The validation result.
 */
export function validateExpirationUnlockCondition(object: IExpirationUnlockCondition): IValidationResult {
    const result: IValidationResult = { isValid: true };

    if (object.type !== EXPIRATION_UNLOCK_CONDITION_TYPE) {
        failValidation(result, `Type mismatch in expiration unlock condition ${object.type}`);
    }

    if (object.unixTime === 0) {
        failValidation(result, "Expiration unlock condition must be greater than zero.");
    }

    const validateAddresssResult = validateAddress(object.returnAddress);

    return mergeValidationResults(result, validateAddresssResult);
}

/**
 * Validate state controller address unlock condition.
 * @param object The object to validate.
 * @returns The validation result.
 */
export function validateStateControllerAddressUnlockCondition(
    object: IStateControllerAddressUnlockCondition
    ): IValidationResult {
    const result: IValidationResult = { isValid: true };

    if (object.type !== STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE) {
        failValidation(result, `Type mismatch in state controller address unlock condition ${object.type}`);
    }

    const validateAddresssResult = validateAddress(object.address);

    return mergeValidationResults(result, validateAddresssResult);
}

/**
 * Validate governor address unlock condition.
 * @param object The object to validate.
 * @returns The validation result.
 */
export function validateGovernorAddressUnlockCondition(object: IGovernorAddressUnlockCondition): IValidationResult {
    const result: IValidationResult = { isValid: true };

    if (object.type !== GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE) {
        failValidation(result, `Type mismatch in governor address unlock condition ${object.type}`);
    }

    const validateAddresssResult = validateAddress(object.address);

    return mergeValidationResults(result, validateAddresssResult);
}

/**
 * Validate immutable alias unlock condition.
 * @param object The object to validate.
 * @returns The validation result.
 */
export function validateImmutableAliasUnlockCondition(object: IImmutableAliasUnlockCondition): IValidationResult {
    const result: IValidationResult = { isValid: true };

    if (object.type !== IMMUTABLE_ALIAS_UNLOCK_CONDITION_TYPE) {
        failValidation(result, `Type mismatch in immutable alias unlock condition ${object.type}`);
    }

    const validateAddresssResult = validateAddress(object.address);

    return mergeValidationResults(result, validateAddresssResult);
}
