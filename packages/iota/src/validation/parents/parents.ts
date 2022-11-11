// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { HexEncodedString } from "../../models/hexEncodedTypes";
import { IValidationResult, failValidation, mergeValidationResults } from "../result";

/**
 * The minimum count of parents in block.
 */
export const MIN_PARENTS_COUNT: number = 1;
/**
 * The maximum count of parents in block.
 */
export const MAX_PARENTS_COUNT: number = 8;

/**
 * Validate parent ids.
 * @param parents The parentIds to validate.
 * @returns The validation result.
 */
export function validateParents(
    parents: HexEncodedString[]
): IValidationResult {
    let countResult: IValidationResult = { isValid: true };
    let sortedResult: IValidationResult = { isValid: true };

    if (parents.length < MIN_PARENTS_COUNT || parents.length > MAX_PARENTS_COUNT) {
        countResult = failValidation(countResult, `Parents count must be between ${MIN_PARENTS_COUNT} and ${MAX_PARENTS_COUNT}.`);
    }

    const sortedParentIds = parents.slice().sort((a, b) => a.localeCompare(b));
    if (parents.toString() !== sortedParentIds.toString()) {
        sortedResult = failValidation(sortedResult, "Parents must be lexicographically sorted based on Parent id.");
    }

    return mergeValidationResults(countResult, sortedResult);
}
