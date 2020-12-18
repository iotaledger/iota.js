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
 * @param startIndex The start index for the wallet count address, defaults to 0.
 * @returns The id of the message created and the contructed message.
 */
function send(client, seed, accountIndex, addressBech32, amount, startIndex) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, sendMultiple(client, seed, accountIndex, [{ addressBech32: addressBech32, amount: amount }], startIndex)];
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
 * @param startIndex The start index for the wallet count address, defaults to 0.
 * @returns The id of the message created and the contructed message.
 */
function sendEd25519(client, seed, accountIndex, addressEd25519, amount, startIndex) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, sendMultipleEd25519(client, seed, accountIndex, [{ addressEd25519: addressEd25519, amount: amount }], startIndex)];
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
 * @param startIndex The start index for the wallet count address, defaults to 0.
 * @returns The id of the message created and the contructed message.
 */
function sendMultiple(client, seed, accountIndex, outputs, startIndex) {
    return __awaiter(this, void 0, void 0, function () {
        var hexOutputs;
        return __generator(this, function (_a) {
            hexOutputs = outputs.map(function (output) {
                var bech32Details = bech32Helper_1.Bech32Helper.fromBech32(output.addressBech32);
                if (!bech32Details) {
                    throw new Error("Unable to decode bech32 address");
                }
                return {
                    address: converter_1.Converter.bytesToHex(bech32Details.addressBytes),
                    addressType: bech32Details.addressType,
                    amount: output.amount
                };
            });
            return [2 /*return*/, sendWithAddressGenerator(client, seed, {
                    accountIndex: accountIndex,
                    addressIndex: startIndex !== null && startIndex !== void 0 ? startIndex : 0,
                    isInternal: false
                }, addresses_1.generateBip44Address, hexOutputs)];
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
 * @param startIndex The start index for the wallet count address, defaults to 0.
 * @returns The id of the message created and the contructed message.
 */
function sendMultipleEd25519(client, seed, accountIndex, outputs, startIndex) {
    return __awaiter(this, void 0, void 0, function () {
        var hexOutputs;
        return __generator(this, function (_a) {
            hexOutputs = outputs.map(function (output) { return ({ address: output.addressEd25519, addressType: IEd25519Address_1.ED25519_ADDRESS_TYPE, amount: output.amount }); });
            return [2 /*return*/, sendWithAddressGenerator(client, seed, {
                    accountIndex: accountIndex,
                    addressIndex: startIndex !== null && startIndex !== void 0 ? startIndex : 0,
                    isInternal: false
                }, addresses_1.generateBip44Address, hexOutputs)];
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
 * @returns The id of the message created and the contructed message.
 */
function sendWithAddressGenerator(client, seed, initialAddressState, nextAddressPath, outputs) {
    return __awaiter(this, void 0, void 0, function () {
        var inputsAndKeys, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, calculateInputs(client, seed, initialAddressState, nextAddressPath, outputs, 5)];
                case 1:
                    inputsAndKeys = _a.sent();
                    return [4 /*yield*/, sendAdvanced_1.sendAdvanced(client, inputsAndKeys, outputs)];
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
    return __awaiter(this, void 0, void 0, function () {
        var requiredBalance, localZeroCount, consumedBalance, inputsAndSignatureKeyPairs, finished, isFirst, zeroBalance, path, addressSeed, addressKeyPair, ed25519Address, address, addressOutputIds, _i, _a, addressOutputId, addressOutput, input;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    requiredBalance = outputs.reduce(function (total, output) { return total + output.amount; }, 0);
                    localZeroCount = zeroCount !== null && zeroCount !== void 0 ? zeroCount : 5;
                    consumedBalance = 0;
                    inputsAndSignatureKeyPairs = [];
                    finished = false;
                    isFirst = true;
                    zeroBalance = 0;
                    _b.label = 1;
                case 1:
                    path = nextAddressPath(initialAddressState, isFirst);
                    isFirst = false;
                    addressSeed = seed.generateSeedFromPath(new bip32Path_1.Bip32Path(path));
                    addressKeyPair = addressSeed.keyPair();
                    ed25519Address = new ed25519Address_1.Ed25519Address(addressKeyPair.publicKey);
                    address = converter_1.Converter.bytesToHex(ed25519Address.toAddress());
                    return [4 /*yield*/, client.addressEd25519Outputs(address)];
                case 2:
                    addressOutputIds = _b.sent();
                    if (!(addressOutputIds.count === 0)) return [3 /*break*/, 3];
                    zeroBalance++;
                    if (zeroBalance >= localZeroCount) {
                        finished = true;
                    }
                    return [3 /*break*/, 7];
                case 3:
                    _i = 0, _a = addressOutputIds.outputIds;
                    _b.label = 4;
                case 4:
                    if (!(_i < _a.length)) return [3 /*break*/, 7];
                    addressOutputId = _a[_i];
                    return [4 /*yield*/, client.output(addressOutputId)];
                case 5:
                    addressOutput = _b.sent();
                    if (!addressOutput.isSpent &&
                        consumedBalance < requiredBalance) {
                        if (addressOutput.output.amount === 0) {
                            zeroBalance++;
                            if (zeroBalance >= localZeroCount) {
                                finished = true;
                            }
                        }
                        else {
                            consumedBalance += addressOutput.output.amount;
                            input = {
                                type: 0,
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
                    _b.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 4];
                case 7:
                    if (!finished) return [3 /*break*/, 1];
                    _b.label = 8;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWdoTGV2ZWwvc2VuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLGlFQUFnRTtBQUNoRSxpREFBZ0Q7QUFHaEQsNkRBQWlFO0FBS2pFLHNEQUFxRDtBQUNyRCxnREFBK0M7QUFDL0MseUNBQW1EO0FBQ25ELCtDQUE4QztBQUU5Qzs7Ozs7Ozs7O0dBU0c7QUFDSCxTQUFzQixJQUFJLENBQ3RCLE1BQWUsRUFDZixJQUFXLEVBQ1gsWUFBb0IsRUFDcEIsYUFBcUIsRUFDckIsTUFBYyxFQUNkLFVBQW1COzs7WUFJbkIsc0JBQU8sWUFBWSxDQUNmLE1BQU0sRUFDTixJQUFJLEVBQ0osWUFBWSxFQUNaLENBQUMsRUFBRSxhQUFhLGVBQUEsRUFBRSxNQUFNLFFBQUEsRUFBRSxDQUFDLEVBQzNCLFVBQVUsQ0FDYixFQUFDOzs7Q0FDTDtBQWpCRCxvQkFpQkM7QUFFRDs7Ozs7Ozs7O0dBU0c7QUFDSCxTQUFzQixXQUFXLENBQzdCLE1BQWUsRUFDZixJQUFXLEVBQ1gsWUFBb0IsRUFDcEIsY0FBc0IsRUFDdEIsTUFBYyxFQUNkLFVBQW1COzs7WUFJbkIsc0JBQU8sbUJBQW1CLENBQ3RCLE1BQU0sRUFDTixJQUFJLEVBQ0osWUFBWSxFQUNaLENBQUMsRUFBRSxjQUFjLGdCQUFBLEVBQUUsTUFBTSxRQUFBLEVBQUUsQ0FBQyxFQUM1QixVQUFVLENBQ2IsRUFBQzs7O0NBQ0w7QUFqQkQsa0NBaUJDO0FBRUQ7Ozs7Ozs7O0dBUUc7QUFDSCxTQUFzQixZQUFZLENBQzlCLE1BQWUsRUFDZixJQUFXLEVBQ1gsWUFBb0IsRUFDcEIsT0FHRyxFQUNILFVBQW1COzs7O1lBSWIsVUFBVSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBQSxNQUFNO2dCQUNqQyxJQUFNLGFB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