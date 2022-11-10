// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { IBlock } from "../models/IBlock";
import type { INodeInfoProtocol } from "../models/info/INodeInfoProtocol";
import { validatePayload } from "./payloads/payloads";
import { validateParents } from "./parents/parents";
import { IValidationResult, mergeValidationResults } from "./result";

/**
 * Validates a block.
 * @param block The block to validate.
 * @param protocolInfo The Protocol Info.
 * @returns The validation result.
 */
export function validateBlock(block: IBlock, protocolInfo: INodeInfoProtocol): IValidationResult {
    let payloadResult: IValidationResult = { isValid: true };
    let parentsResult: IValidationResult = { isValid: true };

    payloadResult = validatePayload(block.payload, protocolInfo);
    parentsResult = validateParents(block.parents);

    return mergeValidationResults(payloadResult, parentsResult);
}

