// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { IBlock } from "../models/IBlock";
import { validatePayload } from "./payloads/payloads";
import type { IValidationResult } from "./result";

/**
 * Validates a block.
 * @param object The object to validate.
 * @returns The validation result.
 */
export function validateBlock(object: IBlock): IValidationResult {
    return validatePayload(object.payload);
}
