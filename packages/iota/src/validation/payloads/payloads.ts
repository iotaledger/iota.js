// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { HexHelper } from "@iota/util.js";
import { MAX_TAG_LENGTH } from "../../binary/payloads/taggedDataPayload";
import type { INodeInfoProtocol } from "../../models/info/INodeInfoProtocol";
import type { ITypeBase } from "../../models/ITypeBase";
import { MILESTONE_PAYLOAD_TYPE } from "../../models/payloads/IMilestonePayload";
import { ITaggedDataPayload, TAGGED_DATA_PAYLOAD_TYPE } from "../../models/payloads/ITaggedDataPayload";
import { ITransactionPayload, TRANSACTION_PAYLOAD_TYPE } from "../../models/payloads/ITransactionPayload";
import { TREASURY_TRANSACTION_PAYLOAD_TYPE } from "../../models/payloads/ITreasuryTransactionPayload";
import type { PayloadTypes } from "../../models/payloads/payloadTypes";
import { MAX_METADATA_LENGTH } from "../../validation/features/features";
import { validateTransactionEssence } from "../transactionEssence";
import { validateUnlocks } from "../unlocks/unlocks";
import { failValidation } from "../validationUtils";

/**
 * Validate any payload entrypoint.
 * @param payload The payload to validate.
 * @param protocolInfo The Protocol Info.
 * @throws Error if the validation fails.
 */
export function validatePayload(
    payload: PayloadTypes | undefined,
    protocolInfo: INodeInfoProtocol
) {
    if (!payload) {
        // Nothing to validate
    } else {
        switch (payload.type) {
            case TRANSACTION_PAYLOAD_TYPE:
                validateTransactionPayload(payload, protocolInfo);
                break;
            case MILESTONE_PAYLOAD_TYPE:
                // Unimplemented
                break;
            case TREASURY_TRANSACTION_PAYLOAD_TYPE:
                // Unimplemented
                break;
            case TAGGED_DATA_PAYLOAD_TYPE:
                validateTaggedDataPayload(payload);
                break;
            default:
                failValidation(`Unrecognized transaction type ${(payload as ITypeBase<number>).type}`);
        }
    }
}

/**
 * Validate a transaction payload.
 * @param transactionPayload The transaction payload to validate.
 * @param protocolInfo The Protocol Info.
 * @throws Error if the validation fails.
 */
export function validateTransactionPayload(
    transactionPayload: ITransactionPayload, protocolInfo: INodeInfoProtocol
) {
    if (transactionPayload.type === TRANSACTION_PAYLOAD_TYPE) {
        const unlocksCount = transactionPayload.unlocks.length;
        const inputsCount = transactionPayload.essence.inputs.length;

        if (unlocksCount !== inputsCount) {
            failValidation("Transaction payload unlocks count must match inputs count of the Transaction Essence.");
        }
        validateTransactionEssence(transactionPayload.essence, protocolInfo);
        validateUnlocks(transactionPayload.unlocks);
    } else {
        failValidation(`Unrecognized transaction type ${transactionPayload.type}`);
    }
}

/**
 * Validate a tagged data payload.
 * @param taggedDataPayload The tagged data payload to validate.
 * @throws Error if the validation fails.
 */
export function validateTaggedDataPayload(
    taggedDataPayload: ITaggedDataPayload
) {
    const data = taggedDataPayload.data ? HexHelper.stripPrefix(taggedDataPayload?.data) : undefined;
    if (data && data.length / 2 > MAX_METADATA_LENGTH) {
        failValidation(`Tagged Data Payload data length exceeds the maximum size of ${2 * MAX_METADATA_LENGTH}.`);
    }

    const tag = taggedDataPayload.tag ? HexHelper.stripPrefix(taggedDataPayload?.tag) : undefined;
    if (tag && tag.length / 2 > MAX_TAG_LENGTH) {
        failValidation(`Tagged Data Payload tag length exceeds the maximum size of ${2 * MAX_TAG_LENGTH}.`);
    }
}
