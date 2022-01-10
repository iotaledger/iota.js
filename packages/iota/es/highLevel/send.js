// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Bip32Path } from "@iota/crypto.js";
import { Converter } from "@iota/util.js";
import { Ed25519Address } from "../addressTypes/ed25519Address";
import { SingleNodeClient } from "../clients/singleNodeClient";
import { ED25519_ADDRESS_TYPE } from "../models/addresses/IEd25519Address";
import { UTXO_INPUT_TYPE } from "../models/inputs/IUTXOInput";
import { SIMPLE_OUTPUT_TYPE } from "../models/outputs/ISimpleOutput";
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
 * @param indexation Optional indexation data to associate with the transaction.
 * @param indexation.key Indexation key.
 * @param indexation.data Optional index data.
 * @param addressOptions Optional address configuration for balance address lookups.
 * @param addressOptions.startIndex The start index for the wallet count address, defaults to 0.
 * @param addressOptions.zeroCount The number of addresses with 0 balance during lookup before aborting.
 * @returns The id of the message created and the contructed message.
 */
export async function send(client, seed, accountIndex, addressBech32, amount, indexation, addressOptions) {
    return sendMultiple(client, seed, accountIndex, [{ addressBech32, amount }], indexation, addressOptions);
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
export async function sendEd25519(client, seed, accountIndex, addressEd25519, amount, indexation, addressOptions) {
    return sendMultipleEd25519(client, seed, accountIndex, [{ addressEd25519, amount }], indexation, addressOptions);
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
export async function sendMultiple(client, seed, accountIndex, outputs, indexation, addressOptions) {
    var _a;
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
            amount: output.amount
        };
    });
    return sendWithAddressGenerator(client, seed, {
        accountIndex,
        addressIndex: (_a = addressOptions === null || addressOptions === void 0 ? void 0 : addressOptions.startIndex) !== null && _a !== void 0 ? _a : 0,
        isInternal: false
    }, generateBip44Address, hexOutputs, indexation, addressOptions === null || addressOptions === void 0 ? void 0 : addressOptions.zeroCount);
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
export async function sendMultipleEd25519(client, seed, accountIndex, outputs, indexation, addressOptions) {
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
    }, generateBip44Address, hexOutputs, indexation, addressOptions === null || addressOptions === void 0 ? void 0 : addressOptions.zeroCount);
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
export async function sendWithAddressGenerator(client, seed, initialAddressState, nextAddressPath, outputs, indexation, zeroCount) {
    const inputsAndKeys = await calculateInputs(client, seed, initialAddressState, nextAddressPath, outputs, zeroCount);
    const response = await sendAdvanced(client, inputsAndKeys, outputs, indexation);
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
        const address = Converter.bytesToHex(ed25519Address.toAddress());
        const addressOutputIds = await localClient.addressEd25519Outputs(address);
        if (addressOutputIds.count === 0) {
            zeroBalance++;
            if (zeroBalance >= zeroCount) {
                finished = true;
            }
        }
        else {
            for (const addressOutputId of addressOutputIds.outputIds) {
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
                                addressOutput.output.type === SIMPLE_OUTPUT_TYPE) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWdoTGV2ZWwvc2VuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM1QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNoRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUszRSxPQUFPLEVBQWMsZUFBZSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFMUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDckUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNuRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFOUM7Ozs7Ozs7Ozs7Ozs7O0dBY0c7QUFDSCxNQUFNLENBQUMsS0FBSyxVQUFVLElBQUksQ0FDdEIsTUFBd0IsRUFDeEIsSUFBVyxFQUNYLFlBQW9CLEVBQ3BCLGFBQXFCLEVBQ3JCLE1BQWMsRUFDZCxVQUdDLEVBQ0QsY0FHQztJQUtELE9BQU8sWUFBWSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLENBQUMsRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsY0FBYyxDQUFDLENBQUM7QUFDN0csQ0FBQztBQUVEOzs7Ozs7Ozs7Ozs7OztHQWNHO0FBQ0gsTUFBTSxDQUFDLEtBQUssVUFBVSxXQUFXLENBQzdCLE1BQXdCLEVBQ3hCLElB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