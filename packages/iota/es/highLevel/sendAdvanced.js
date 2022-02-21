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
    const protocolInfo = await localClient.protocolInfo();
    transactionPayload.essence.networkId = protocolInfo.networkId;
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
                            pubKeyHash: output.address
                        }
                    }
                ],
                featureBlocks: []
            };
            const writeStream = new WriteStream();
            serializeOutput(writeStream, o);
            const finalBytes = writeStream.finalBytes();
            outputsWithSerialization.push({
                output: o,
                serializedBytes: finalBytes,
                serializedHex: Converter.bytesToHex(finalBytes)
            });
        }
        else {
            throw new Error(`Unrecognized output address type ${output.addressType}`);
        }
    }
    const inputsAndSignatureKeyPairsSerialized = inputsAndSignatureKeyPairs.map(i => {
        const writeStream = new WriteStream();
        serializeInput(writeStream, i.input);
        const finalBytes = writeStream.finalBytes();
        return {
            ...i,
            serializedBytes: finalBytes,
            serializedHex: Converter.bytesToHex(finalBytes)
        };
    });
    // Lexicographically sort the inputs and outputs
    const sortedInputs = inputsAndSignatureKeyPairsSerialized.sort((a, b) => a.serializedHex.localeCompare(b.serializedHex));
    const sortedOutputs = outputsWithSerialization.sort((a, b) => a.serializedHex.localeCompare(b.serializedHex));
    const inputsCommitmentHasher = new Blake2b(Blake2b.SIZE_256);
    for (const input of sortedInputs) {
        inputsCommitmentHasher.update(input.serializedBytes);
    }
    const inputsCommitment = Converter.bytesToHex(inputsCommitmentHasher.final());
    const transactionEssence = {
        type: TRANSACTION_ESSENCE_TYPE,
        inputs: sortedInputs.map(i => i.input),
        inputsCommitment,
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