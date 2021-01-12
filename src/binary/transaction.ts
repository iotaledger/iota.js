// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { IIndexationPayload, INDEXATION_PAYLOAD_TYPE } from "../models/IIndexationPayload";
import { ITransactionEssence, TRANSACTION_ESSENCE_TYPE } from "../models/ITransactionEssence";
import { ReadStream } from "../utils/readStream";
import { WriteStream } from "../utils/writeStream";
import { ARRAY_LENGTH, SMALL_TYPE_LENGTH, UINT32_SIZE } from "./common";
import { deserializeInputs, serializeInputs } from "./input";
import { deserializeOutputs, serializeOutputs } from "./output";
import { deserializePayload, serializePayload } from "./payload";

/**
 * The minimum length of a transaction essence binary representation.
 */
export const MIN_TRANSACTION_ESSENCE_LENGTH: number = SMALL_TYPE_LENGTH + (2 * ARRAY_LENGTH) + UINT32_SIZE;

/**
 * Deserialize the transaction essence from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeTransactionEssence(readStream: ReadStream): ITransactionEssence {
    if (!readStream.hasRemaining(MIN_TRANSACTION_ESSENCE_LENGTH)) {
        throw new Error(`Transaction essence data is ${readStream.length()
            } in length which is less than the minimimum size required of ${MIN_TRANSACTION_ESSENCE_LENGTH}`);
    }

    const type = readStream.readByte("transactionEssence.type");
    if (type !== TRANSACTION_ESSENCE_TYPE) {
        throw new Error(`Type mismatch in transactionEssence ${type}`);
    }

    const inputs = deserializeInputs(readStream);
    const outputs = deserializeOutputs(readStream);

    const payload = deserializePayload(readStream);
    if (payload && payload.type !== INDEXATION_PAYLOAD_TYPE) {
        throw new Error("Transaction essence can only contain embedded Indexation Payload");
    }

    return {
        type: TRANSACTION_ESSENCE_TYPE,
        inputs,
        outputs,
        payload: payload as IIndexationPayload
    };
}

/**
 * Serialize the transaction essence to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeTransactionEssence(writeStream: WriteStream,
    object: ITransactionEssence): void {
    writeStream.writeByte("transactionEssence.type", object.type);
    serializeInputs(writeStream, object.inputs);
    serializeOutputs(writeStream, object.outputs);
    serializePayload(writeStream, object.payload);
}
