// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Bip32Path } from "@iota/crypto.js";
import { Converter } from "@iota/util.js";
import { ADDRESS_UNLOCK_CONDITION_TYPE } from "..";
import { Ed25519Address } from "../addressTypes/ed25519Address";
import { IndexerPluginClient } from "../clients/plugins/indexerPluginClient";
import { SingleNodeClient } from "../clients/singleNodeClient";
import { ED25519_ADDRESS_TYPE } from "../models/addresses/IEd25519Address";
import { UTXO_INPUT_TYPE } from "../models/inputs/IUTXOInput";
import { EXTENDED_OUTPUT_TYPE } from "../models/outputs/IExtendedOutput";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWdoTGV2ZWwvc2VuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM1QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLElBQUksQ0FBQztBQUNuRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDaEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDL0QsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFLM0UsT0FBTyxFQUFjLGVBQWUsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRTFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDbkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTlDOzs7Ozs7Ozs7Ozs7OztHQWNHO0FBQ0gsTUFBTSxDQUFDLEtBQUssVUFBVSxJQUFJLENBQ3RCLE1BQXdCLEVBQ3hCLElBQVcsRUFDWCxZQUFvQixFQUNwQixhQUFxQixFQUNyQixNQUFjLEVBQ2QsVUFHQyxFQUNELGNBR0M7SUFLRCxPQUFPLFlBQVksQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxDQUFDLEVBQUUsYUFBYSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLGNBQWMsQ0FBQyxD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