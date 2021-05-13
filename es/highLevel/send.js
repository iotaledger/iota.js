"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateInputs = exports.sendWithAddressGenerator = exports.sendMultipleEd25519 = exports.sendMultiple = exports.sendEd25519 = exports.send = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
const ed25519Address_1 = require("../addressTypes/ed25519Address");
const singleNodeClient_1 = require("../clients/singleNodeClient");
const bip32Path_1 = require("../crypto/bip32Path");
const IEd25519Address_1 = require("../models/IEd25519Address");
const IUTXOInput_1 = require("../models/IUTXOInput");
const bech32Helper_1 = require("../utils/bech32Helper");
const converter_1 = require("../utils/converter");
const addresses_1 = require("./addresses");
const sendAdvanced_1 = require("./sendAdvanced");
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
function send(client, seed, accountIndex, addressBech32, amount, indexation, addressOptions) {
    return __awaiter(this, void 0, void 0, function* () {
        return sendMultiple(client, seed, accountIndex, [{ addressBech32, amount }], indexation, addressOptions);
    });
}
exports.send = send;
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
function sendEd25519(client, seed, accountIndex, addressEd25519, amount, indexation, addressOptions) {
    return __awaiter(this, void 0, void 0, function* () {
        return sendMultipleEd25519(client, seed, accountIndex, [{ addressEd25519, amount }], indexation, addressOptions);
    });
}
exports.sendEd25519 = sendEd25519;
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
function sendMultiple(client, seed, accountIndex, outputs, indexation, addressOptions) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const localClient = typeof client === "string" ? new singleNodeClient_1.SingleNodeClient(client) : client;
        const nodeInfo = yield localClient.info();
        const hexOutputs = outputs.map(output => {
            const bech32Details = bech32Helper_1.Bech32Helper.fromBech32(output.addressBech32, nodeInfo.bech32HRP);
            if (!bech32Details) {
                throw new Error("Unable to decode bech32 address");
            }
            return {
                address: converter_1.Converter.bytesToHex(bech32Details.addressBytes),
                addressType: bech32Details.addressType,
                amount: output.amount,
                isDustAllowance: output.isDustAllowance
            };
        });
        return sendWithAddressGenerator(client, seed, {
            accountIndex,
            addressIndex: (_a = addressOptions === null || addressOptions === void 0 ? void 0 : addressOptions.startIndex) !== null && _a !== void 0 ? _a : 0,
            isInternal: false
        }, addresses_1.generateBip44Address, hexOutputs, indexation, addressOptions === null || addressOptions === void 0 ? void 0 : addressOptions.zeroCount);
    });
}
exports.sendMultiple = sendMultiple;
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
function sendMultipleEd25519(client, seed, accountIndex, outputs, indexation, addressOptions) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const hexOutputs = outputs.map(output => ({
            address: output.addressEd25519,
            addressType: IEd25519Address_1.ED25519_ADDRESS_TYPE,
            amount: output.amount,
            isDustAllowance: output.isDustAllowance
        }));
        return sendWithAddressGenerator(client, seed, {
            accountIndex,
            addressIndex: (_a = addressOptions === null || addressOptions === void 0 ? void 0 : addressOptions.startIndex) !== null && _a !== void 0 ? _a : 0,
            isInternal: false
        }, addresses_1.generateBip44Address, hexOutputs, indexation, addressOptions === null || addressOptions === void 0 ? void 0 : addressOptions.zeroCount);
    });
}
exports.sendMultipleEd25519 = sendMultipleEd25519;
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
function sendWithAddressGenerator(client, seed, initialAddressState, nextAddressPath, outputs, indexation, zeroCount) {
    return __awaiter(this, void 0, void 0, function* () {
        const inputsAndKeys = yield calculateInputs(client, seed, initialAddressState, nextAddressPath, outputs, zeroCount);
        const response = yield sendAdvanced_1.sendAdvanced(client, inputsAndKeys, outputs, indexation);
        return {
            messageId: response.messageId,
            message: response.message
        };
    });
}
exports.sendWithAddressGenerator = sendWithAddressGenerator;
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
function calculateInputs(client, seed, initialAddressState, nextAddressPath, outputs, zeroCount = 5) {
    return __awaiter(this, void 0, void 0, function* () {
        const localClient = typeof client === "string" ? new singleNodeClient_1.SingleNodeClient(client) : client;
        let requiredBalance = 0;
        for (const output of outputs) {
            requiredBalance += output.amount;
        }
        let consumedBalance = 0;
        const inputsAndSignatureKeyPairs = [];
        let finished = false;
        let isFirst = true;
        let zeroBalance = 0;
        do {
            const path = nextAddressPath(initialAddressState, isFirst);
            isFirst = false;
            const addressSeed = seed.generateSeedFromPath(new bip32Path_1.Bip32Path(path));
            const addressKeyPair = addressSeed.keyPair();
            const ed25519Address = new ed25519Address_1.Ed25519Address(addressKeyPair.publicKey);
            const address = converter_1.Converter.bytesToHex(ed25519Address.toAddress());
            const addressOutputIds = yield localClient.addressEd25519Outputs(address);
            if (addressOutputIds.count === 0) {
                zeroBalance++;
                if (zeroBalance >= zeroCount) {
                    finished = true;
                }
            }
            else {
                for (const addressOutputId of addressOutputIds.outputIds) {
                    const addressOutput = yield localClient.output(addressOutputId);
                    if (!addressOutput.isSpent &&
                        consumedBalance < requiredBalance) {
                        if (addressOutput.output.amount === 0) {
                            zeroBalance++;
                            if (zeroBalance >= zeroCount) {
                                finished = true;
                            }
                        }
                        else {
                            consumedBalance += addressOutput.output.amount;
                            const input = {
                                type: IUTXOInput_1.UTXO_INPUT_TYPE,
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
    });
}
exports.calculateInputs = calculateInputs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWdoTGV2ZWwvc2VuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLG1FQUFnRTtBQUNoRSxrRUFBK0Q7QUFDL0QsbURBQWdEO0FBR2hELCtEQUFpRTtBQUlqRSxxREFBbUU7QUFDbkUsd0RBQXFEO0FBQ3JELGtEQUErQztBQUMvQywyQ0FBbUQ7QUFDbkQsaURBQThDO0FBRTlDOzs7Ozs7Ozs7Ozs7OztHQWNHO0FBQ0gsU0FBc0IsSUFBSSxDQUN0QixNQUF3QixFQUN4QixJQUFXLEVBQ1gsWUFBb0IsRUFDcEIsYUFBcUIsRUFDckIsTUFBYyxFQUNkLFVBR0MsRUFDRCxjQUdDOztRQUtELE9BQU8sWUFBWSxDQUNmLE1BQU0sRUFDTixJQUFJLEVBQ0osWUFBWSxFQUNaLENBQUMsRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFDM0IsVUFBVSxFQUNWLGNBQWMsQ0FDakIsQ0FBQztJQUNOLENBQUM7Q0FBQTtBQTFCRCxvQkEwQkM7QUFFRDs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQUNILFNBQXNCLFdBQVcsQ0FDN0IsTUFBd0IsRUFDeEIsSUFBVyxFQUNYLFlBQW9CLEVBQ3BCLGNBQXNCLEVBQ3RCLE1BQWMsRUFDZCxVQUdDLEVBQ0QsY0FHQzs7UUFLRCxPQUFPLG1CQUFtQixDQUN0QixNQUFNLEVBQ04sSUFBSSxFQUNKLFlBQVksRUFDWixDQUFDLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQzVCLFVBQVUsRUFDVixjQUFjLENBQ2pCLENBQUM7SUFDTixDQUFDO0NBQUE7QUExQkQsa0NBMEJDO0FBRUQ7Ozs7Ozs7Ozs7Ozs7R0FhRztBQUNILFNBQXNCLFlBQVksQ0FDOUIsTUFBd0IsRUFDeEIsSUFBVyxFQUNYLFlBQW9CLEVBQ3BCLE9BSUcsRUFDSCxVQUdDLEVBQ0QsY0FHQzs7O1FB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