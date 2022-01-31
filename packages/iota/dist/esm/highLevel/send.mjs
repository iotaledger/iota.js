// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Bip32Path } from "@iota/crypto.js";
import { Converter } from "@iota/util.js";
import { ADDRESS_UNLOCK_CONDITION_TYPE } from "...mjs";
import { Ed25519Address } from "../addressTypes/ed25519Address.mjs";
import { IndexerPluginClient } from "../clients/plugins/indexerPluginClient.mjs";
import { SingleNodeClient } from "../clients/singleNodeClient.mjs";
import { ED25519_ADDRESS_TYPE } from "../models/addresses/IEd25519Address.mjs";
import { UTXO_INPUT_TYPE } from "../models/inputs/IUTXOInput.mjs";
import { EXTENDED_OUTPUT_TYPE } from "../models/outputs/IExtendedOutput.mjs";
import { Bech32Helper } from "../utils/bech32Helper.mjs";
import { generateBip44Address } from "./addresses.mjs";
import { sendAdvanced } from "./sendAdvanced.mjs";
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
 * @returns The id of the message created and the contructed message.
 */
export async function send(client, seed, accountIndex, addressBech32, amount, taggedData, addressOptions) {
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
 * @returns The id of the message created and the contructed message.
 */
export async function sendEd25519(client, seed, accountIndex, addressEd25519, amount, taggedData, addressOptions) {
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
 * @returns The id of the message created and the contructed message.
 */
export async function sendMultiple(client, seed, accountIndex, outputs, taggedData, addressOptions) {
    var _a;
    const localClient = typeof client === "string" ? new SingleNodeClient(client) : client;
    const bech32Hrp = await localClient.bech32Hrp();
    const hexOutputs = outputs.map(output => {
        const bech32Details = Bech32Helper.fromBech32(output.addressBech32, bech32Hrp);
        if (!bech32Details) {
            throw new Error("Unable to decode bech32 address");
        }
        return {
            address: Converter.bytesToHex(bech32Details.addressBytes),
            addressType: bech32Details.addressType,
            amount: output.amount
        };
    });
    return sendWithAddressGenerator(client, seed, {
        accountIndex,
        addressIndex: (_a = addressOptions === null || addressOptions === void 0 ? void 0 : addressOptions.startIndex) !== null && _a !== void 0 ? _a : 0,
        isInternal: false
    }, generateBip44Address, hexOutputs, taggedData, addressOptions === null || addressOptions === void 0 ? void 0 : addressOptions.zeroCount);
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
 * @returns The id of the message created and the contructed message.
 */
export async function sendMultipleEd25519(client, seed, accountIndex, outputs, taggedData, addressOptions) {
    var _a;
    const hexOutputs = outputs.map(output => ({
        address: output.addressEd25519,
        addressType: ED25519_ADDRESS_TYPE,
        amount: output.amount
    }));
    return sendWithAddressGenerator(client, seed, {
        accountIndex,
        addressIndex: (_a = addressOptions === null || addressOptions === void 0 ? void 0 : addressOptions.startIndex) !== null && _a !== void 0 ? _a : 0,
        isInternal: false
    }, generateBip44Address, hexOutputs, taggedData, addressOptions === null || addressOptions === void 0 ? void 0 : addressOptions.zeroCount);
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
 * @returns The id of the message created and the contructed message.
 */
export async function sendWithAddressGenerator(client, seed, initialAddressState, nextAddressPath, outputs, taggedData, zeroCount) {
    const inputsAndKeys = await calculateInputs(client, seed, initialAddressState, nextAddressPath, outputs, zeroCount);
    const response = await sendAdvanced(client, inputsAndKeys, outputs, taggedData);
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
export async function calculateInputs(client, seed, initialAddressState, nextAddressPath, outputs, zeroCount = 5) {
    const localClient = typeof client === "string" ? new SingleNodeClient(client) : client;
    const bech32Hrp = await localClient.bech32Hrp();
    let requiredBalance = 0;
    for (const output of outputs) {
        requiredBalance += output.amount;
    }
    let consumedBalance = 0;
    const inputsAndSignatureKeyPairs = [];
    let finished = false;
    let zeroBalance = 0;
    do {
        const path = nextAddressPath(initialAddressState);
        const addressSeed = seed.generateSeedFromPath(new Bip32Path(path));
        const addressKeyPair = addressSeed.keyPair();
        const ed25519Address = new Ed25519Address(addressKeyPair.publicKey);
        const addressBytes = ed25519Address.toAddress();
        const indexerPlugin = new IndexerPluginClient(client);
        const addressOutputIds = await indexerPlugin.outputs({ addressBech32: Bech32Helper.toBech32(ED25519_ADDRESS_TYPE, addressBytes, bech32Hrp) });
        if (addressOutputIds.count === 0) {
            zeroBalance++;
            if (zeroBalance >= zeroCount) {
                finished = true;
            }
        }
        else {
            for (const addressOutputId of addressOutputIds.data) {
                const addressOutput = await localClient.output(addressOutputId);
                if (!addressOutput.isSpent && consumedBalance < requiredBalance) {
                    if (addressOutput.output.amount === 0) {
                        zeroBalance++;
                        if (zeroBalance >= zeroCount) {
                            finished = true;
                        }
                    }
                    else {
                        consumedBalance += addressOutput.output.amount;
                        const input = {
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
                            if (consumedBalance - requiredBalance > 0 &&
                                addressOutput.output.type === EXTENDED_OUTPUT_TYPE) {
                                const addressUnlockCondition = addressOutput.output.unlockConditions
                                    .find(u => u.type === ADDRESS_UNLOCK_CONDITION_TYPE);
                                if (addressUnlockCondition &&
                                    addressUnlockCondition.type === ADDRESS_UNLOCK_CONDITION_TYPE) {
                                    outputs.push({
                                        amount: consumedBalance - requiredBalance,
                                        address: addressUnlockCondition.address.address,
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
