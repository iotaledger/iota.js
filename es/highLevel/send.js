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
var bip32Path_1 = require("../crypto/bip32Path");
var IEd25519Address_1 = require("../models/IEd25519Address");
var ISigLockedDustAllowanceOutput_1 = require("../models/ISigLockedDustAllowanceOutput");
var ISigLockedSingleOutput_1 = require("../models/ISigLockedSingleOutput");
var IUTXOInput_1 = require("../models/IUTXOInput");
var bech32Helper_1 = require("../utils/bech32Helper");
var converter_1 = require("../utils/converter");
var addresses_1 = require("./addresses");
var sendAdvanced_1 = require("./sendAdvanced");
/**
 * Send a transfer from the balance on the seed to a single output.
 * @param client The client to send the transfer with.
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
 * @param client The client to send the transfer with.
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
 * @param client The client to send the transfer with.
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
        var nodeInfo, hexOutputs;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, client.info()];
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
 * @param client The client to send the transfer with.
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
 * @param client The client to send the transfer with.
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
 * @param client The client to send the transfer with.
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
        var requiredBalance, _i, outputs_1, output, consumedBalance, inputsAndSignatureKeyPairs, finished, isFirst, zeroBalance, path, addressSeed, addressKeyPair, ed25519Address, address, addressOutputIds, _a, _b, addressOutputId, addressOutput, output, input;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
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
                    return [4 /*yield*/, client.addressEd25519Outputs(address)];
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
                    return [4 /*yield*/, client.output(addressOutputId)];
                case 5:
                    addressOutput = _c.sent();
                    if (!addressOutput.isSpent &&
                        consumedBalance < requiredBalance) {
                        output = void 0;
                        if (addressOutput.output.type === ISigLockedSingleOutput_1.SIG_LOCKED_SINGLE_OUTPUT_TYPE) {
                            output = addressOutput.output;
                        }
                        else if (addressOutput.output.type === ISigLockedDustAllowanceOutput_1.SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE) {
                            output = addressOutput.output;
                        }
                        if (output) {
                            if (output.amount === 0) {
                                zeroBalance++;
                                if (zeroBalance >= zeroCount) {
                                    finished = true;
                                }
                            }
                            else {
                                consumedBalance += output.amount;
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
                                            address: output.address.address,
                                            addressType: output.address.type
                                        });
                                    }
                                    finished = true;
                                }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWdoTGV2ZWwvc2VuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLGlFQUFnRTtBQUNoRSxpREFBZ0Q7QUFHaEQsNkRBQWlFO0FBSWpFLHlGQUErSDtBQUMvSCwyRUFBeUc7QUFDekcsbURBQW1FO0FBQ25FLHNEQUFxRDtBQUNyRCxnREFBK0M7QUFDL0MseUNBQW1EO0FBQ25ELCtDQUE4QztBQUU5Qzs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQUNILFNBQXNCLElBQUksQ0FDdEIsTUFBZSxFQUNmLElBQVcsRUFDWCxZQUFvQixFQUNwQixhQUFxQixFQUNyQixNQUFjLEVBQ2QsVUFHQyxFQUNELGNBR0M7OztZQUtELHNCQUFPLFlBQVksQ0FDZixNQUFNLEVBQ04sSUFBSSxFQUNKLFlBQVksRUFDWixDQUFDLEVBQUUsYUFBYSxlQUFBLEVBQUUsTUFBTSxRQUFBLEVBQUUsQ0FBQyxFQUMzQixVQUFVLEVBQ1YsY0FBYyxDQUNqQixFQUFDOzs7Q0FDTDtBQTFCRCxvQkEwQkM7QUFFRDs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQUNILFNBQXNCLFdBQVcsQ0FDN0IsTUFBZSxFQUNmLElBQVcsRUFDWCxZQUFvQixFQUNwQixjQUFzQixFQUN0QixNQUFjLEVBQ2QsVUFHQyxFQUNELGNBR0M7OztZQUtELHNCQUFPLG1CQUFtQixDQUN0QixNQUFNLEVBQ04sSUFBSSxFQUNKLFlBQVksRUFDWixDQUFDLEVBQUUsY0FBYyxnQkFBQSxFQUFFLE1BQU0sUUFBQSxFQUFFLENBQUMsRUFDNUIsVUFBVSxFQUNWLGNBQWMsQ0FDakIsRUFBQzs7O0NBQ0w7QUExQkQsa0NBMEJDO0FBRUQ7Ozs7Ozs7Ozs7Ozs7R0FhRztBQUNILFNBQXNCLFlBQVksQ0FDOUIsTUFBZSxFQUNmLElBQVcsRUFD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