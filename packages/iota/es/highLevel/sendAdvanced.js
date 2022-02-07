// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable unicorn/no-nested-ternary */
import { Blake2b, Ed25519 } from "@iota/crypto.js";
import { Converter, WriteStream } from "@iota/util.js";
import { serializeInput } from "../binary/inputs/inputs";
import { serializeOutput } from "../binary/outputs/outputs";
import { MAX_TAG_LENGTH, MIN_TAG_LENGTH } from "../binary/payloads/taggedDataPayload";
import { serializeTransactionEssence } from "../binary/transactionEssence";
import { SingleNodeClient } from "../clients/singleNodeClient";
import { ED25519_ADDRESS_TYPE } from "../models/addresses/IEd25519Address";
import { TRANSACTION_ESSENCE_TYPE } from "../models/ITransactionEssence";
import { BASIC_OUTPUT_TYPE } from "../models/outputs/IBasicOutput";
import { TAGGED_DATA_PAYLOAD_TYPE } from "../models/payloads/ITaggedDataPayload";
import { TRANSACTION_PAYLOAD_TYPE } from "../models/payloads/ITransactionPayload";
import { ED25519_SIGNATURE_TYPE } from "../models/signatures/IEd25519Signature";
import { REFERENCE_UNLOCK_BLOCK_TYPE } from "../models/unlockBlocks/IReferenceUnlockBlock";
import { SIGNATURE_UNLOCK_BLOCK_TYPE } from "../models/unlockBlocks/ISignatureUnlockBlock";
import { ADDRESS_UNLOCK_CONDITION_TYPE } from "../models/unlockConditions/IAddressUnlockCondition";
/**
 * Send a transfer from the balance on the seed.
 * @param client The client or node endpoint to send the transfer with.
 * @param inputsAndSignatureKeyPairs The inputs with the signature key pairs needed to sign transfers.
 * @param outputs The outputs to send.
 * @param taggedData Optional tagged data to associate with the transaction.
 * @param taggedData.tag Optional tag.
 * @param taggedData.data Optional data.
 * @returns The id of the message created and the remainder address if one was needed.
 */
export async function sendAdvanced(client, inputsAndSignatureKeyPairs, outputs, taggedData) {
    const localClient = typeof client === "string" ? new SingleNodeClient(client) : client;
    const transactionPayload = buildTransactionPayload(inputsAndSignatureKeyPairs, outputs, taggedData);
    const message = {
        payload: transactionPayload
    };
    const messageId = await localClient.messageSubmit(message);
    return {
        messageId,
        message
    };
}
/**
 * Build a transaction payload.
 * @param inputsAndSignatureKeyPairs The inputs with the signature key pairs needed to sign transfers.
 * @param outputs The outputs to send.
 * @param taggedData Optional tagged data to associate with the transaction.
 * @param taggedData.tag Optional tag.
 * @param taggedData.data Optional index data.
 * @returns The transaction payload.
 */
export function buildTransactionPayload(inputsAndSignatureKeyPairs, outputs, taggedData) {
    if (!inputsAndSignatureKeyPairs || inputsAndSignatureKeyPairs.length === 0) {
        throw new Error("You must specify some inputs");
    }
    if (!outputs || outputs.length === 0) {
        throw new Error("You must specify some outputs");
    }
    let localTagHex;
    if (taggedData) {
        localTagHex = typeof (taggedData === null || taggedData === void 0 ? void 0 : taggedData.tag) === "string"
            ? Converter.utf8ToHex(taggedData.tag)
            : Converter.bytesToHex(taggedData.tag);
        if (localTagHex.length / 2 < MIN_TAG_LENGTH) {
            throw new Error(`The tag length is ${localTagHex.length / 2}, which is less than the minimum size of ${MIN_TAG_LENGTH}`);
        }
        if (localTagHex.length / 2 > MAX_TAG_LENGTH) {
            throw new Error(`The tag length is ${localTagHex.length / 2}, which exceeds the maximum size of ${MAX_TAG_LENGTH}`);
        }
    }
    const outputsWithSerialization = [];
    for (const output of outputs) {
        if (output.addressType === ED25519_ADDRESS_TYPE) {
            const o = {
                type: BASIC_OUTPUT_TYPE,
                amount: output.amount,
                nativeTokens: [],
                unlockConditions: [
                    {
                        type: ADDRESS_UNLOCK_CONDITION_TYPE,
                        address: {
                            type: output.addressType,
                            address: output.address
                        }
                    }
                ],
                featureBlocks: []
            };
            const writeStream = new WriteStream();
            serializeOutput(writeStream, o);
            outputsWithSerialization.push({
                output: o,
                serialized: writeStream.finalHex()
            });
        }
        else {
            throw new Error(`Unrecognized output address type ${output.addressType}`);
        }
    }
    const inputsAndSignatureKeyPairsSerialized = inputsAndSignatureKeyPairs.map(i => {
        const writeStream = new WriteStream();
        serializeInput(writeStream, i.input);
        return {
            ...i,
            serialized: writeStream.finalHex()
        };
    });
    // Lexicographically sort the inputs and outputs
    const sortedInputs = inputsAndSignatureKeyPairsSerialized.sort((a, b) => a.serialized.localeCompare(b.serialized));
    const sortedOutputs = outputsWithSerialization.sort((a, b) => a.serialized.localeCompare(b.serialized));
    const transactionEssence = {
        type: TRANSACTION_ESSENCE_TYPE,
        inputs: sortedInputs.map(i => i.input),
        inputsCommitment: "a".repeat(64),
        outputs: sortedOutputs.map(o => o.output),
        payload: localTagHex
            ? {
                type: TAGGED_DATA_PAYLOAD_TYPE,
                tag: localTagHex,
                data: (taggedData === null || taggedData === void 0 ? void 0 : taggedData.data)
                    ? typeof taggedData.data === "string"
                        ? Converter.utf8ToHex(taggedData.data)
                        : Converter.bytesToHex(taggedData.data)
                    : undefined
            }
            : undefined
    };
    const binaryEssence = new WriteStream();
    serializeTransactionEssence(binaryEssence, transactionEssence);
    const essenceFinal = binaryEssence.finalBytes();
    const essenceHash = Blake2b.sum256(essenceFinal);
    // Create the unlock blocks
    const unlockBlocks = [];
    const addressToUnlockBlock = {};
    for (const input of sortedInputs) {
        const hexInputAddressPublic = Converter.bytesToHex(input.addressKeyPair.publicKey);
        if (addressToUnlockBlock[hexInputAddressPublic]) {
            unlockBlocks.push({
                type: REFERENCE_UNLOCK_BLOCK_TYPE,
                reference: addressToUnlockBlock[hexInputAddressPublic].unlockIndex
            });
        }
        else {
            unlockBlocks.push({
                type: SIGNATURE_UNLOCK_BLOCK_TYPE,
                signature: {
                    type: ED25519_SIGNATURE_TYPE,
                    publicKey: hexInputAddressPublic,
                    signature: Converter.bytesToHex(Ed25519.sign(input.addressKeyPair.privateKey, essenceHash))
                }
            });
            addressToUnlockBlock[hexInputAddressPublic] = {
                keyPair: input.addressKeyPair,
                unlockIndex: unlockBlocks.length - 1
            };
        }
    }
    const transactionPayload = {
        type: TRANSACTION_PAYLOAD_TYPE,
        essence: transactionEssence,
        unlockBlocks
    };
    return transactionPayload;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZEFkdmFuY2VkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hpZ2hMZXZlbC9zZW5kQWR2YW5jZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsK0JBQStCO0FBQy9CLHNDQUFzQztBQUN0Qyw4Q0FBOEM7QUFDOUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDekQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzVELE9BQU8sRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDdEYsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDM0UsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDL0QsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFLM0UsT0FBTyxFQUF1Qix3QkFBd0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzlGLE9BQU8sRUFBRSxpQkFBaUIsRUFBZ0IsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNqRixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNqRixPQUFPLEVBQXVCLHdCQUF3QixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDdkcsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDaEYsT0FBTyxFQUF5QiwyQkFBMkIsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ2xILE9BQU8sRUFBeUIsMkJBQTJCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUNsSCxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxvREFB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