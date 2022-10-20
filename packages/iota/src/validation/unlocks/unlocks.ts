// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { UnlockTypes } from "../../models/unlocks/unlockTypes";
import type { IValidationResult } from "../result";

/**
 * Validate unlocks.
 * @param object The object to validate.
 * @returns The validation result.
 */
export function validateUnlocks(object: UnlockTypes[]): IValidationResult {
    return { isValid: true };
}
