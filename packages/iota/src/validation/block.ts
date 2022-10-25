// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { IBlock } from "../models/IBlock";
import type { INodeInfoProtocol } from "../models/info/INodeInfoProtocol";
import { validatePayload } from "./payloads/payloads";
import type { IValidationResult } from "./result";

/**
 * Validates a block.
 * @param object The object to validate.
 * @param protocolInfo The Protocol Info.
 * @returns The validation result.
 */
export function validateBlock(object: IBlock, protocolInfo: INodeInfoProtocol): IValidationResult {
    return validatePayload(object.payload, protocolInfo);
}
