// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Ed25519Address } from "../addressTypes/ed25519Address";
import { SingleNodeClient } from "../clients/singleNodeClient";
import { Bip32Path } from "../crypto/bip32Path";
import type { IBip44GeneratorState } from "../models/IBip44GeneratorState";
import type { IClient } from "../models/IClient";
import { ED25519_ADDRESS_TYPE } from "../models/IEd25519Address";
import type { IKeyPair } from "../models/IKeyPair";
import type { IMessage } from "../models/IMessage";
import type { ISeed } from "../models/ISeed";
import { IUTXOInput, UTXO_INPUT_TYPE } from "../models/IUTXOInput";
import { Bech32Helper } from "../utils/bech32Helper";
import { Converter } from "../utils/converter";
import { generateBip44Address } from "./addresses";
import { sendAdvanced } from "./sendAdvanced";

/**
 * Send a transfer from the balance on the seed to a single output.
 * @param client The client or node endpoint to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param accountIndex The account index in the wallet.
 * @param addressBech32 The address to send the funds to in bech32 format.
 * @param amount The amount to send.
 * @param indexation Optional indexation data to associate with the transaction.
 * @param indexation.key Indexation key.
 * @param indexation.data Optional index data.
 * @param addressOptions Optional address configuration for balance address lookups.
 * @param addressOptions.startIndex The start index for the wallet count address, defaults to 0.
 * @param addressOptions.zeroCount The number of addresses with 0 balance during lookup before aborting.
 * @returns The id of the message created and the contructed message.
 */
export async function send(
    client: IClient | string,
    seed: ISeed,
    accountIndex: number,
    addressBech32: string,
    amount: number,
    indexation?: {
        key: Uint8Array | string;
        data?: Uint8Array | string;
    },
    addressOptions?: {
        startIndex?: number;
        zeroCount?: number;
    }
): Promise<{
    messageId: string;
    message: IMessage;
}> {
    return sendMultiple(
        client,
        seed,
        accountIndex,
        [{ addressBech32, amount }],
        indexation,
        addressOptions
    );
}

/**
 * Send a transfer from the balance on the seed to a single output.
 * @param client The client or node endpoint to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param accountIndex The account index in the wallet.
 * @param addressEd25519 The address to send the funds to in ed25519 format.
 * @param amount The amount to send.
 * @param indexation Optional indexation data to associate with the transaction.
 * @param indexation.key Indexation key.
 * @param indexation.data Optional index data.
 * @param addressOptions Optional address configuration for balance address lookups.
 * @param addressOptions.startIndex The start index for the wallet count address, defaults to 0.
 * @param addressOptions.zeroCount The number of addresses with 0 balance during lookup before aborting.
 * @returns The id of the message created and the contructed message.
 */
export async function sendEd25519(
    client: IClient | string,
    seed: ISeed,
    accountIndex: number,
    addressEd25519: string,
    amount: number,
    indexation?: {
        key: Uint8Array;
        data?: Uint8Array;
    },
    addressOptions?: {
        startIndex?: number;
        zeroCount?: number;
    }
): Promise<{
    messageId: string;
    message: IMessage;
}> {
    return sendMultipleEd25519(
        client,
        seed,
        accountIndex,
        [{ addressEd25519, amount }],
        indexation,
        addressOptions
    );
}

/**
 * Send a transfer from the balance on the seed to multiple outputs.
 * @param client The client or node endpoint to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param accountIndex The account index in the wallet.
 * @param outputs The address to send the funds to in bech32 format and amounts.
 * @param indexation Optional indexation data to associate with the transaction.
 * @param indexation.key Indexation key.
 * @param indexation.data Optional index data.
 * @param addressOptions Optional address configuration for balance address lookups.
 * @param addressOptions.startIndex The start index for the wallet count address, defaults to 0.
 * @param addressOptions.zeroCount The number of addresses with 0 balance during lookup before aborting.
 * @returns The id of the message created and the contructed message.
 */
export async function sendMultiple(
    client: IClient | string,
    seed: ISeed,
    accountIndex: number,
    outputs: {
        addressBech32: string;
        amount: number;
        isDustAllowance?: boolean;
    }[],
    indexation?: {
        key: Uint8Array | string;
        data?: Uint8Array | string;
    },
    addressOptions?: {
        startIndex?: number;
        zeroCount?: number;
    }
): Promise<{
    messageId: string;
    message: IMessage;
}> {
    const localClient = typeof client === "string" ? new SingleNodeClient(client) : client;

    const nodeInfo = await localClient.info();
    const hexOutputs = outputs.map(output => {
        const bech32Details = Bech32Helper.fromBech32(output.addressBech32, nodeInfo.bech32HRP);
        if (!bech32Details) {
            throw new Error("Unable to decode bech32 address");
        }

        return {
            address: Converter.bytesToHex(bech32Details.addressBytes),
            addressType: bech32Details.addressType,
            amount: output.amount,
            isDustAllowance: output.isDustAllowance
        };
    });

    return sendWithAddressGenerator<IBip44GeneratorState>(
        client,
        seed,
        {
            accountIndex,
            addressIndex: addressOptions?.startIndex ?? 0,
            isInternal: false
        },
        generateBip44Address,
        hexOutputs,
        indexation,
        addressOptions?.zeroCount
    );
}

/**
 * Send a transfer from the balance on the seed.
 * @param client The client or node endpoint to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param accountIndex The account index in the wallet.
 * @param outputs The outputs including address to send the funds to in ed25519 format and amount.
 * @param indexation Optional indexation data to associate with the transaction.
 * @param indexation.key Indexation key.
 * @param indexation.data Optional index data.
 * @param addressOptions Optional address configuration for balance address lookups.
 * @param addressOptions.startIndex The start index for the wallet count address, defaults to 0.
 * @param addressOptions.zeroCount The number of addresses with 0 balance during lookup before aborting.
 * @returns The id of the message created and the contructed message.
 */
export async function sendMultipleEd25519(
    client: IClient | string,
    seed: ISeed,
    accountIndex: number,
    outputs: {
        addressEd25519: string;
        amount: number;
        isDustAllowance?: boolean;
    }[],
    indexation?: {
        key: Uint8Array;
        data?: Uint8Array;
    },
    addressOptions?: {
        startIndex?: number;
        zeroCount?: number;
    }
): Promise<{
    messageId: string;
    message: IMessage;
}> {
    const hexOutputs = outputs.map(output => (
        {
            address: output.addressEd25519,
            addressType: ED25519_ADDRESS_TYPE,
            amount: output.amount,
            isDustAllowance: output.isDustAllowance
        }
    ));

    return sendWithAddressGenerator<IBip44GeneratorState>(
        client,
        seed,
        {
            accountIndex,
            addressIndex: addressOptions?.startIndex ?? 0,
            isInternal: false
        },
        generateBip44Address,
        hexOutputs,
        indexation,
        addressOptions?.zeroCount
    );
}

/**
 * Send a transfer using account based indexing for the inputs.
 * @param client The client or node endpoint to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param initialAddressState The initial address state for calculating the addresses.
 * @param nextAddressPath Calculate the next address for inputs.
 * @param outputs The address to send the funds to in bech32 format and amounts.
 * @param indexation Optional indexation data to associate with the transaction.
 * @param indexation.key Indexation key.
 * @param indexation.data Optional index data.
 * @param zeroCount The number of addresses with 0 balance during lookup before aborting.
 * @returns The id of the message created and the contructed message.
 */
export async function sendWithAddressGenerator<T>(
    client: IClient | string,
    seed: ISeed,
    initialAddressState: T,
    nextAddressPath: (addressState: T, isFirst: boolean) => string,
    outputs: {
        address: string;
        addressType: number;
        amount: number;
        isDustAllowance?: boolean;
    }[],
    indexation?: {
        key: Uint8Array | string;
        data?: Uint8Array | string;
    },
    zeroCount?: number
): Promise<{
    messageId: string;
    message: IMessage;
}> {
    const inputsAndKeys = await calculateInputs(
        client,
        seed,
        initialAddressState,
        nextAddressPath,
        outputs,
        zeroCount
    );

    const response = await sendAdvanced(
        client,
        inputsAndKeys,
        outputs,
        indexation);

    return {
        messageId: response.messageId,
        message: response.message
    };
}

/**
 * Calculate the inputs from the seed and basePath.
 * @param client The client or node endpoint to calculate the inputs with.
 * @param seed The seed to use for address generation.
 * @param initialAddressState The initial address state for calculating the addresses.
 * @param nextAddressPath Calculate the next address for inputs.
 * @param outputs The outputs to send.
 * @param zeroCount Abort when the number of zero balances is exceeded.
 * @returns The id of the message created and the contructed message.
 */
export async function calculateInputs<T>(
    client: IClient | string,
    seed: ISeed,
    initialAddressState: T,
    nextAddressPath: (addressState: T, isFirst: boolean) => string,
    outputs: { address: string; addressType: number; amount: number }[],
    zeroCount: number = 5
): Promise<{
    input: IUTXOInput;
    addressKeyPair: IKeyPair;
}[]> {
    const localClient = typeof client === "string" ? new SingleNodeClient(client) : client;

    let requiredBalance = 0;
    for (const output of outputs) {
        requiredBalance += output.amount;
    }

    let consumedBalance = 0;
    const inputsAndSignatureKeyPairs: {
        input: IUTXOInput;
        addressKeyPair: IKeyPair;
    }[] = [];
    let finished = false;
    let isFirst = true;
    let zeroBalance = 0;

    do {
        const path = nextAddressPath(initialAddressState, isFirst);
        isFirst = false;

        const addressSeed = seed.generateSeedFromPath(new Bip32Path(path));

        const addressKeyPair = addressSeed.keyPair();
        const ed25519Address = new Ed25519Address(addressKeyPair.publicKey);
        const address = Converter.bytesToHex(ed25519Address.toAddress());
        const addressOutputIds = await localClient.addressEd25519Outputs(address);

        if (addressOutputIds.count === 0) {
            zeroBalance++;
            if (zeroBalance >= zeroCount) {
                finished = true;
            }
        } else {
            for (const addressOutputId of addressOutputIds.outputIds) {
                const addressOutput = await localClient.output(addressOutputId);

                if (!addressOutput.isSpent &&
                    consumedBalance < requiredBalance) {
                    if (addressOutput.output.amount === 0) {
                        zeroBalance++;
                        if (zeroBalance >= zeroCount) {
                            finished = true;
                        }
                    } else {
                        consumedBalance += addressOutput.output.amount;

                        const input: IUTXOInput = {
                            type: UTXO_INPUT_TYPE,
                            transactionId: addressOutput.transactionId,
                            transactionOutputIndex: addressOutput.outputIndex
                        };

                        inputsAndSignatureKeyPairs.push({
                            input,
                            addressKeyPair
                        });

                        if (consumedBalance >= requiredBalance) {
                            // We didn't use all the balance from the last input
                            // so return the rest to the same address.
                            if (consumedBalance - requiredBalance > 0) {
                                outputs.push({
                                    amount: consumedBalance - requiredBalance,
                                    address: addressOutput.output.address.address,
                                    addressType: addressOutput.output.address.type
                                });
                            }
                            finished = true;
                        }
                    }
                }
            }
        }
    } while (!finished);

    if (consumedBalance < requiredBalance) {
        throw new Error("There are not enough funds in the inputs for the required balance");
    }

    return inputsAndSignatureKeyPairs;
}

