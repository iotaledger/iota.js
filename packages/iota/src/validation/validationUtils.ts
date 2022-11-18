// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { AddressTypes } from "../models/addresses/addressTypes";
import type { IRent } from "../models/IRent";
import type { ITypeBase } from "../models/ITypeBase";
import { BASIC_OUTPUT_TYPE, IBasicOutput } from "../models/outputs/IBasicOutput";
import { ADDRESS_UNLOCK_CONDITION_TYPE } from "../models/unlockConditions/IAddressUnlockCondition";
import { TransactionHelper } from "../utils/transactionHelper";

/**
 * The validation result object.
 */
 export interface IValidationResult {
    /**
     * Is the subject valid.
     */
    isValid: boolean;
    /**
     * The validation failure messages, in case on invalid subject.
     */
    error?: string;
}

/**
 * Fail validation with error message.
 * @param withError The error message.
 * @throws Error with message.
 */
export function failValidation(withError: string) {
    throw new Error(withError);
}

/**
 * Validates the array is composed of distinct elements.
 * @param elements The elements.
 * @param containerName The name of the parent object to use in the error message.
 * @param elementName The name of the validation subject to use in the error message.
 * @throws Error if the validation fails.
 */
export function validateDistinct(
    elements: string[] | number[],
    containerName: string,
    elementName: string
) {
    if (elements.length > 0) {
        const distinctElements = typeof elements[0] === "string" ?
            new Set<string>(elements as string[]) :
            new Set<number>(elements as number[]);

        if (distinctElements.size !== elements.length) {
            failValidation(`${containerName} must not contain more than one ${elementName} of each type.`);
        }
    }
}

/**
 * Validates that the array of objects is in ascending order relative to the objects type.
 * @param arrayToValidate The subject to validate the ascending order for.
 * @param containerName The name of the parent object to use in the error message.
 * @param elementName The name of the validation subject to use in the error message.
 * @throws Error if the validation fails.
 */
export function validateAscendingOrder(
    arrayToValidate: ITypeBase<number>[],
    containerName: string,
    elementName: string
) {
    if (arrayToValidate.length >= 2) {
        const isAscending = arrayToValidate.slice(1).every((e, i) => e.type > arrayToValidate[i].type);

        if (!isAscending) {
            failValidation(`${containerName} ${elementName}s must be sorted in ascending order based on their ${elementName} Type.`);
        }
    }
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

/**
 * Validate the count is within allowed boundries.
 * @param count The number to validate.
 * @param min The maximum allowed value.
 * @param max The maximum allowed value.
 * @param elementName The name of the validation subject to use in the error message.
 * @throws Error if the validation fails.
 */
 export function validateCount(
    count: number,
    min: number,
    max: number,
    elementName: string
) {
    if (count < min || count > max) {
        const message = min === max ?
            `${elementName} count must be equal to ${max}.` :
            `${elementName} count must be between ${min} and ${max}.`;
        failValidation(message);
    }
}

