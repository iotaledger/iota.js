// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { TransactionHelper } from "@iota/iota.js";
import type { INodeInfoProtocol } from "../models/info/INodeInfoProtocol";
import { ITransactionEssence, TRANSACTION_ESSENCE_TYPE } from "../models/ITransactionEssence";
import { ITaggedDataPayload, TAGGED_DATA_PAYLOAD_TYPE } from "../models/payloads/ITaggedDataPayload";
import { validateInputs } from "./inputs/inputs";
import { validateOutputs } from "./outputs/outputs";
import { validateTaggedDataPayload } from "./payloads/payloads";
import { failValidation, IValidationResult, mergeValidationResults } from "./result";

/**
 * Validate a transaction essence.
 * @param transactionEssence The Transaction Essence to validate.
 * @param protocolInfo The Protocol Info.
 * @returns The validation result.
 */
export function validateTransactionEssence(transactionEssence: ITransactionEssence, protocolInfo: INodeInfoProtocol
): IValidationResult {
    const results: IValidationResult[] = [];

    if (transactionEssence.type !== TRANSACTION_ESSENCE_TYPE) {
        results.push({
            isValid: false,
            errors: [`Transaction Essence Type value must be ${TRANSACTION_ESSENCE_TYPE}.`]
        });
    }

    if (transactionEssence.networkId !== TransactionHelper.networkIdFromNetworkName(protocolInfo.networkName)) {
        results.push({
            isValid: false,
            errors: ["Network ID must match the value of the current network."]
        });
    }

    results.push(validateInputs(transactionEssence.inputs));
    results.push(validateOutputs(transactionEssence.outputs, protocolInfo));

    if (transactionEssence.payload) {
        results.push(validateTxEsencePayload(transactionEssence.payload));
    }

    return mergeValidationResults(...results);
}

/**
 * Validate transaction essence payload.
 * @param payload The tagged data payload.
 * @returns The validation result.
 */
export function validateTxEsencePayload(payload: ITaggedDataPayload): IValidationResult {
    let result: IValidationResult = { isValid: true };

    result = payload.type !== TAGGED_DATA_PAYLOAD_TYPE ?
        failValidation(result, "Transaction Essence payload type must be Tagged data payload type.") :
        validateTaggedDataPayload(payload);

    return result;
}
