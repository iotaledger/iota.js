// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Ed25519Address } from "../addressTypes/ed25519Address";
import { serializeInput } from "../binary/input";
import { serializeOutput } from "../binary/output";
import { serializeTransactionEssence } from "../binary/transaction";
import { Ed25519 } from "../crypto/ed25519";
import { IClient } from "../models/IClient";
import { ED25519_ADDRESS_TYPE } from "../models/IEd25519Address";
import { IMessage } from "../models/IMessage";
import { IReferenceUnlockBlock, REFERENCE_UNLOCK_BLOCK_TYPE } from "../models/IReferenceUnlockBlock";
import { ISigLockedSingleOutput } from "../models/ISigLockedSingleOutput";
import { ISignatureUnlockBlock, SIGNATURE_UNLOCK_BLOCK_TYPE } from "../models/ISignatureUnlockBlock";
import { IUTXOInput } from "../models/IUTXOInput";
import { Converter } from "./converter";
import { WriteStream } from "./writeStream";

/**
 * Helper methods for messages.
 */
export class MessageHelper {
    /**
     * Validate a transaction the message.
     * @param client The client for making API calls.
     * @param message The message to validate.
     * @returns The reasons why to message is not valid.
     */
    public static async validateTransaction(client: IClient, message: IMessage): Promise<string[]> {
        const invalid: string[] = [];

        try {
            if (!message) {
                invalid.push("The message is empty.");
            } else if (!message.payload) {
                invalid.push("There is no payload.");
            } else if (message.payload.type !== 0) {
                invalid.push(`The payload type is not a transaction, it is ${message.payload.type}.`);
            } else if (!message.payload.essence) {
                invalid.push("There is no payload essence.");
            } else if (message.payload.essence.type !== 0) {
                invalid.push(`The payload essence is of a type not supported. ${message.payload.essence.type}.`);
            } else {
                if (!message.payload.essence.inputs || message.payload.essence.inputs.length === 0) {
                    invalid.push("There are no inputs.");
                }

                if (!message.payload.essence.outputs || message.payload.essence.outputs.length === 0) {
                    invalid.push("There are no outputs.");
                }

                if (!message.payload.unlockBlocks || message.payload.unlockBlocks.length === 0) {
                    invalid.push("There are no unlock blocks.");
                }

                const txsForAddresses: {
                    [id: string]: {
                        amount: number;
                        isSpent: boolean;
                    };
                } = {};

                if (message.payload.unlockBlocks) {
                    for (let i = 0; i < message.payload.unlockBlocks.length; i++) {
                        if (message.payload.unlockBlocks[i].type === SIGNATURE_UNLOCK_BLOCK_TYPE) {
                            const sigUnlockBlock = message.payload.unlockBlocks[i] as ISignatureUnlockBlock;

                            if (sigUnlockBlock.signature.type === ED25519_ADDRESS_TYPE) {
                                const address = new Ed25519Address(
                                    Converter.hexToBytes(sigUnlockBlock.signature.publicKey));

                                const outputs = await client.addressEd25519Outputs(
                                    Converter.bytesToHex(address.toAddress()));

                                for (const outputId of outputs.outputIds) {
                                    const output = await client.output(outputId);

                                    txsForAddresses[output.transactionId] = {
                                        isSpent: output.isSpent,
                                        amount: output.output.amount
                                    };
                                }
                            }
                        }
                    }
                }

                let inputCount = 0;
                let inputTotal = 0;
                if (message.payload.essence.inputs) {
                    inputCount = message.payload.essence.inputs.length;

                    for (const input of message.payload.essence.inputs) {
                        if (!txsForAddresses[input.transactionId]) {
                            invalid.push(`Missing transaction ${input.transactionId} from source address.`);
                        } else if (txsForAddresses[input.transactionId].isSpent) {
                            invalid.push(`Transaction ${input.transactionId} is already spent.`);
                        } else {
                            inputTotal += txsForAddresses[input.transactionId].amount;
                        }
                    }
                }

                const unlockBlockCount = message.payload.unlockBlocks?.length ?? 0;
                if (inputCount !== unlockBlockCount) {
                    invalid.push(`The number of unlock blocks ${unlockBlockCount
                        }, does not equal the number of inputs ${inputCount}.`);
                }

                let outputTotal = 0;
                if (message.payload.essence.outputs) {
                    for (const output of message.payload.essence.outputs) {
                        outputTotal += output.amount;
                    }
                }

                if (outputTotal !== inputTotal) {
                    invalid.push(`The input total ${inputTotal} does not equal the output total ${outputTotal}.`);
                }

                const serializedInputs: {
                    input: IUTXOInput;
                    serialized: string;
                    index: number;
                }[] = [];

                for (const input of message.payload.essence.inputs) {
                    const writeStream = new WriteStream();
                    serializeInput(writeStream, input);
                    serializedInputs.push({
                        input,
                        serialized: writeStream.finalHex(),
                        index: serializedInputs.length
                    });
                }

                const sortedInputs = serializedInputs.sort((a, b) => a.serialized.localeCompare(b.serialized));

                let inputsAreSorted = true;
                for (let i = 0; i < sortedInputs.length; i++) {
                    if (i !== sortedInputs[i].index) {
                        inputsAreSorted = false;
                        break;
                    }
                }

                if (!inputsAreSorted) {
                    invalid.push("The inputs are not lexigraphically sorted.");
                }

                const serializedOutputs: {
                    output: ISigLockedSingleOutput;
                    serialized: string;
                    index: number;
                }[] = [];

                for (const output of message.payload.essence.outputs) {
                    const writeStream = new WriteStream();
                    serializeOutput(writeStream, output);
                    serializedOutputs.push({
                        output,
                        serialized: writeStream.finalHex(),
                        index: serializedOutputs.length
                    });
                }

                const sortedOutputs = serializedOutputs.sort((a, b) => a.serialized.localeCompare(b.serialized));

                let outputsAreSorted = true;
                for (let i = 0; i < sortedOutputs.length; i++) {
                    if (i !== sortedOutputs[i].index) {
                        outputsAreSorted = false;
                        break;
                    }
                }

                if (!outputsAreSorted) {
                    invalid.push("The outputs are not lexigraphically sorted.");
                }

                if (inputsAreSorted && outputsAreSorted && inputCount === unlockBlockCount) {
                    const binaryEssence = new WriteStream();
                    serializeTransactionEssence(binaryEssence, message.payload.essence);
                    const essenceFinal = binaryEssence.finalBytes();

                    const unlockBlocksFull: ISignatureUnlockBlock[] = [];
                    for (let i = 0; i < message.payload.unlockBlocks.length; i++) {
                        if (message.payload.unlockBlocks[i].type === SIGNATURE_UNLOCK_BLOCK_TYPE) {
                            unlockBlocksFull.push(message.payload.unlockBlocks[i] as ISignatureUnlockBlock);
                        } else if (message.payload.unlockBlocks[i].type === REFERENCE_UNLOCK_BLOCK_TYPE) {
                            const refUnlockBlock = message.payload.unlockBlocks[i] as IReferenceUnlockBlock;
                            if (refUnlockBlock.reference < 0 ||
                                refUnlockBlock.reference > message.payload.unlockBlocks.length - 1) {
                                invalid.push(`Unlock Block ${i} references index ${refUnlockBlock.reference
                                    } which is out of range.`);
                            } else if (refUnlockBlock.reference === i) {
                                invalid.push(`Unlock Block ${i} references itself.`);
                            } else if (message.payload.unlockBlocks[refUnlockBlock.reference].type === 1) {
                                invalid.push(`Unlock Block ${i} references another reference.`);
                            } else {
                                unlockBlocksFull.push(
                                    message.payload.unlockBlocks[refUnlockBlock.reference] as ISignatureUnlockBlock);
                            }
                        }
                    }

                    for (let i = 0; i < sortedInputs.length; i++) {
                        if (unlockBlocksFull[i].signature.type === ED25519_ADDRESS_TYPE) {
                            const verified = Ed25519.verify(
                                Converter.hexToBytes(unlockBlocksFull[i].signature.publicKey),
                                essenceFinal,
                                Converter.hexToBytes(unlockBlocksFull[i].signature.signature));

                            if (!verified) {
                                invalid.push(`Signature for unlock block ${i} is incorrect.`);
                            }
                        }
                    }
                }
            }
        } catch (err) {
            invalid.push("The following error occured while validating the transaction");
            invalid.push(err.toString().replace("TypeError: ", ""));
        }

        return invalid;
    }
}
