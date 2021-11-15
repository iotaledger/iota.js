// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-mixed-operators */
import type { ReadStream, WriteStream } from "@iota/util.js";
import { IUTXOInput, UTXO_INPUT_TYPE } from "../models/inputs/IUTXOInput";
import { ITransactionEssence, TRANSACTION_ESSENCE_TYPE } from "../models/ITransactionEssence";
import { SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE } from "../models/outputs/ISigLockedDustAllowanceOutput";
import { SIMPLE_OUTPUT_TYPE } from "../models/outputs/ISimpleOutput";
import { INDEXATION_PAYLOAD_TYPE } from "../models/payloads/IIndexationPayload";
import { ARRAY_LENGTH, SMALL_TYPE_LENGTH, UINT32_SIZE } from "./commonDataTypes";
import { deserializeInputs, serializeInputs } from "./inputs/inputs";
import { deserializeOutputs, serializeOutputs } from "./outputs/outputs";
import { deserializePayload, serializePayload } from "./payloads/payloads";

/**
 * The minimum length of a transaction essence binary representation.
 */
export const MIN_TRANSACTION_ESSENCE_LENGTH: number = SMALL_TYPE_LENGTH + 2 * ARRAY_LENGTH + UINT32_SIZE;

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

    const inputs = deserializeInputs(readStream);
    const outputs = deserializeOutputs(readStream);

    const payload = deserializePayload(readStream);
    if (payload && payload.type !== INDEXATION_PAYLOAD_TYPE) {
        throw new Error("Transaction essence can only contain embedded Indexation Payload");
    }

    for (const input of inputs) {
        if (input.type !== UTXO_INPUT_TYPE) {
            throw new Error("Transaction essence can only contain UTXO Inputs");
        }
    }

    for (const output of outputs) {
        if (output.type !== SIMPLE_OUTPUT_TYPE) {
            throw new Error("Transaction essence can only contain simple outputs");
        }
    }

    return {
        type: TRANSACTION_ESSENCE_TYPE,
        inputs: inputs as IUTXOInput[],
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

    for (const input of object.inputs) {
        if (input.type !== UTXO_INPUT_TYPE) {
            throw new Error("Transaction essence can only contain UTXO Inputs");
        }
    }

    serializeInputs(writeStream, object.inputs);

    for (const output of object.outputs) {
        if (output.type !== SIMPLE_OUTPUT_TYPE && output.type !== SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE) {
            throw new Error(
                "Transaction essence can only contain sig locked single input or sig locked dust allowance outputs"
            );
        }
    }

    serializeOutputs(writeStream, object.outputs);
    serializePayload(writeStream, object.payload);
}
