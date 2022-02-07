// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Bip32Path } from "@iota/crypto.js";
import { Ed25519Address } from "../addressTypes/ed25519Address.mjs";
import { IndexerPluginClient } from "../clients/plugins/indexerPluginClient.mjs";
import { SingleNodeClient } from "../clients/singleNodeClient.mjs";
import { ED25519_ADDRESS_TYPE } from "../models/addresses/IEd25519Address.mjs";
import { BASIC_OUTPUT_TYPE } from "../models/outputs/IBasicOutput.mjs";
import { Bech32Helper } from "../utils/bech32Helper.mjs";
import { generateBip44Address } from "./addresses.mjs";
/**
 * Get all the unspent addresses.
 * @param client The client or node endpoint to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param accountIndex The account index in the wallet.
 * @param addressOptions Optional address configuration for balance address lookups.
 * @param addressOptions.startIndex The start index for the wallet count address, defaults to 0.
 * @param addressOptions.zeroCount The number of addresses with 0 balance during lookup before aborting.
 * @param addressOptions.requiredCount The max number of addresses to find.
 * @returns All the unspent addresses.
 */
export async function getUnspentAddresses(client, seed, accountIndex, addressOptions) {
    var _a;
    return getUnspentAddressesWithAddressGenerator(client, seed, {
        accountIndex,
        addressIndex: (_a = addressOptions === null || addressOptions === void 0 ? void 0 : addressOptions.startIndex) !== null && _a !== void 0 ? _a : 0,
        isInternal: false
    }, generateBip44Address, addressOptions);
}
/**
 * Get all the unspent addresses using an address generator.
 * @param client The client or node endpoint to get the addresses from.
 * @param seed The seed to use for address generation.
 * @param initialAddressState The initial address state for calculating the addresses.
 * @param nextAddressPath Calculate the next address for inputs.
 * @param addressOptions Optional address configuration for balance address lookups.
 * @param addressOptions.startIndex The start index for the wallet count address, defaults to 0.
 * @param addressOptions.zeroCount The number of addresses with 0 balance during lookup before aborting.
 * @param addressOptions.requiredCount The max number of addresses to find.
 * @returns All the unspent addresses.
 */
export async function getUnspentAddressesWithAddressGenerator(client, seed, initialAddressState, nextAddressPath, addressOptions) {
    var _a, _b;
    const localClient = typeof client === "string" ? new SingleNodeClient(client) : client;
    const bech32Hrp = await localClient.bech32Hrp();
    const localRequiredLimit = (_a = addressOptions === null || addressOptions === void 0 ? void 0 : addressOptions.requiredCount) !== null && _a !== void 0 ? _a : Number.MAX_SAFE_INTEGER;
    const localZeroCount = (_b = addressOptions === null || addressOptions === void 0 ? void 0 : addressOptions.zeroCount) !== null && _b !== void 0 ? _b : 20;
    let finished = false;
    const allUnspent = [];
    let zeroBalance = 0;
    do {
        const path = nextAddressPath(initialAddressState);
        const addressSeed = seed.generateSeedFromPath(new Bip32Path(path));
        const ed25519Address = new Ed25519Address(addressSeed.keyPair().publicKey);
        const addressBytes = ed25519Address.toAddress();
        const addressBech32 = Bech32Helper.toBech32(ED25519_ADDRESS_TYPE, addressBytes, bech32Hrp);
        const balance = await calculateAddressBalance(localClient, addressBech32);
        // If there is no balance we increment the counter and end
        // the text when we have reached the count
        if (balance === 0) {
            zeroBalance++;
            if (zeroBalance >= localZeroCount) {
                finished = true;
            }
        }
        else {
            allUnspent.push({
                address: addressBech32,
                path,
                balance
            });
            if (allUnspent.length === localRequiredLimit) {
                finished = true;
            }
        }
    } while (!finished);
    return allUnspent;
}
/**
 * Calculate address balance for an address.
 * @param client The client for communications.
 * @param addressBech32 The address in bech32 format.
 * @returns The unspent balance.
 */
export async function calculateAddressBalance(client, addressBech32) {
    const indexerPlugin = new IndexerPluginClient(client);
    let count = 0;
    let cursor;
    let balance = 0;
    do {
        const outputResponse = await indexerPlugin.outputs({
            addressBech32,
            pageSize: 20,
            cursor
        });
        count = outputResponse.items.length;
        cursor = outputResponse.cursor;
        for (const outputId of outputResponse.items) {
            const output = await client.output(outputId);
            if (output.output.type === BASIC_OUTPUT_TYPE && !output.isSpent) {
                balance += output.output.amount;
            }
        }
    } while (count > 0 && cursor);
    return balance;
}
