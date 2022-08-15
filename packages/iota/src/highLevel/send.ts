// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Bip32Path } from "@iota/crypto.js";
import { Converter } from "@iota/util.js";
import bigInt, { BigInteger } from "big-integer";
import { Ed25519Address } from "../addressTypes/ed25519Address";
import { IndexerPluginClient } from "../clients/plugins/indexerPluginClient";
import { SingleNodeClient } from "../clients/singleNodeClient";
import { ED25519_ADDRESS_TYPE } from "../models/addresses/IEd25519Address";
import type { IBip44GeneratorState } from "../models/IBip44GeneratorState";
import type { IBlock } from "../models/IBlock";
import type { IClient } from "../models/IClient";
import type { IKeyPair } from "../models/IKeyPair";
import { IUTXOInput, UTXO_INPUT_TYPE } from "../models/inputs/IUTXOInput";
import type { ISeed } from "../models/ISeed";
import { BASIC_OUTPUT_TYPE } from "../models/outputs/IBasicOutput";
import type { OutputTypes } from "../models/outputs/outputTypes";
import { ADDRESS_UNLOCK_CONDITION_TYPE } from "../models/unlockConditions/IAddressUnlockCondition";
import { Bech32Helper } from "../utils/bech32Helper";
import { generateBip44Address } from "./addresses";
import { sendAdvanced } from "./sendAdvanced";

/**
 * Send a transfer from the balance on the seed to a single output.
 * @param client The client or node endpoint to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param accountIndex The account index in the wallet.
 * @param addressBech32 The address to send the funds to in bech32 format.
 * @param amount The amount to send.
 * @param taggedData Optional tagged data to associate with the transaction.
 * @param taggedData.tag Optional tag.
 * @param taggedData.data Optional data.
 * @param addressOptions Optional address configuration for balance address lookups.
 * @param addressOptions.startIndex The start index for the wallet count address, defaults to 0.
 * @param addressOptions.zeroCount The number of addresses with 0 balance during lookup before aborting.
 * @returns The id of the block created and the contructed block.
 */
export async function send(
    client: IClient | string,
    seed: ISeed,
    accountIndex: number,
    addressBech32: string,
    amount: BigInteger,
    taggedData?: {
        tag?: Uint8Array | string;
        data?: Uint8Array | string;
    },
    addressOptions?: {
        startIndex?: number;
        zeroCount?: number;
    }
): Promise<{
    blockId: string;
    block: IBlock;
}> {
    return sendMultiple(client, seed, accountIndex, [{ addressBech32, amount }], taggedData, addressOptions);
}

/**
 * Send a transfer from the balance on the seed to a single output.
 * @param client The client or node endpoint to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param accountIndex The account index in the wallet.
 * @param addressEd25519 The address to send the funds to in ed25519 format.
 * @param amount The amount to send.
 * @param taggedData Optional tagged data to associate with the transaction.
 * @param taggedData.tag Optional tag.
 * @param taggedData.data Optional data.
 * @param addressOptions Optional address configuration for balance address lookups.
 * @param addressOptions.startIndex The start index for the wallet count address, defaults to 0.
 * @param addressOptions.zeroCount The number of addresses with 0 balance during lookup before aborting.
 * @returns The id of the block created and the contructed block.
 */
export async function sendEd25519(
    client: IClient | string,
    seed: ISeed,
    accountIndex: number,
    addressEd25519: string,
    amount: BigInteger,
    taggedData?: {
        tag?: Uint8Array;
        data?: Uint8Array;
    },
    addressOptions?: {
        startIndex?: number;
        zeroCount?: number;
    }
): Promise<{
    blockId: string;
    block: IBlock;
}> {
    return sendMultipleEd25519(client, seed, accountIndex, [{ addressEd25519, amount }], taggedData, addressOptions);
}

/**
 * Send a transfer from the balance on the seed to multiple outputs.
 * @param client The client or node endpoint to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param accountIndex The account index in the wallet.
 * @param outputs The address to send the funds to in bech32 format and amounts.
 * @param taggedData Optional tagged data to associate with the transaction.
 * @param taggedData.tag Optional tag.
 * @param taggedData.data Optional data.
 * @param addressOptions Optional address configuration for balance address lookups.
 * @param addressOptions.startIndex The start index for the wallet count address, defaults to 0.
 * @param addressOptions.zeroCount The number of addresses with 0 balance during lookup before aborting.
 * @returns The id of the block created and the contructed block.
 */
export async function sendMultiple(
    client: IClient | string,
    seed: ISeed,
    accountIndex: number,
    outputs: {
        addressBech32: string;
        amount: BigInteger;
    }[],
    taggedData?: {
        tag?: Uint8Array | string;
        data?: Uint8Array | string;
    },
    addressOptions?: {
        startIndex?: number;
        zeroCount?: number;
    }
): Promise<{
    blockId: string;
    block: IBlock;
}> {
    const localClient = typeof client === "string" ? new SingleNodeClient(client) : client;

    const protocolInfo = await localClient.protocolInfo();

    const hexOutputs = outputs.map(output => {
        const bech32Details = Bech32Helper.fromBech32(output.addressBech32, protocolInfo.bech32Hrp);
        if (!bech32Details) {
            throw new Error("Unable to decode bech32 address");
        }

        return {
            address: Converter.bytesToHex(bech32Details.addressBytes, true),
            addressType: bech32Details.addressType,
            amount: output.amount
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
        taggedData,
        addressOptions?.zeroCount
    );
}

/**
 * Send a transfer from the balance on the seed.
 * @param client The client or node endpoint to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param accountIndex The account index in the wallet.
 * @param outputs The outputs including address to send the funds to in ed25519 format and amount.
 * @param taggedData Optional tagged data to associate with the transaction.
 * @param taggedData.tag Optional tag.
 * @param taggedData.data Optional data.
 * @param addressOptions Optional address configuration for balance address lookups.
 * @param addressOptions.startIndex The start index for the wallet count address, defaults to 0.
 * @param addressOptions.zeroCount The number of addresses with 0 balance during lookup before aborting.
 * @returns The id of the block created and the contructed block.
 */
export async function sendMultipleEd25519(
    client: IClient | string,
    seed: ISeed,
    accountIndex: number,
    outputs: {
        addressEd25519: string;
        amount: BigInteger;
    }[],
    taggedData?: {
        tag?: Uint8Array;
        data?: Uint8Array;
    },
    addressOptions?: {
        startIndex?: number;
        zeroCount?: number;
    }
): Promise<{
    blockId: string;
    block: IBlock;
}> {
    const hexOutputs = outputs.map(output => ({
        address: output.addressEd25519,
        addressType: ED25519_ADDRESS_TYPE,
        amount: output.amount
    }));

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
        taggedData,
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
 * @param taggedData Optional tagged data to associate with the transaction.
 * @param taggedData.tag Optional tag.
 * @param taggedData.data Optional data.
 * @param zeroCount The number of addresses with 0 balance during lookup before aborting.
 * @returns The id of the block created and the contructed block.
 */
export async function sendWithAddressGenerator<T>(
    client: IClient | string,
    seed: ISeed,
    initialAddressState: T,
    nextAddressPath: (addressState: T) => string,
    outputs: {
        address: string;
        addressType: number;
        amount: BigInteger;
    }[],
    taggedData?: {
        tag?: Uint8Array | string;
        data?: Uint8Array | string;
    },
    zeroCount?: number
): Promise<{
    blockId: string;
    block: IBlock;
}> {
    const inputsAndKeys = await calculateInputs(client, seed, initialAddressState, nextAddressPath, outputs, zeroCount);

    const response = await sendAdvanced(client, inputsAndKeys, outputs, taggedData);

    return {
        blockId: response.blockId,
        block: response.block
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
 * @returns The id of the block created and the contructed block.
 */
export async function calculateInputs<T>(
    client: IClient | string,
    seed: ISeed,
    initialAddressState: T,
    nextAddressPath: (addressState: T) => string,
    outputs: { address: string; addressType: number; amount: BigInteger }[],
    zeroCount: number = 5
): Promise<
    {
        input: IUTXOInput;
        addressKeyPair: IKeyPair;
        consumingOutput: OutputTypes;
    }[]
> {
    const localClient = typeof client === "string" ? new SingleNodeClient(client) : client;

    const protocolInfo = await localClient.protocolInfo();

    let requiredBalance: BigInteger = bigInt(0);
    for (const output of outputs) {
        requiredBalance = requiredBalance.plus(output.amount);
    }

    let consumedBalance: BigInteger = bigInt(0);
    const inputsAndSignatureKeyPairs: {
        input: IUTXOInput;
        addressKeyPair: IKeyPair;
        consumingOutput: OutputTypes;
    }[] = [];
    let finished = false;
    let zeroBalance = 0;

    do {
        const path = nextAddressPath(initialAddressState);

        const addressSeed = seed.generateSeedFromPath(new Bip32Path(path));

        const addressKeyPair = addressSeed.keyPair();
        const ed25519Address = new Ed25519Address(addressKeyPair.publicKey);
        const addressBytes = ed25519Address.toAddress();

        const indexerPlugin = new IndexerPluginClient(client);
        const addressOutputIds = await indexerPlugin.basicOutputs(
            { addressBech32: Bech32Helper.toBech32(ED25519_ADDRESS_TYPE, addressBytes, protocolInfo.bech32Hrp) });

        if (addressOutputIds.items.length === 0) {
            zeroBalance++;
            if (zeroBalance >= zeroCount) {
                finished = true;
            }
        } else {
            for (const addressOutputId of addressOutputIds.items) {
                const addressOutput = await localClient.output(addressOutputId);

                if (!addressOutput.metadata.isSpent && consumedBalance.lesser(requiredBalance)) {
                    if (bigInt(addressOutput.output.amount).equals(0)) {
                        zeroBalance++;
                        if (zeroBalance >= zeroCount) {
                            finished = true;
                        }
                    } else {
                        consumedBalance = consumedBalance.plus(addressOutput.output.amount);

                        const input: IUTXOInput = {
                            type: UTXO_INPUT_TYPE,
                            transactionId: addressOutput.metadata.transactionId,
                            transactionOutputIndex: addressOutput.metadata.outputIndex
                        };

                        inputsAndSignatureKeyPairs.push({
                            input,
                            addressKeyPair,
                            consumingOutput: addressOutput.output
                        });

                        if (consumedBalance >= requiredBalance) {
                            // We didn't use all the balance from the last input
                            // so return the rest to the same address.
                            if (
                                consumedBalance.minus(requiredBalance).greater(0) &&
                                addressOutput.output.type === BASIC_OUTPUT_TYPE
                            ) {
                                const addressUnlockCondition = addressOutput.output.unlockConditions
                                    .find(u => u.type === ADDRESS_UNLOCK_CONDITION_TYPE);
                                if (addressUnlockCondition &&
                                    addressUnlockCondition.type === ADDRESS_UNLOCK_CONDITION_TYPE &&
                                    addressUnlockCondition.address.type === ED25519_ADDRESS_TYPE) {
                                    outputs.push({
                                        amount: consumedBalance.minus(requiredBalance),
                                        address: addressUnlockCondition.address.pubKeyHash,
                                        addressType: addressUnlockCondition.address.type
                                    });
                                }
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
