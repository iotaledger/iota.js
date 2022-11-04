// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { AddressTypes } from "../models/addresses/addressTypes";
import type { IRent } from "../models/IRent";
import type { ITypeBase } from "../models/ITypeBase";
import { BASIC_OUTPUT_TYPE, IBasicOutput } from "../models/outputs/IBasicOutput";
import { ADDRESS_UNLOCK_CONDITION_TYPE } from "../models/unlockConditions/IAddressUnlockCondition";
import { TransactionHelper } from "../utils/transactionHelper";
import type { IValidationResult } from "../validation/result";

/**
 * Validates the array is composed of distinct elements.
 * @param elements The elements.
 * @param containerName The name of the parent object to use in the error message.
 * @param elementName The name of the validation subject to use in the error message.
 * @returns The validation result.
 */
export function validateDistinct(
    elements: string[] | number[],
    containerName: string,
    elementName: string
): IValidationResult {
    let result: IValidationResult = { isValid: true };

    if (elements.length > 0) {
        const distinctElements = typeof elements[0] === "string" ?
            new Set<string>(elements as string[]) :
            new Set<number>(elements as number[]);

        if (distinctElements.size !== elements.length) {
            result = {
                isValid: false,
                errors: [`${containerName} must not contain more than one ${elementName} of each type.`]
            };
        }
    }

    return result;
}

/**
 * Validates that the array of objects is in ascending order relative to the objects type.
 * @param arrayToValidate The subject to validate the ascending order for.
 * @param containerName The name of the parent object to use in the error message.
 * @param elementName The name of the validation subject to use in the error message.
 * @returns The validation result.
 */
export function validateAscendingOrder(
    arrayToValidate: ITypeBase<number>[],
    containerName: string,
    elementName: string
): IValidationResult {
    let result: IValidationResult = { isValid: true };

    if (arrayToValidate.length >= 2) {
        const isAscending = arrayToValidate.slice(1).every((e, i) => e.type > arrayToValidate[i].type);

        if (!isAscending) {
            result = {
                isValid: false,
                errors: [`${containerName} ${elementName}s must be sorted in ascending order based on their ${elementName} Type.`]
            };
        }
    }

    return result;
}

/**
 * Calculates the minimum required storage deposit of an output.
 * @param address The address to calculate min storage deposit.
 * @param rentStructure Rent cost of objects which take node resources.
 * @returns The required storage deposit.
 */
export function getMinStorageDeposit(address: AddressTypes, rentStructure: IRent): number {
    const basicOutput: IBasicOutput = {
        type: BASIC_OUTPUT_TYPE,
        amount: "0",
        unlockConditions: [
            {
                type: ADDRESS_UNLOCK_CONDITION_TYPE,
                address
            }
        ]
    };

    return TransactionHelper.getStorageDeposit(basicOutput, rentStructure);
}

