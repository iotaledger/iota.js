// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Ed25519Address } from "../addressTypes/ed25519Address";
import { Bip32Path } from "../crypto/bip32Path";
import { IAccountAddressGeneratorState } from "../models/IAccountAddressGeneratorState";
import { IClient } from "../models/IClient";
import { ED25519_ADDRESS_TYPE } from "../models/IEd25519Address";
import { IKeyPair } from "../models/IKeyPair";
import { IMessage } from "../models/IMessage";
import { ISeed } from "../models/ISeed";
import { IUTXOInput } from "../models/IUTXOInput";
import { Bech32Helper } from "../utils/bech32Helper";
import { Converter } from "../utils/converter";
import { generateAccountAddress } from "./addresses";
import { sendAdvanced } from "./sendAdvanced";

/**
 * Send a transfer from the balance on the seed to a single output.
 * @param client The client to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param accountIndex The account index in the wallet.
 * @param addressBech32 The address to send the funds to in bech32 format.
 * @param amount The amount to send.
 * @param startIndex The start index for the wallet count address, defaults to 0.
 * @returns The id of the message created and the contructed message.
 */
export async function send(
    client: IClient,
    seed: ISeed,
    accountIndex: number,
    addressBech32: string,
    amount: number,
    startIndex?: number): Promise<{
        messageId: string;
        message: IMessage;
    }> {
    return sendMultiple(
        client,
        seed,
        accountIndex,
        [{ addressBech32, amount }],
        startIndex
    );
}

/**
 * Send a transfer from the balance on the seed to a single output.
 * @param client The client to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param accountIndex The account index in the wallet.
 * @param addressEd25519 The address to send the funds to in ed25519 format.
 * @param amount The amount to send.
 * @param startIndex The start index for the wallet count address, defaults to 0.
 * @returns The id of the message created and the contructed message.
 */
export async function sendEd25519(
    client: IClient,
    seed: ISeed,
    accountIndex: number,
    addressEd25519: string,
    amount: number,
    startIndex?: number): Promise<{
        messageId: string;
        message: IMessage;
    }> {
    return sendMultipleEd25519(
        client,
        seed,
        accountIndex,
        [{ addressEd25519, amount }],
        startIndex
    );
}

/**
 * Send a transfer from the balance on the seed to multiple outputs.
 * @param client The client to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param accountIndex The account index in the wallet.
 * @param outputs The address to send the funds to in bech32 format and amounts.
 * @param startIndex The start index for the wallet count address, defaults to 0.
 * @returns The id of the message created and the contructed message.
 */
export async function sendMultiple(
    client: IClient,
    seed: ISeed,
    accountIndex: number,
    outputs: {
        addressBech32: string;
        amount: number;
    }[],
    startIndex?: number): Promise<{
        messageId: string;
        message: IMessage;
    }> {
    const hexOutputs = outputs.map(output => {
        const bech32Details = Bech32Helper.fromBech32(output.addressBech32);
        if (!bech32Details) {
            throw new Error("Unable to decode bech32 address");
        }

        return {
            address: Converter.bytesToHex(bech32Details.addressBytes),
            addressType: bech32Details.addressType,
            amount: output.amount
        };
    });

    return sendWithAddressGenerator<IAccountAddressGeneratorState>(
        client,
        seed,
        {
            accountIndex,
            addressIndex: startIndex ?? 0,
            isInternal: false
        },
        generateAccountAddress,
        hexOutputs
    );
}

/**
 * Send a transfer from the balance on the seed.
 * @param client The client to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param accountIndex The account index in the wallet.
 * @param outputs The outputs including address to send the funds to in ed25519 format and amount.
 * @param startIndex The start index for the wallet count address, defaults to 0.
 * @returns The id of the message created and the contructed message.
 */
export async function sendMultipleEd25519(
    client: IClient,
    seed: ISeed,
    accountIndex: number,
    outputs: {
        addressEd25519: string;
        amount: number;
    }[],
    startIndex?: number): Promise<{
        messageId: string;
        message: IMessage;
    }> {
    const hexOutputs = outputs.map(output => (
        { address: output.addressEd25519, addressType: ED25519_ADDRESS_TYPE, amount: output.amount }
    ));

    return sendWithAddressGenerator<IAccountAddressGeneratorState>(
        client,
        seed,
        {
            accountIndex,
            addressIndex: startIndex ?? 0,
            isInternal: false
        },
        generateAccountAddress,
        hexOutputs
    );
}

/**
 * Send a transfer using account based indexing for the inputs.
 * @param client The client to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param initialAddressState The initial address state for calculating the addresses.
 * @param nextAddress Calculate the next address for inputs.
 * @param outputs The address to send the funds to in bech32 format and amounts.
 * @returns The id of the message created and the contructed message.
 */
export async function sendWithAddressGenerator<T>(
    client: IClient,
    seed: ISeed,
    initialAddressState: T,
    nextAddress: (s: ISeed, addressState: T, isFirst: boolean) => {
        keyPair: IKeyPair;
        path?: Bip32Path;
    },
    outputs: {
        address: string;
        addressType: number;
        amount: number;
    }[]): Promise<{
        messageId: string;
        message: IMessage;
    }> {
    const inputsAndKeys = await calculateInputs(
        client,
        seed,
        initialAddressState,
        nextAddress,
        outputs,
        5
    );

    const response = await sendAdvanced(
        client,
        inputsAndKeys,
        outputs);

    return {
        messageId: response.messageId,
        message: response.message
    };
}

/**
 * Calculate the inputs from the seed and basePath.
 * @param client The client to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param initialAddressState The initial address state for calculating the addresses.
 * @param nextAddress Calculate the next address for inputs.
 * @param outputs The outputs to send.
 * @param zeroCount Abort when the number of zero balances is exceeded.
 * @returns The id of the message created and the contructed message.
 */
export async function calculateInputs<T>(
    client: IClient,
    seed: ISeed,
    initialAddressState: T,
    nextAddress: (s: ISeed, addressState: T, isFirst: boolean) => {
        keyPair: IKeyPair;
        path?: Bip32Path;
    },
    outputs: { address: string; addressType: number; amount: number }[],
    zeroCount: number
): Promise<{
    input: IUTXOInput;
    addressKeyPair: IKeyPair;
}[]> {
    const requiredBalance = outputs.reduce((total, output) => total + output.amount, 0);
    const localZeroCount = zeroCount ?? 5;

    let consumedBalance = 0;
    const inputsAndSignatureKeyPairs: {
        input: IUTXOInput;
        addressKeyPair: IKeyPair;
    }[] = [];
    let finished = false;
    let isFirst = true;
    let zeroBalance = 0;

    do {
        const keyPairAndPath = nextAddress(seed, initialAddressState, isFirst);
        isFirst = false;

        const ed25519Address = new Ed25519Address(keyPairAndPath.keyPair.publicKey);
        const address = Converter.bytesToHex(ed25519Address.toAddress());
        const addressOutputIds = await client.addressEd25519Outputs(address);

        if (addressOutputIds.count === 0) {
            zeroBalance++;
            if (zeroBalance >= localZeroCount) {
                finished = true;
            }
        } else {
            for (const addressOutputId of addressOutputIds.outputIds) {
                const addressOutput = await client.output(addressOutputId);

                if (!addressOutput.isSpent &&
                    consumedBalance < requiredBalance) {
                    if (addressOutput.output.amount === 0) {
                        zeroBalance++;
                        if (zeroBalance >= localZeroCount) {
                            finished = true;
                        }
                    } else {
                        consumedBalance += addressOutput.output.amount;

                        const input: IUTXOInput = {
                            type: 0,
                            transactionId: addressOutput.transactionId,
                            transactionOutputIndex: addressOutput.outputIndex
                        };

                        inputsAndSignatureKeyPairs.push({
                            input,
                            addressKeyPair: keyPairAndPath.keyPair
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

