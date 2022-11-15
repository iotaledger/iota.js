// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { HexEncodedString } from "../models/hexEncodedTypes";
import type { IBlock } from "../models/IBlock";
import type { INodeInfoProtocol } from "../models/info/INodeInfoProtocol";
import { validatePayload } from "./payloads/payloads";
import { IValidationResult, mergeValidationResults } from "./result";

/**
 * The minimum count of parents in block.
 */
export const MIN_PARENTS_COUNT: number = 1;
/**
 * The maximum count of parents in block.
 */
export const MAX_PARENTS_COUNT: number = 8;

/**
 * Validates a block.
 * @param block The block to validate.
 * @param protocolInfo The Protocol Info.
 * @returns The validation result.
 */
export function validateBlock(block: IBlock, protocolInfo: INodeInfoProtocol): IValidationResult {
    const results: IValidationResult[] = [];

    results.push(validatePayload(block.payload, protocolInfo));
    results.push(validateParents(block.parents));

    return mergeValidationResults(...results);
}

/**
 * Validate parent ids.
 * @param parents The parentIds to validate.
 * @returns The validation result.
 */
export function validateParents(
    parents: HexEncodedString[]
): IValidationResult {
    const results: IValidationResult[] = [];

    if (parents.length < MIN_PARENTS_COUNT || parents.length > MAX_PARENTS_COUNT) {
        results.push({
            isValid: false,
            errors: [`Parents count must be between ${MIN_PARENTS_COUNT} and ${MAX_PARENTS_COUNT}.`]
        });
    }

    const sortedParentIds = parents.slice().sort((a, b) => a.localeCompare(b));
    if (parents.toString() !== sortedParentIds.toString()) {
        results.push({
            isValid: false,
            errors: ["Parents must be lexicographically sorted based on Parent id."]
        });
    }

    return mergeValidationResults(...results);
}

