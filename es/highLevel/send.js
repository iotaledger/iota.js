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
                }, addresses_1.generateAccountAddress, hexOutputs)];
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
                }, addresses_1.generateAccountAddress, hexOutputs)];
        });
    });
}
exports.sendMultipleEd25519 = sendMultipleEd25519;
/**
 * Send a transfer using account based indexing for the inputs.
 * @param client The client to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param initialAddressState The initial address state for calculating the addresses.
 * @param nextAddress Calculate the next address for inputs.
 * @param outputs The address to send the funds to in bech32 format and amounts.
 * @returns The id of the message created and the contructed message.
 */
function sendWithAddressGenerator(client, seed, initialAddressState, nextAddress, outputs) {
    return __awaiter(this, void 0, void 0, function () {
        var inputsAndKeys, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, calculateInputs(client, seed, initialAddressState, nextAddress, outputs, 5)];
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
 * @param nextAddress Calculate the next address for inputs.
 * @param outputs The outputs to send.
 * @param zeroCount Abort when the number of zero balances is exceeded.
 * @returns The id of the message created and the contructed message.
 */
function calculateInputs(client, seed, initialAddressState, nextAddress, outputs, zeroCount) {
    return __awaiter(this, void 0, void 0, function () {
        var requiredBalance, localZeroCount, consumedBalance, inputsAndSignatureKeyPairs, finished, isFirst, zeroBalance, keyPairAndPath, ed25519Address, address, addressOutputIds, _i, _a, addressOutputId, addressOutput, input;
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
                    keyPairAndPath = nextAddress(seed, initialAddressState, isFirst);
                    isFirst = false;
                    ed25519Address = new ed25519Address_1.Ed25519Address(keyPairAndPath.keyPair.publicKey);
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
                                addressKeyPair: keyPairAndPath.keyPair
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWdoTGV2ZWwvc2VuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLGlFQUFnRTtBQUloRSw2REFBaUU7QUFLakUsc0RBQXFEO0FBQ3JELGdEQUErQztBQUMvQyx5Q0FBcUQ7QUFDckQsK0NBQThDO0FBRTlDOzs7Ozs7Ozs7R0FTRztBQUNILFNBQXNCLElBQUksQ0FDdEIsTUFBZSxFQUNmLElBQVcsRUFDWCxZQUFvQixFQUNwQixhQUFxQixFQUNyQixNQUFjLEVBQ2QsVUFBbUI7OztZQUluQixzQkFBTyxZQUFZLENBQ2YsTUFBTSxFQUNOLElBQUksRUFDSixZQUFZLEVBQ1osQ0FBQyxFQUFFLGFBQWEsZUFBQSxFQUFFLE1BQU0sUUFBQSxFQUFFLENBQUMsRUFDM0IsVUFBVSxDQUNiLEVBQUM7OztDQUNMO0FBakJELG9CQWlCQztBQUVEOzs7Ozs7Ozs7R0FTRztBQUNILFNBQXNCLFdBQVcsQ0FDN0IsTUFBZSxFQUNmLElBQVcsRUFDWCxZQUFvQixFQUNwQixjQUFzQixFQUN0QixNQUFjLEVBQ2QsVUFBbUI7OztZQUluQixzQkFBTyxtQkFBbUIsQ0FDdEIsTUFBTSxFQUNOLElBQUksRUFDSixZQUFZLEVBQ1osQ0FBQyxFQUFFLGNBQWMsZ0JBQUEsRUFBRSxNQUFNLFFBQUEsRUFBRSxDQUFDLEVBQzVCLFVBQVUsQ0FDYixFQUFDOzs7Q0FDTDtBQWpCRCxrQ0FpQkM7QUFFRDs7Ozs7Ozs7R0FRRztBQUNILFNBQXNCLFlBQVksQ0FDOUIsTUFBZSxFQUNmLElBQVcsRUFDWCxZQUFvQixFQUNwQixPQUdHLEVBQ0gsVUFBbUI7Ozs7WUFJYixVQUFVLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFBLE1BQU07Z0JBQ2pDLElBQU0sYUFBYSxHQUFHLDJCQUFZ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