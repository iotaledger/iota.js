import bigInt from "big-integer";
import { UTXO_INPUT_TYPE } from "../models/inputs/IUTXOInput.mjs";
import { INPUTS_COMMITMENT_SIZE, TRANSACTION_ESSENCE_TYPE } from "../models/ITransactionEssence.mjs";
import { TAGGED_DATA_PAYLOAD_TYPE } from "../models/payloads/ITaggedDataPayload.mjs";
import { ARRAY_LENGTH, SMALL_TYPE_LENGTH, UINT32_SIZE, UINT64_SIZE } from "./commonDataTypes.mjs";
import { deserializeInputs, serializeInputs } from "./inputs/inputs.mjs";
import { deserializeOutputs, serializeOutputs } from "./outputs/outputs.mjs";
import { deserializePayload, serializePayload } from "./payloads/payloads.mjs";
/**
 * The minimum length of a transaction essence binary representation.
 */
export const MIN_TRANSACTION_ESSENCE_LENGTH = SMALL_TYPE_LENGTH + // type
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
export function deserializeTransactionEssence(readStream) {
    if (!readStream.hasRemaining(MIN_TRANSACTION_ESSENCE_LENGTH)) {
        throw new Error(`Transaction essence data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_TRANSACTION_ESSENCE_LENGTH}`);
    }
    const type = readStream.readUInt8("transactionEssence.type");
    if (type !== TRANSACTION_ESSENCE_TYPE) {
        throw new Error(`Type mismatch in transactionEssence ${type}`);
    }
    const networkId = readStream.readUInt64("message.networkId");
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
        networkId: networkId.toString(10),
        inputs: inputs,
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
export function serializeTransactionEssence(writeStream, object) {
    var _a;
    writeStream.writeUInt8("transactionEssence.type", object.type);
    writeStream.writeUInt64("message.networkId", bigInt((_a = object.networkId) !== null && _a !== void 0 ? _a : "0"));
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
