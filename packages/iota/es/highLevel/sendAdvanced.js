// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable unicorn/no-nested-ternary */
import { Blake2b, Ed25519 } from "@iota/crypto.js";
import { Converter, WriteStream } from "@iota/util.js";
import { serializeInput } from "../binary/inputs/inputs";
import { serializeOutput } from "../binary/outputs/outputs";
import { MAX_INDEXATION_KEY_LENGTH, MIN_INDEXATION_KEY_LENGTH } from "../binary/payloads/indexationPayload";
import { serializeTransactionEssence } from "../binary/transactionEssence";
import { SingleNodeClient } from "../clients/singleNodeClient";
import { ED25519_ADDRESS_TYPE } from "../models/addresses/IEd25519Address";
import { TRANSACTION_ESSENCE_TYPE } from "../models/ITransactionEssence";
import { SIMPLE_OUTPUT_TYPE } from "../models/outputs/ISimpleOutput";
import { INDEXATION_PAYLOAD_TYPE } from "../models/payloads/IIndexationPayload";
import { TRANSACTION_PAYLOAD_TYPE } from "../models/payloads/ITransactionPayload";
import { ED25519_SIGNATURE_TYPE } from "../models/signatures/IEd25519Signature";
import { REFERENCE_UNLOCK_BLOCK_TYPE } from "../models/unlockBlocks/IReferenceUnlockBlock";
import { SIGNATURE_UNLOCK_BLOCK_TYPE } from "../models/unlockBlocks/ISignatureUnlockBlock";
/**
 * Send a transfer from the balance on the seed.
 * @param client The client or node endpoint to send the transfer with.
 * @param inputsAndSignatureKeyPairs The inputs with the signature key pairs needed to sign transfers.
 * @param outputs The outputs to send.
 * @param indexation Optional indexation data to associate with the transaction.
 * @param indexation.key Indexation key.
 * @param indexation.data Optional index data.
 * @returns The id of the message created and the remainder address if one was needed.
 */
export async function sendAdvanced(client, inputsAndSignatureKeyPairs, outputs, indexation) {
    const localClient = typeof client === "string" ? new SingleNodeClient(client) : client;
    const transactionPayload = buildTransactionPayload(inputsAndSignatureKeyPairs, outputs, indexation);
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
 * @param indexation Optional indexation data to associate with the transaction.
 * @param indexation.key Indexation key.
 * @param indexation.data Optional index data.
 * @returns The transaction payload.
 */
export function buildTransactionPayload(inputsAndSignatureKeyPairs, outputs, indexation) {
    if (!inputsAndSignatureKeyPairs || inputsAndSignatureKeyPairs.length === 0) {
        throw new Error("You must specify some inputs");
    }
    if (!outputs || outputs.length === 0) {
        throw new Error("You must specify some outputs");
    }
    let localIndexationKeyHex;
    if (indexation === null || indexation === void 0 ? void 0 : indexation.key) {
        localIndexationKeyHex =
            typeof indexation.key === "string"
                ? Converter.utf8ToHex(indexation.key)
                : Converter.bytesToHex(indexation.key);
        if (localIndexationKeyHex.length / 2 < MIN_INDEXATION_KEY_LENGTH) {
            throw new Error(`The indexation key length is ${localIndexationKeyHex.length / 2}, which is below the minimum size of ${MIN_INDEXATION_KEY_LENGTH}`);
        }
        if (localIndexationKeyHex.length / 2 > MAX_INDEXATION_KEY_LENGTH) {
            throw new Error(`The indexation key length is ${localIndexationKeyHex.length / 2}, which exceeds the maximum size of ${MAX_INDEXATION_KEY_LENGTH}`);
        }
    }
    const outputsWithSerialization = [];
    for (const output of outputs) {
        if (output.addressType === ED25519_ADDRESS_TYPE) {
            const o = {
                type: SIMPLE_OUTPUT_TYPE,
                address: {
                    type: output.addressType,
                    address: output.address
                },
                amount: output.amount
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
        outputs: sortedOutputs.map(o => o.output),
        payload: localIndexationKeyHex
            ? {
                type: INDEXATION_PAYLOAD_TYPE,
                index: localIndexationKeyHex,
                data: (indexation === null || indexation === void 0 ? void 0 : indexation.data)
                    ? typeof indexation.data === "string"
                        ? Converter.utf8ToHex(indexation.data)
                        : Converter.bytesToHex(indexation.data)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZEFkdmFuY2VkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hpZ2hMZXZlbC9zZW5kQWR2YW5jZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsK0JBQStCO0FBQy9CLHNDQUFzQztBQUN0Qyw4Q0FBOEM7QUFDOUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDekQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzVELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQzVHLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzNFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBSzNFLE9BQU8sRUFBdUIsd0JBQXdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM5RixPQUFPLEVBQWlCLGtCQUFrQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDcEYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDaEYsT0FBTyxFQUF1Qix3QkFBd0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ3ZHLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2hGLE9BQU8sRUFBeUIsMkJBQTJCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUNsSCxPQUFPLEVBQXlCLDJCQUEyQixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFFbEg7Ozs7Ozs7OztHQVNHO0FBQ0gsTUFBTSxDQUFD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