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
exports.calculateInputs = exports.sendMultipleEd25519 = exports.sendMultiple = exports.sendEd25519 = exports.send = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
var ed25519Address_1 = require("../addressTypes/ed25519Address");
var IEd25519Address_1 = require("../models/IEd25519Address");
var bech32Helper_1 = require("../utils/bech32Helper");
var converter_1 = require("../utils/converter");
var sendAdvanced_1 = require("./sendAdvanced");
/**
 * Send a transfer from the balance on the seed to a single output.
 * @param client The client to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param basePath The base path to start looking for addresses.
 * @param addressBech32 The address to send the funds to in bech32 format.
 * @param amount The amount to send.
 * @param startIndex The start index for the wallet count address, defaults to 0.
 * @returns The id of the message created and the contructed message.
 */
function send(client, seed, basePath, addressBech32, amount, startIndex) {
    return __awaiter(this, void 0, void 0, function () {
        var bech32Details, outputs, inputsAndKey, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    bech32Details = bech32Helper_1.Bech32Helper.fromBech32(addressBech32);
                    if (!bech32Details) {
                        throw new Error("Unable to decode bech32 address");
                    }
                    outputs = [
                        {
                            address: converter_1.Converter.bytesToHex(bech32Details.addressBytes),
                            addressType: bech32Details.addressType,
                            amount: amount
                        }
                    ];
                    return [4 /*yield*/, calculateInputs(client, seed, basePath, outputs, startIndex)];
                case 1:
                    inputsAndKey = _a.sent();
                    return [4 /*yield*/, sendAdvanced_1.sendAdvanced(client, inputsAndKey, outputs)];
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
exports.send = send;
/**
 * Send a transfer from the balance on the seed to a single output.
 * @param client The client to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param basePath The base path to start looking for addresses.
 * @param addressEd25519 The address to send the funds to in ed25519 format.
 * @param amount The amount to send.
 * @param startIndex The start index for the wallet count address, defaults to 0.
 * @returns The id of the message created and the contructed message.
 */
function sendEd25519(client, seed, basePath, addressEd25519, amount, startIndex) {
    return __awaiter(this, void 0, void 0, function () {
        var outputs, inputsAndKey, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    outputs = [{ address: addressEd25519, addressType: IEd25519Address_1.ED25519_ADDRESS_TYPE, amount: amount }];
                    return [4 /*yield*/, calculateInputs(client, seed, basePath, outputs, startIndex)];
                case 1:
                    inputsAndKey = _a.sent();
                    return [4 /*yield*/, sendAdvanced_1.sendAdvanced(client, inputsAndKey, outputs)];
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
exports.sendEd25519 = sendEd25519;
/**
 * Send a transfer from the balance on the seed to multiple outputs.
 * @param client The client to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param basePath The base path to start looking for addresses.
 * @param outputs The address to send the funds to in bech32 format and amounts.
 * @param startIndex The start index for the wallet count address, defaults to 0.
 * @returns The id of the message created and the contructed message.
 */
function sendMultiple(client, seed, basePath, outputs, startIndex) {
    return __awaiter(this, void 0, void 0, function () {
        var hexOutputs, inputsAndKey, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
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
                    return [4 /*yield*/, calculateInputs(client, seed, basePath, hexOutputs, startIndex)];
                case 1:
                    inputsAndKey = _a.sent();
                    return [4 /*yield*/, sendAdvanced_1.sendAdvanced(client, inputsAndKey, hexOutputs)];
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
exports.sendMultiple = sendMultiple;
/**
 * Send a transfer from the balance on the seed.
 * @param client The client to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param basePath The base path to start looking for addresses.
 * @param outputs The outputs including address to send the funds to in ed25519 format and amount.
 * @param startIndex The start index for the wallet count address, defaults to 0.
 * @returns The id of the message created and the contructed message.
 */
function sendMultipleEd25519(client, seed, basePath, outputs, startIndex) {
    return __awaiter(this, void 0, void 0, function () {
        var hexOutputs, inputsAndKey, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    hexOutputs = outputs.map(function (output) { return ({ address: output.addressEd25519, addressType: IEd25519Address_1.ED25519_ADDRESS_TYPE, amount: output.amount }); });
                    return [4 /*yield*/, calculateInputs(client, seed, basePath, hexOutputs, startIndex)];
                case 1:
                    inputsAndKey = _a.sent();
                    return [4 /*yield*/, sendAdvanced_1.sendAdvanced(client, inputsAndKey, hexOutputs)];
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
exports.sendMultipleEd25519 = sendMultipleEd25519;
/**
 * Calculate the inputs from the seed and basePath.
 * @param client The client to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param basePath The base path to start looking for addresses.
 * @param outputs The outputs to send.
 * @param startIndex The start index for the wallet count address, defaults to 0.
 * @returns The id of the message created and the contructed message.
 */
function calculateInputs(client, seed, basePath, outputs, startIndex) {
    return __awaiter(this, void 0, void 0, function () {
        var requiredBalance, localStartIndex, consumedBalance, inputsAndSignatureKeyPairs, finished, addressKeyPair, ed25519Address, address, addressOutputIds, _i, _a, addressOutputId, addressOutput, input;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    requiredBalance = outputs.reduce(function (total, output) { return total + output.amount; }, 0);
                    localStartIndex = startIndex !== null && startIndex !== void 0 ? startIndex : 0;
                    consumedBalance = 0;
                    inputsAndSignatureKeyPairs = [];
                    finished = false;
                    _b.label = 1;
                case 1:
                    basePath.push(localStartIndex);
                    addressKeyPair = seed.generateSeedFromPath(basePath).keyPair();
                    basePath.pop();
                    ed25519Address = new ed25519Address_1.Ed25519Address();
                    address = converter_1.Converter.bytesToHex(ed25519Address.publicKeyToAddress(addressKeyPair.publicKey));
                    return [4 /*yield*/, client.addressEd25519Outputs(address)];
                case 2:
                    addressOutputIds = _b.sent();
                    if (!(addressOutputIds.count === 0)) return [3 /*break*/, 3];
                    finished = true;
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
                            finished = true;
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
                    localStartIndex++;
                    _b.label = 8;
                case 8:
                    if (!finished) return [3 /*break*/, 1];
                    _b.label = 9;
                case 9:
                    if (consumedBalance < requiredBalance) {
                        throw new Error("There are not enough funds in the inputs for the required balance");
                    }
                    return [2 /*return*/, inputsAndSignatureKeyPairs];
            }
        });
    });
}
exports.calculateInputs = calculateInputs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWdoTGV2ZWwvc2VuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLGlFQUFnRTtBQUdoRSw2REFBaUU7QUFLakUsc0RBQXFEO0FBQ3JELGdEQUErQztBQUMvQywrQ0FBOEM7QUFFOUM7Ozs7Ozs7OztHQVNHO0FBQ0gsU0FBc0IsSUFBSSxDQUN0QixNQUFlLEVBQ2YsSUFBVyxFQUNYLFFBQW1CLEVBQ25CLGFBQXFCLEVBQ3JCLE1BQWMsRUFDZCxVQUFtQjs7Ozs7O29CQUliLGFBQWEsR0FBRywyQkFBWSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFDN0QsSUFBSSxDQUFDLGFBQWEsRUFBRTt3QkFDaEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO3FCQUN0RDtvQkFFSyxPQUFPLEdBQUc7d0JBQ1o7NEJBQ0ksT0FBTyxFQUFFLHFCQUFTLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUM7NEJBQ3pELFdBQVcsRUFBRSxhQUFhLENBQUMsV0FBVzs0QkFDdEMsTUFBTSxRQUFBO3lCQUNUO3FCQUNKLENBQUM7b0JBQ21CLHFCQUFNLGVBQWUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsVUFBVSxDQUFDLEVBQUE7O29CQUFqRixZQUFZLEdBQUcsU0FBa0U7b0JBRXRFLHFCQUFNLDJCQUFZLENBQy9CLE1BQU0sRUFDTixZQUFZLEVBQ1osT0FBTyxDQUFDLEVBQUE7O29CQUhOLFFBQVEsR0FBRyxTQUdMO29CQUVaLHNCQUFPOzRCQUNILFNBQVMsRUFBRSxRQUFRLENBQUMsU0FBUzs0QkFDN0IsT0FBTyxFQUFFLFFBQVEsQ0FBQyxPQUFPO3lCQUM1QixFQUFDOzs7O0NBQ0w7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