// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { FeatureTypes } from "../../models/features/featureTypes";
import type { IValidationResult } from "../result";

/**
 * Validate output features.
 * @param object The object to validate.
 * @returns The validation result.
 */
export function validateFeatures(object: FeatureTypes[] | undefined): IValidationResult {
    // unimplemented
    return { isValid: true };
}

