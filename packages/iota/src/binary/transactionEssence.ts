// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-mixed-operators */
import { HexHelper, ReadStream, WriteStream } from "@iota/util.js";
import { IUTXOInput, UTXO_INPUT_TYPE } from "../models/inputs/IUTXOInput";
import { INPUTS_COMMITMENT_SIZE, ITransactionEssence, TRANSACTION_ESSENCE_TYPE } from "../models/ITransactionEssence";
import { TAGGED_DATA_PAYLOAD_TYPE } from "../models/payloads/ITaggedDataPayload";
import { ARRAY_LENGTH, SMALL_TYPE_LENGTH, UINT32_SIZE, UINT64_SIZE } from "./commonDataTypes";
import { deserializeInputs, serializeInputs } from "./inputs/inputs";
import { deserializeOutputs, serializeOutputs } from "./outputs/outputs";
import { deserializePayload, serializePayload } from "./payloads/payloads";

/**
 * The minimum length of a transaction essence binary representation.
 */
export const MIN_TRANSACTION_ESSENCE_LENGTH: number =
    SMALL_TYPE_LENGTH + // type
    UINT64_SIZE + // network id
    ARRAY_LENGTH + // input count
    INPUTS_COMMITMENT_SIZE + // input commitments
    ARRAY_LENGTH + // output count
    UINT32_SIZE; // payload type

/**
 * Deserialize the transaction essence from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeTransactionEssence(readStream: ReadStream): ITransactionEssence {
    if (!readStream.hasRemaining(MIN_TRANSACTION_ESSENCE_LENGTH)) {
        throw new Error(
            `Transaction essence data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_TRANSACTION_ESSENCE_LENGTH}`
        );
    }

    const type = readStream.readUInt8("transactionEssence.type");
    if (type !== TRANSACTION_ESSENCE_TYPE) {
        throw new Error(`Type mismatch in transactionEssence ${type}`);
    }

    const networkId = readStream.readUInt64("transactionEssence.networkId");

    const inputs = deserializeInputs(readStream);
    const inputsCommitment = readStream.readFixedHex("transactionEssence.inputsCommitment", INPUTS_COMMITMENT_SIZE);
    const outputs = deserializeOutputs(readStream);

    const payload = deserializePayload(readStream);
    if (payload && payload.type !== TAGGED_DATA_PAYLOAD_TYPE) {
        throw new Error("Transaction essence can only contain embedded Tagged Data Payload");
    }

    for (const input of inputs) {
        if (input.type !== UTXO_INPUT_TYPE) {
            throw new Error("Transaction essence can only contain UTXO Inputs");
        }
    }

    return {
        type: TRANSACTION_ESSENCE_TYPE,
        networkId: HexHelper.fromBigInt(networkId),
        inputs: inputs as IUTXOInput[],
        inputsCommitment,
        outputs,
        payload
    };
}

/**
 * Serialize the transaction essence to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeTransactionEssence(writeStream: WriteStream, object: ITransactionEssence): void {
    writeStream.writeUInt8("transactionEssence.type", object.type);

    writeStream.writeUInt64("transactionEssence.networkId", HexHelper.toBigInt(object.networkId ?? "0x00"));

    for (const input of object.inputs) {
        if (input.type !== UTXO_INPUT_TYPE) {
            throw new Error("Transaction essence can only contain UTXO Inputs");
        }
    }

    serializeInputs(writeStream, object.inputs);
    writeStream.writeFixedHex("transactionEssence.inputsCommitment", INPUTS_COMMITMENT_SIZE, object.inputsCommitment);

    serializeOutputs(writeStream, object.outputs);
    serializePayload(writeStream, object.payload);
}
