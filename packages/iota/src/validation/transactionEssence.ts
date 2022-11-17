// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { INodeInfoProtocol } from "../models/info/INodeInfoProtocol";
import { ITransactionEssence, TRANSACTION_ESSENCE_TYPE } from "../models/ITransactionEssence";
import { ITaggedDataPayload, TAGGED_DATA_PAYLOAD_TYPE } from "../models/payloads/ITaggedDataPayload";
import { TransactionHelper } from "../utils/transactionHelper";
import { validateInputs } from "./inputs/inputs";
import { validateOutputs } from "./outputs/outputs";
import { validateTaggedDataPayload } from "./payloads/payloads";
import { failValidation } from "./result";

/**
 * Validate a transaction essence.
 * @param transactionEssence The Transaction Essence to validate.
 * @param protocolInfo The Protocol Info.
 * @throws Error if the validation fails.
 */
export function validateTransactionEssence(
    transactionEssence: ITransactionEssence,
    protocolInfo: INodeInfoProtocol
) {

    if (transactionEssence.type !== TRANSACTION_ESSENCE_TYPE) {
        failValidation(`Transaction Essence Type value must be ${TRANSACTION_ESSENCE_TYPE}.`);
    }

    if (transactionEssence.networkId !== TransactionHelper.networkIdFromNetworkName(protocolInfo.networkName)) {
        failValidation("Network ID must match the value of the current network.");
    }

    validateInputs(transactionEssence.inputs);
    validateOutputs(transactionEssence.outputs, protocolInfo);

    if (transactionEssence.payload) {
        validateTxEssencePayload(transactionEssence.payload);
    }
}

/**
 * Validate transaction essence payload.
 * @param payload The tagged data payload.
 * @throws Error if the validation fails.
 */
export function validateTxEssencePayload(payload: ITaggedDataPayload) {
    if (payload.type !== TAGGED_DATA_PAYLOAD_TYPE) {
        failValidation("Transaction Essence payload type must be Tagged data payload type.");
    }

    validateTaggedDataPayload(payload);
}

