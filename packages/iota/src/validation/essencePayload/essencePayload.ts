// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { ITaggedDataPayload, TAGGED_DATA_PAYLOAD_TYPE } from "../../models/payloads/ITaggedDataPayload";
import { validateTaggedDataPayload } from "../payloads/payloads";
import { IValidationResult, failValidation } from "../result";

/**
 * Validate transaction essence payload.
 * @param payload The tagged data payload.
 * @returns The validation result.
 */
export function validateEssencePayload(payload: ITaggedDataPayload): IValidationResult {
    let result: IValidationResult = { isValid: true };

    result = payload.type !== TAGGED_DATA_PAYLOAD_TYPE ?
        failValidation(result, "Transaction Essence payload type must be Tagged data payload type.") :
        validateTaggedDataPayload(payload);

    return result;
}
