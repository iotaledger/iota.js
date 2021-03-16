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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateInputs = exports.sendWithAddressGenerator = exports.sendMultipleEd25519 = exports.sendMultiple = exports.sendEd25519 = exports.send = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
var ed25519Address_1 = require("../addressTypes/ed25519Address");
var singleNodeClient_1 = require("../clients/singleNodeClient");
var bip32Path_1 = require("../crypto/bip32Path");
var IEd25519Address_1 = require("../models/IEd25519Address");
var IUTXOInput_1 = require("../models/IUTXOInput");
var bech32Helper_1 = require("../utils/bech32Helper");
var converter_1 = require("../utils/converter");
var addresses_1 = require("./addresses");
var sendAdvanced_1 = require("./sendAdvanced");
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
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, sendMultiple(client, seed, accountIndex, [{ addressBech32: addressBech32, amount: amount }], indexation, addressOptions)];
        });
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
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, sendMultipleEd25519(client, seed, accountIndex, [{ addressEd25519: addressEd25519, amount: amount }], indexation, addressOptions)];
        });
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
    return __awaiter(this, void 0, void 0, function () {
        var localClient, nodeInfo, hexOutputs;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    localClient = typeof client === "string" ? new singleNodeClient_1.SingleNodeClient(client) : client;
                    return [4 /*yield*/, localClient.info()];
                case 1:
                    nodeInfo = _b.sent();
                    hexOutputs = outputs.map(function (output) {
                        var bech32Details = bech32Helper_1.Bech32Helper.fromBech32(output.addressBech32, nodeInfo.bech32HRP);
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
                    return [2 /*return*/, sendWithAddressGenerator(client, seed, {
                            accountIndex: accountIndex,
                            addressIndex: (_a = addressOptions === null || addressOptions === void 0 ? void 0 : addressOptions.startIndex) !== null && _a !== void 0 ? _a : 0,
                            isInternal: false
                        }, addresses_1.generateBip44Address, hexOutputs, indexation, addressOptions === null || addressOptions === void 0 ? void 0 : addressOptions.zeroCount)];
            }
        });
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
    return __awaiter(this, void 0, void 0, function () {
        var hexOutputs;
        return __generator(this, function (_b) {
            hexOutputs = outputs.map(function (output) { return ({
                address: output.addressEd25519,
                addressType: IEd25519Address_1.ED25519_ADDRESS_TYPE,
                amount: output.amount,
                isDustAllowance: output.isDustAllowance
            }); });
            return [2 /*return*/, sendWithAddressGenerator(client, seed, {
                    accountIndex: accountIndex,
                    addressIndex: (_a = addressOptions === null || addressOptions === void 0 ? void 0 : addressOptions.startIndex) !== null && _a !== void 0 ? _a : 0,
                    isInternal: false
                }, addresses_1.generateBip44Address, hexOutputs, indexation, addressOptions === null || addressOptions === void 0 ? void 0 : addressOptions.zeroCount)];
        });
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
    return __awaiter(this, void 0, void 0, function () {
        var inputsAndKeys, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, calculateInputs(client, seed, initialAddressState, nextAddressPath, outputs, zeroCount)];
                case 1:
                    inputsAndKeys = _a.sent();
                    return [4 /*yield*/, sendAdvanced_1.sendAdvanced(client, inputsAndKeys, outputs, indexation)];
                case 2:
                    response = _a.sent();
                    return [2 /*return*/, {
                            messageId: response.messageId,
                            message: response.message
                        }];
            }
        });
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
function calculateInputs(client, seed, initialAddressState, nextAddressPath, outputs, zeroCount) {
    if (zeroCount === void 0) { zeroCount = 5; }
    return __awaiter(this, void 0, void 0, function () {
        var localClient, requiredBalance, _i, outputs_1, output, consumedBalance, inputsAndSignatureKeyPairs, finished, isFirst, zeroBalance, path, addressSeed, addressKeyPair, ed25519Address, address, addressOutputIds, _a, _b, addressOutputId, addressOutput, input;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    localClient = typeof client === "string" ? new singleNodeClient_1.SingleNodeClient(client) : client;
                    requiredBalance = 0;
                    for (_i = 0, outputs_1 = outputs; _i < outputs_1.length; _i++) {
                        output = outputs_1[_i];
                        requiredBalance += output.amount;
                    }
                    consumedBalance = 0;
                    inputsAndSignatureKeyPairs = [];
                    finished = false;
                    isFirst = true;
                    zeroBalance = 0;
                    _c.label = 1;
                case 1:
                    path = nextAddressPath(initialAddressState, isFirst);
                    isFirst = false;
                    addressSeed = seed.generateSeedFromPath(new bip32Path_1.Bip32Path(path));
                    addressKeyPair = addressSeed.keyPair();
                    ed25519Address = new ed25519Address_1.Ed25519Address(addressKeyPair.publicKey);
                    address = converter_1.Converter.bytesToHex(ed25519Address.toAddress());
                    return [4 /*yield*/, localClient.addressEd25519Outputs(address)];
                case 2:
                    addressOutputIds = _c.sent();
                    if (!(addressOutputIds.count === 0)) return [3 /*break*/, 3];
                    zeroBalance++;
                    if (zeroBalance >= zeroCount) {
                        finished = true;
                    }
                    return [3 /*break*/, 7];
                case 3:
                    _a = 0, _b = addressOutputIds.outputIds;
                    _c.label = 4;
                case 4:
                    if (!(_a < _b.length)) return [3 /*break*/, 7];
                    addressOutputId = _b[_a];
                    return [4 /*yield*/, localClient.output(addressOutputId)];
                case 5:
                    addressOutput = _c.sent();
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
                            input = {
                                type: IUTXOInput_1.UTXO_INPUT_TYPE,
                                transactionId: addressOutput.transactionId,
                                transactionOutputIndex: addressOutput.outputIndex
                            };
                            inputsAndSignatureKeyPairs.push({
                                input: input,
                                addressKeyPair: addressKeyPair
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
                    _c.label = 6;
                case 6:
                    _a++;
                    return [3 /*break*/, 4];
                case 7:
                    if (!finished) return [3 /*break*/, 1];
                    _c.label = 8;
                case 8:
                    if (consumedBalance < requiredBalance) {
                        throw new Error("There are not enough funds in the inputs for the required balance");
                    }
                    return [2 /*return*/, inputsAndSignatureKeyPairs];
            }
        });
    });
}
exports.calculateInputs = calculateInputs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWdoTGV2ZWwvc2VuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLGlFQUFnRTtBQUNoRSxnRUFBK0Q7QUFDL0QsaURBQWdEO0FBR2hELDZEQUFpRTtBQUlqRSxtREFBbUU7QUFDbkUsc0RBQXFEO0FBQ3JELGdEQUErQztBQUMvQyx5Q0FBbUQ7QUFDbkQsK0NBQThDO0FBRTlDOzs7Ozs7Ozs7Ozs7OztHQWNHO0FBQ0gsU0FBc0IsSUFBSSxDQUN0QixNQUF3QixFQUN4QixJQUFXLEVBQ1gsWUFBb0IsRUFDcEIsYUFBcUIsRUFDckIsTUFBYyxFQUNkLFVBR0MsRUFDRCxjQUdDOzs7WUFLRCxzQkFBTyxZQUFZLENBQ2YsTUFBTSxFQUNOLElBQUksRUFDSixZQUFZLEVBQ1osQ0FBQyxFQUFFLGFBQWEsZUFBQSxFQUFFLE1BQU0sUUFBQSxFQUFFLENBQUMsRUFDM0IsVUFBVSxFQUNWLGNBQWMsQ0FDakIsRUFBQzs7O0NBQ0w7QUExQkQsb0JBMEJDO0FBRUQ7Ozs7Ozs7Ozs7Ozs7O0dBY0c7QUFDSCxTQUFzQixXQUFXLENBQzdCLE1BQXdCLEVBQ3hCLElBQVcsRUFDWCxZQUFvQixFQUNwQixjQUFzQixFQUN0QixNQUFjLEVBQ2QsVUFHQyxFQUNELGNBR0M7OztZQUtELHNCQUFPLG1CQUFtQixDQUN0QixNQUFNLEVBQ04sSUFBSSxFQUNKLFlBQVksRUFDWixDQUFDLEVBQUUsY0FBYyxnQkFBQSxFQUFFLE1BQU0sUUFBQSxFQUFFLENBQUMsRUFDNUIsVUFBVSxFQUNWLGNBQWMsQ0FDakIsRUFBQzs7O0NBQ0w7QUExQkQsa0NBMEJDO0FBRUQ7Ozs7Ozs7Ozs7Ozs7R0FhRztBQUNILFNBQXNCLFlBQVksQ0FDOUIsTUFBd0IsRUFDeEIsSUFBVyxFQUNYLFlBQW9C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