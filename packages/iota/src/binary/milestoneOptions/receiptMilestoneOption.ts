// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-mixed-operators */
import type { ReadStream, WriteStream } from "@iota/util.js";
import { IReceiptMilestoneOption, RECEIPT_MILESTONE_OPTION_TYPE } from "../../models/milestoneOptions/IReceiptMilestoneOption";
import { TREASURY_TRANSACTION_PAYLOAD_TYPE } from "../../models/payloads/ITreasuryTransactionPayload";
import { SMALL_TYPE_LENGTH, UINT16_SIZE, UINT32_SIZE } from "../commonDataTypes";
import { deserializeFunds, MIN_MIGRATED_FUNDS_LENGTH, serializeFunds } from "../funds";
import { deserializePayload, serializePayload } from "../payloads/payloads";

/**
 * The minimum length of a receipt milestone option binary representation.
 */
export const MIN_RECEIPT_MILESTONE_OPTION_LENGTH: number =
    SMALL_TYPE_LENGTH +
    UINT32_SIZE + // migratedAt
    UINT16_SIZE + // numFunds
    MIN_MIGRATED_FUNDS_LENGTH; // 1 Fund

/**
 * Deserialize the receipt milestone option from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeReceiptMilestoneOption(readStream: ReadStream): IReceiptMilestoneOption {
    if (!readStream.hasRemaining(MIN_RECEIPT_MILESTONE_OPTION_LENGTH)) {
        throw new Error(
            `Receipt Milestone Option data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_RECEIPT_MILESTONE_OPTION_LENGTH}`
        );
    }

    const type = readStream.readUInt8("receiptMilestoneOption.type");
    if (type !== RECEIPT_MILESTONE_OPTION_TYPE) {
        throw new Error(`Type mismatch in receiptMilestoneOption ${type}`);
    }
    const migratedAt = readStream.readUInt32("receiptMilestoneOption.migratedAt");
    const final = readStream.readBoolean("receiptMilestoneOption.final");

    const funds = deserializeFunds(readStream);
    const treasuryTransactionPayload = deserializePayload(readStream);
    if (treasuryTransactionPayload?.type !== TREASURY_TRANSACTION_PAYLOAD_TYPE) {
        throw new Error(`receiptMilestoneOption can only contain treasury payloads ${type}`);
    }

    return {
        type: RECEIPT_MILESTONE_OPTION_TYPE,
        migratedAt,
        final,
        funds,
        transaction: treasuryTransactionPayload
    };
}

/**
 * Serialize the receipt milestone option to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeReceiptMilestoneOption(writeStream: WriteStream, object: IReceiptMilestoneOption): void {
    writeStream.writeUInt8("receiptMilestoneOption.type", object.type);
    writeStream.writeUInt32("receiptMilestoneOption.migratedAt", object.migratedAt);
    writeStream.writeBoolean("receiptMilestoneOption.final", object.final);

    serializeFunds(writeStream, object.funds);
    serializePayload(writeStream, object.transaction);
}
