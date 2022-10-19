// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { UnlockConditionTypes } from "../../models/unlockConditions/unlockConditionTypes";
import type { IValidationResult } from "../result";

/**
 * Validate output unlock conditions.
 * @param object The object to validate.
 * @returns The validation result.
 */
export function validateUnlockConditions(object: UnlockConditionTypes[]): IValidationResult {
    // unimplemented
    return { isValid: true };
}

