// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { IBlock } from "../models/IBlock";
import type { INodeInfoProtocol } from "../models/info/INodeInfoProtocol";
import { validatePayload } from "./payloads/payloads";
import type { IValidationResult } from "./result";

/**
 * Validates a block.
 * @param block The block to validate.
 * @param protocolInfo The Protocol Info.
 * @returns The validation result.
 */
export function validateBlock(block: IBlock, protocolInfo: INodeInfoProtocol): IValidationResult {
    return validatePayload(block.payload, protocolInfo);
}

