// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { AddressTypes } from "../models/addresses/addressTypes";
import type { IRent } from "../models/IRent";
import { BASIC_OUTPUT_TYPE, IBasicOutput } from "../models/outputs/IBasicOutput";
import { ADDRESS_UNLOCK_CONDITION_TYPE } from "../models/unlockConditions/IAddressUnlockCondition";
import type { IValidationResult } from "../validation/result";
import { TransactionHelper } from "./transactionHelper";

/**
 * Class to help with validation.
 */
export class ValidationHelper {

    /**
     * Validate that the values in Set are unique.
     * @param elements The elements.
     * @param targetSize The number of decimal places to display.
     * @param containerName The name of the object containing the elements.
     * @param elementName The element in the contaier.
     * @returns The validation result.
     */
    public static validateDistinct(
        elements: Set<string> | Set<number>,
        targetSize: number,
        containerName: string,
        elementName: string
        ): IValidationResult {
        let result: IValidationResult = { isValid: true };

        if (elements.size !== targetSize) {
            result = {
                isValid: false,
                errors: [`${containerName} must not contain more than one ${elementName} of each type.`]
            };
        }

        return result;
    }


    /**
     * Calculates the minimum required storage deposit of an output.
     * @param address The address to calculate min storage deposit.
     * @param rentStructure Rent cost of objects which take node resources.
     * @returns The required storage deposit.
     */
    public static getMinStorageDeposit(address: AddressTypes, rentStructure: IRent): number {
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
}
