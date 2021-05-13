"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildTransactionPayload = exports.sendAdvanced = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
const input_1 = require("../binary/input");
const output_1 = require("../binary/output");
const payload_1 = require("../binary/payload");
const transaction_1 = require("../binary/transaction");
const singleNodeClient_1 = require("../clients/singleNodeClient");
const blake2b_1 = require("../crypto/blake2b");
const ed25519_1 = require("../crypto/ed25519");
const IEd25519Address_1 = require("../models/IEd25519Address");
const IEd25519Signature_1 = require("../models/IEd25519Signature");
const IIndexationPayload_1 = require("../models/IIndexationPayload");
const IReferenceUnlockBlock_1 = require("../models/IReferenceUnlockBlock");
const ISigLockedDustAllowanceOutput_1 = require("../models/ISigLockedDustAllowanceOutput");
const ISigLockedSingleOutput_1 = require("../models/ISigLockedSingleOutput");
const ISignatureUnlockBlock_1 = require("../models/ISignatureUnlockBlock");
const ITransactionEssence_1 = require("../models/ITransactionEssence");
const ITransactionPayload_1 = require("../models/ITransactionPayload");
const converter_1 = require("../utils/converter");
const writeStream_1 = require("../utils/writeStream");
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
function sendAdvanced(client, inputsAndSignatureKeyPairs, outputs, indexation) {
    return __awaiter(this, void 0, void 0, function* () {
        const localClient = typeof client === "string" ? new singleNodeClient_1.SingleNodeClient(client) : client;
        const transactionPayload = buildTransactionPayload(inputsAndSignatureKeyPairs, outputs, indexation);
        const message = {
            payload: transactionPayload
        };
        const messageId = yield localClient.messageSubmit(message);
        return {
            messageId,
            message
        };
    });
}
exports.sendAdvanced = sendAdvanced;
/**
 * Build a transaction payload.
 * @param inputsAndSignatureKeyPairs The inputs with the signature key pairs needed to sign transfers.
 * @param outputs The outputs to send.
 * @param indexation Optional indexation data to associate with the transaction.
 * @param indexation.key Indexation key.
 * @param indexation.data Optional index data.
 * @returns The transaction payload.
 */
function buildTransactionPayload(inputsAndSignatureKeyPairs, outputs, indexation) {
    if (!inputsAndSignatureKeyPairs || inputsAndSignatureKeyPairs.length === 0) {
        throw new Error("You must specify some inputs");
    }
    if (!outputs || outputs.length === 0) {
        throw new Error("You must specify some outputs");
    }
    let localIndexationKeyHex;
    if (indexation === null || indexation === void 0 ? void 0 : indexation.key) {
        localIndexationKeyHex = typeof (indexation.key) === "string"
            ? converter_1.Converter.utf8ToHex(indexation.key) : converter_1.Converter.bytesToHex(indexation.key);
        if (localIndexationKeyHex.length / 2 < payload_1.MIN_INDEXATION_KEY_LENGTH) {
            throw new Error(`The indexation key length is ${localIndexationKeyHex.length / 2}, which is below the minimum size of ${payload_1.MIN_INDEXATION_KEY_LENGTH}`);
        }
        if (localIndexationKeyHex.length / 2 > payload_1.MAX_INDEXATION_KEY_LENGTH) {
            throw new Error(`The indexation key length is ${localIndexationKeyHex.length / 2}, which exceeds the maximum size of ${payload_1.MAX_INDEXATION_KEY_LENGTH}`);
        }
    }
    const outputsWithSerialization = [];
    for (const output of outputs) {
        if (output.addressType === IEd25519Address_1.ED25519_ADDRESS_TYPE) {
            const o = {
                type: output.isDustAllowance ? ISigLockedDustAllowanceOutput_1.SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE : ISigLockedSingleOutput_1.SIG_LOCKED_SINGLE_OUTPUT_TYPE,
                address: {
                    type: output.addressType,
                    address: output.address
                },
                amount: output.amount
            };
            const writeStream = new writeStream_1.WriteStream();
            output_1.serializeOutput(writeStream, o);
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
        const writeStream = new writeStream_1.WriteStream();
        input_1.serializeInput(writeStream, i.input);
        return Object.assign(Object.assign({}, i), { serialized: writeStream.finalHex() });
    });
    // Lexigraphically sort the inputs and outputs
    const sortedInputs = inputsAndSignatureKeyPairsSerialized.sort((a, b) => a.serialized.localeCompare(b.serialized));
    const sortedOutputs = outputsWithSerialization.sort((a, b) => a.serialized.localeCompare(b.serialized));
    const transactionEssence = {
        type: ITransactionEssence_1.TRANSACTION_ESSENCE_TYPE,
        inputs: sortedInputs.map(i => i.input),
        outputs: sortedOutputs.map(o => o.output),
        payload: localIndexationKeyHex
            ? {
                type: IIndexationPayload_1.INDEXATION_PAYLOAD_TYPE,
                index: localIndexationKeyHex,
                data: (indexation === null || indexation === void 0 ? void 0 : indexation.data) ? (typeof indexation.data === "string"
                    ? converter_1.Converter.utf8ToHex(indexation.data) : converter_1.Converter.bytesToHex(indexation.data)) : undefined
            }
            : undefined
    };
    const binaryEssence = new writeStream_1.WriteStream();
    transaction_1.serializeTransactionEssence(binaryEssence, transactionEssence);
    const essenceFinal = binaryEssence.finalBytes();
    const essenceHash = blake2b_1.Blake2b.sum256(essenceFinal);
    // Create the unlock blocks
    const unlockBlocks = [];
    const addressToUnlockBlock = {};
    for (const input of sortedInputs) {
        const hexInputAddressPublic = converter_1.Converter.bytesToHex(input.addressKeyPair.publicKey);
        if (addressToUnlockBlock[hexInputAddressPublic]) {
            unlockBlocks.push({
                type: IReferenceUnlockBlock_1.REFERENCE_UNLOCK_BLOCK_TYPE,
                reference: addressToUnlockBlock[hexInputAddressPublic].unlockIndex
            });
        }
        else {
            unlockBlocks.push({
                type: ISignatureUnlockBlock_1.SIGNATURE_UNLOCK_BLOCK_TYPE,
                signature: {
                    type: IEd25519Signature_1.ED25519_SIGNATURE_TYPE,
                    publicKey: hexInputAddressPublic,
                    signature: converter_1.Converter.bytesToHex(ed25519_1.Ed25519.sign(input.addressKeyPair.privateKey, essenceHash))
                }
            });
            addressToUnlockBlock[hexInputAddressPublic] = {
                keyPair: input.addressKeyPair,
                unlockIndex: unlockBlocks.length - 1
            };
        }
    }
    const transactionPayload = {
        type: ITransactionPayload_1.TRANSACTION_PAYLOAD_TYPE,
        essence: transactionEssence,
        unlockBlocks
    };
    return transactionPayload;
}
exports.buildTransactionPayload = buildTransactionPayload;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZEFkdmFuY2VkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hpZ2hMZXZlbC9zZW5kQWR2YW5jZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsK0JBQStCO0FBQy9CLHNDQUFzQztBQUN0QywyQ0FBaUQ7QUFDakQsNkNBQW1EO0FBQ25ELCtDQUF5RjtBQUN6Rix1REFBb0U7QUFDcEUsa0VBQStEO0FBQy9ELCtDQUE0QztBQUM1QywrQ0FBNEM7QUFFNUMsK0RBQWlFO0FBQ2pFLG1FQUFxRTtBQUNyRSxxRUFBdUU7QUFHdkUsMkVBQXFHO0FBQ3JHLDJGQUErSDtBQUMvSCw2RUFBeUc7QUFDekcsMkVBQXFHO0FBQ3JHLHVFQUE4RjtBQUM5Rix1RUFBOEY7QUFFOUYsa0RBQStDO0FBQy9DLHNEQUFtRDtBQUVuRDs7Ozs7Ozs7O0dBU0c7QUFDSCxTQUFzQixZQUFZLENBQzlCLE1BQXdCLEVBQ3hCLDBCQUdHLEVBQ0gsT0FLRyxFQUNILFVBR0M7O1FBSUQsTUFBTSxXQUFXLEdBQUcsT0FBTyxNQUFNLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLG1DQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFFdkYsTUFBTSxrQkFBa0IsR0FBRyx1QkFBdUIsQ0FDOUMsMEJBQTBCLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBRXJELE1BQU0sT0FBTyxHQUFhO1lBQ3RCLE9BQU8sRUFBRSxrQkFBa0I7U0FDOUIsQ0FBQztRQUVGLE1BQU0sU0FBUyxHQUFHLE1BQU0sV0FBVyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUUzRCxPQUFPO1lBQ0gsU0FBUztZQUNULE9BQU87U0FDVixDQUFDO0lBQ04sQ0FBQztDQUFBO0FBbENELG9DQWtDQztBQUVEOzs7Ozs7OztHQVFHO0FBQ0gsU0FBZ0IsdUJBQXVCLENBQ25DLDBCQUdHLEVBQ0gsT0FLRyxF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