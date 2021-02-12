// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { serializeInput } from "../binary/input";
import { serializeOutput } from "../binary/output";
import { MAX_INDEXATION_KEY_LENGTH, MIN_INDEXATION_KEY_LENGTH } from "../binary/payload";
import { serializeTransactionEssence } from "../binary/transaction";
import { Blake2b } from "../crypto/blake2b";
import { Ed25519 } from "../crypto/ed25519";
import { IClient } from "../models/IClient";
import { ED25519_ADDRESS_TYPE } from "../models/IEd25519Address";
import { ED25519_SIGNATURE_TYPE } from "../models/IEd25519Signature";
import { INDEXATION_PAYLOAD_TYPE } from "../models/IIndexationPayload";
import { IKeyPair } from "../models/IKeyPair";
import { IMessage } from "../models/IMessage";
import { IReferenceUnlockBlock, REFERENCE_UNLOCK_BLOCK_TYPE } from "../models/IReferenceUnlockBlock";
import { ISigLockedDustAllowanceOutput, SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE } from "../models/ISigLockedDustAllowanceOutput";
import { ISigLockedSingleOutput, SIG_LOCKED_SINGLE_OUTPUT_TYPE } from "../models/ISigLockedSingleOutput";
import { ISignatureUnlockBlock, SIGNATURE_UNLOCK_BLOCK_TYPE } from "../models/ISignatureUnlockBlock";
import { ITransactionEssence, TRANSACTION_ESSENCE_TYPE } from "../models/ITransactionEssence";
import { ITransactionPayload, TRANSACTION_PAYLOAD_TYPE } from "../models/ITransactionPayload";
import { IUTXOInput } from "../models/IUTXOInput";
import { Converter } from "../utils/converter";
import { WriteStream } from "../utils/writeStream";

/**
 * Send a transfer from the balance on the seed.
 * @param client The client to send the transfer with.
 * @param inputsAndSignatureKeyPairs The inputs with the signature key pairs needed to sign transfers.
 * @param outputs The outputs to send.
 * @param indexation Optional indexation data to associate with the transaction.
 * @param indexation.key Indexation key.
 * @param indexation.data Optional index data.
 * @returns The id of the message created and the remainder address if one was needed.
 */
export async function sendAdvanced(
    client: IClient,
    inputsAndSignatureKeyPairs: {
        input: IUTXOInput;
        addressKeyPair: IKeyPair;
    }[],
    outputs: {
        address: string;
        addressType: number;
        amount: number;
        isDustAllowance?: boolean;
    }[],
    indexation?: {
        key: string;
        data?: Uint8Array;
    }): Promise<{
        messageId: string;
        message: IMessage;
    }> {
    const transactionPayload = buildTransactionPayload(
        inputsAndSignatureKeyPairs, outputs, indexation);

    const message: IMessage = {
        payload: transactionPayload
    };

    const messageId = await client.messageSubmit(message);

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
export function buildTransactionPayload(
    inputsAndSignatureKeyPairs: {
        input: IUTXOInput;
        addressKeyPair: IKeyPair;
    }[],
    outputs: {
        address: string;
        addressType: number;
        amount: number;
        isDustAllowance?: boolean;
    }[],
    indexation?: {
        key: string;
        data?: Uint8Array;
    }): ITransactionPayload {
    if (!inputsAndSignatureKeyPairs || inputsAndSignatureKeyPairs.length === 0) {
        throw new Error("You must specify some inputs");
    }
    if (!outputs || outputs.length === 0) {
        throw new Error("You must specify some outputs");
    }
    if (indexation?.key) {
        if (indexation.key.length < MIN_INDEXATION_KEY_LENGTH) {
            throw new Error(`The indexation key length is ${indexation.key.length
                }, which is below the minimum size of ${MIN_INDEXATION_KEY_LENGTH}`);
        }

        if (indexation.key.length > MAX_INDEXATION_KEY_LENGTH) {
            throw new Error(`The indexation key length is ${indexation.key.length
                }, which exceeds the maximum size of ${MAX_INDEXATION_KEY_LENGTH}`);
        }
    }

    const outputsWithSerialization: {
        output: ISigLockedDustAllowanceOutput | ISigLockedSingleOutput;
        serialized: string;
    }[] = [];

    for (const output of outputs) {
        if (output.addressType === ED25519_ADDRESS_TYPE) {
            const o: ISigLockedDustAllowanceOutput | ISigLockedSingleOutput = {
                type: output.isDustAllowance ? SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE : SIG_LOCKED_SINGLE_OUTPUT_TYPE,
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
        } else {
            throw new Error(`Unrecognized output address type ${output.addressType}`);
        }
    }

    const inputsAndSignatureKeyPairsSerialized: {
        input: IUTXOInput;
        addressKeyPair: IKeyPair;
        serialized: string;
    }[] = inputsAndSignatureKeyPairs.map(i => {
        const writeStream = new WriteStream();
        serializeInput(writeStream, i.input);
        return {
            ...i,
            serialized: writeStream.finalHex()
        };
    });

    // Lexigraphically sort the inputs and outputs
    const sortedInputs = inputsAndSignatureKeyPairsSerialized.sort((a, b) => a.serialized.localeCompare(b.serialized));
    const sortedOutputs = outputsWithSerialization.sort((a, b) => a.serialized.localeCompare(b.serialized));

    const transactionEssence: ITransactionEssence = {
        type: TRANSACTION_ESSENCE_TYPE,
        inputs: sortedInputs.map(i => i.input),
        outputs: sortedOutputs.map(o => o.output),
        payload: indexation
            ? {
                type: INDEXATION_PAYLOAD_TYPE,
                index: indexation.key,
                data: indexation.data ? Converter.bytesToHex(indexation.data) : ""
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
                    signature: Converter.bytesToHex(
                        Ed25519.sign(input.addressKeyPair.privateKey, essenceHash)
                    )
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
