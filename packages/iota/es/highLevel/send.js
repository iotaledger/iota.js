// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Bip32Path } from "@iota/crypto.js";
import { Converter } from "@iota/util.js";
import { Ed25519Address } from "../addressTypes/ed25519Address";
import { IndexerPluginClient } from "../clients/plugins/indexerPluginClient";
import { SingleNodeClient } from "../clients/singleNodeClient";
import { ED25519_ADDRESS_TYPE } from "../models/addresses/IEd25519Address";
import { UTXO_INPUT_TYPE } from "../models/inputs/IUTXOInput";
import { BASIC_OUTPUT_TYPE } from "../models/outputs/IBasicOutput";
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
        if (addressOutputIds.items.length === 0) {
            zeroBalance++;
            if (zeroBalance >= zeroCount) {
                finished = true;
            }
        }
        else {
            for (const addressOutputId of addressOutputIds.items) {
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
                                addressOutput.output.type === BASIC_OUTPUT_TYPE) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWdoTGV2ZWwvc2VuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM1QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNoRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUM3RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUszRSxPQUFPLEVBQWMsZUFBZSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFMUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbkUsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFDbkcsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNuRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFOUM7Ozs7Ozs7Ozs7Ozs7O0dBY0c7QUFDSCxNQUFNLENBQUMsS0FBSyxVQUFVLElBQUksQ0FDdEIsTUFBd0IsRUFDeEIsSUFBVyxFQUNYLFlBQW9CLEVBQ3BCLGFBQXFCLEVBQ3JCLE1BQWMsRUFDZCxVQUdDLEVBQ0QsY0FHQztJQUtELE9BQU8sWUFBWSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLENBQUMsRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsY0FBYyxDQUFD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