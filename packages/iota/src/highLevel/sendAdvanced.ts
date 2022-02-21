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
import type { IClient } from "../models/IClient";
import type { IKeyPair } from "../models/IKeyPair";
import type { IMessage } from "../models/IMessage";
import type { IUTXOInput } from "../models/inputs/IUTXOInput";
import { ITransactionEssence, TRANSACTION_ESSENCE_TYPE } from "../models/ITransactionEssence";
import { BASIC_OUTPUT_TYPE, IBasicOutput } from "../models/outputs/IBasicOutput";
import { TAGGED_DATA_PAYLOAD_TYPE } from "../models/payloads/ITaggedDataPayload";
import { ITransactionPayload, TRANSACTION_PAYLOAD_TYPE } from "../models/payloads/ITransactionPayload";
import { ED25519_SIGNATURE_TYPE } from "../models/signatures/IEd25519Signature";
import { IReferenceUnlockBlock, REFERENCE_UNLOCK_BLOCK_TYPE } from "../models/unlockBlocks/IReferenceUnlockBlock";
import { ISignatureUnlockBlock, SIGNATURE_UNLOCK_BLOCK_TYPE } from "../models/unlockBlocks/ISignatureUnlockBlock";
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
export async function sendAdvanced(
    client: IClient | string,
    inputsAndSignatureKeyPairs: {
        input: IUTXOInput;
        addressKeyPair: IKeyPair;
    }[],
    outputs: {
        address: string;
        addressType: number;
        amount: number;
    }[],
    taggedData?: {
        tag: Uint8Array | string;
        data?: Uint8Array | string;
    }
): Promise<{
    messageId: string;
    message: IMessage;
}> {
    const localClient = typeof client === "string" ? new SingleNodeClient(client) : client;

    const transactionPayload = buildTransactionPayload(inputsAndSignatureKeyPairs, outputs, taggedData);

    const protocolInfo = await localClient.protocolInfo();
    transactionPayload.essence.networkId = protocolInfo.networkId;

    const message: IMessage = {
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
export function buildTransactionPayload(
    inputsAndSignatureKeyPairs: {
        input: IUTXOInput;
        addressKeyPair: IKeyPair;
    }[],
    outputs: {
        address: string;
        addressType: number;
        amount: number;
    }[],
    taggedData?: {
        tag: Uint8Array | string;
        data?: Uint8Array | string;
    }
): ITransactionPayload {
    if (!inputsAndSignatureKeyPairs || inputsAndSignatureKeyPairs.length === 0) {
        throw new Error("You must specify some inputs");
    }
    if (!outputs || outputs.length === 0) {
        throw new Error("You must specify some outputs");
    }

    let localTagHex;

    if (taggedData) {
        localTagHex = typeof taggedData?.tag === "string"
            ? Converter.utf8ToHex(taggedData.tag)
            : Converter.bytesToHex(taggedData.tag);

        if (localTagHex.length / 2 < MIN_TAG_LENGTH) {
            throw new Error(
                `The tag length is ${localTagHex.length / 2
                }, which is less than the minimum size of ${MIN_TAG_LENGTH}`
            );
        }

        if (localTagHex.length / 2 > MAX_TAG_LENGTH) {
            throw new Error(
                `The tag length is ${localTagHex.length / 2
                }, which exceeds the maximum size of ${MAX_TAG_LENGTH}`
            );
        }
    }

    const outputsWithSerialization: {
        output: IBasicOutput;
        serializedBytes: Uint8Array;
        serializedHex: string;
    }[] = [];

    for (const output of outputs) {
        if (output.addressType === ED25519_ADDRESS_TYPE) {
            const o: IBasicOutput = {
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
        } else {
            throw new Error(`Unrecognized output address type ${output.addressType}`);
        }
    }

    const inputsAndSignatureKeyPairsSerialized: {
        input: IUTXOInput;
        addressKeyPair: IKeyPair;
        serializedBytes: Uint8Array;
        serializedHex: string;
    }[] = inputsAndSignatureKeyPairs.map(i => {
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
    const sortedInputs = inputsAndSignatureKeyPairsSerialized.sort(
        (a, b) => a.serializedHex.localeCompare(b.serializedHex));
    const sortedOutputs = outputsWithSerialization.sort((a, b) => a.serializedHex.localeCompare(b.serializedHex));

    const inputsCommitmentHasher = new Blake2b(Blake2b.SIZE_256);
    for (const input of sortedInputs) {
        inputsCommitmentHasher.update(input.serializedBytes);
    }
    const inputsCommitment = Converter.bytesToHex(inputsCommitmentHasher.final());

    const transactionEssence: ITransactionEssence = {
        type: TRANSACTION_ESSENCE_TYPE,
        inputs: sortedInputs.map(i => i.input),
        inputsCommitment,
        outputs: sortedOutputs.map(o => o.output),
        payload: localTagHex
            ? {
                type: TAGGED_DATA_PAYLOAD_TYPE,
                tag: localTagHex,
                data: taggedData?.data
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
    const unlockBlocks: (ISignatureUnlockBlock | IReferenceUnlockBlock)[] = [];
    const addressToUnlockBlock: {
        [address: string]: {
            keyPair: IKeyPair;
            unlockIndex: number;
        };
    } = {};

    for (const input of sortedInputs) {
        const hexInputAddressPublic = Converter.bytesToHex(input.addressKeyPair.publicKey);
        if (addressToUnlockBlock[hexInputAddressPublic]) {
            unlockBlocks.push({
                type: REFERENCE_UNLOCK_BLOCK_TYPE,
                reference: addressToUnlockBlock[hexInputAddressPublic].unlockIndex
            });
        } else {
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

    const transactionPayload: ITransactionPayload = {
        type: TRANSACTION_PAYLOAD_TYPE,
        essence: transactionEssence,
        unlockBlocks
    };

    return transactionPayload;
}
