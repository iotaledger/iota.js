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
 * @param startIndex The start index for the wallet count address, defaults to 0.
 * @param indexationKey Optional indexation key.
 * @param indexationData Optional index data.
 * @returns The id of the message created and the contructed message.
 */
function send(client, seed, accountIndex, addressBech32, amount, startIndex, indexationKey, indexationData) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, sendMultiple(client, seed, accountIndex, [{ addressBech32: addressBech32, amount: amount }], startIndex, indexationKey, indexationData)];
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
 * @param indexationKey Optional indexation key.
 * @param indexationData Optional index data.
 * @returns The id of the message created and the contructed message.
 */
function sendEd25519(client, seed, accountIndex, addressEd25519, amount, startIndex, indexationKey, indexationData) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, sendMultipleEd25519(client, seed, accountIndex, [{ addressEd25519: addressEd25519, amount: amount }], startIndex, indexationKey, indexationData)];
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
 * @param indexationKey Optional indexation key.
 * @param indexationData Optional index data.
 * @returns The id of the message created and the contructed message.
 */
function sendMultiple(client, seed, accountIndex, outputs, startIndex, indexationKey, indexationData) {
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
                    amount: output.amount,
                    isDustAllowance: output.isDustAllowance
                };
            });
            return [2 /*return*/, sendWithAddressGenerator(client, seed, {
                    accountIndex: accountIndex,
                    addressIndex: startIndex !== null && startIndex !== void 0 ? startIndex : 0,
                    isInternal: false
                }, addresses_1.generateBip44Address, hexOutputs, indexationKey, indexationData)];
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
 * @param indexationKey Optional indexation key.
 * @param indexationData Optional index data.
 * @returns The id of the message created and the contructed message.
 */
function sendMultipleEd25519(client, seed, accountIndex, outputs, startIndex, indexationKey, indexationData) {
    return __awaiter(this, void 0, void 0, function () {
        var hexOutputs;
        return __generator(this, function (_a) {
            hexOutputs = outputs.map(function (output) { return ({
                address: output.addressEd25519,
                addressType: IEd25519Address_1.ED25519_ADDRESS_TYPE,
                amount: output.amount,
                isDustAllowance: output.isDustAllowance
            }); });
            return [2 /*return*/, sendWithAddressGenerator(client, seed, {
                    accountIndex: accountIndex,
                    addressIndex: startIndex !== null && startIndex !== void 0 ? startIndex : 0,
                    isInternal: false
                }, addresses_1.generateBip44Address, hexOutputs, indexationKey, indexationData)];
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
 * @param indexationKey Optional indexation key.
 * @param indexationData Optional index data.
 * @returns The id of the message created and the contructed message.
 */
function sendWithAddressGenerator(client, seed, initialAddressState, nextAddressPath, outputs, indexationKey, indexationData) {
    return __awaiter(this, void 0, void 0, function () {
        var inputsAndKeys, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, calculateInputs(client, seed, initialAddressState, nextAddressPath, outputs, 5)];
                case 1:
                    inputsAndKeys = _a.sent();
                    return [4 /*yield*/, sendAdvanced_1.sendAdvanced(client, inputsAndKeys, outputs, indexationKey, indexationData)];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWdoTGV2ZWwvc2VuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLGlFQUFnRTtBQUNoRSxpREFBZ0Q7QUFHaEQsNkRBQWlFO0FBSWpFLG1EQUFtRTtBQUNuRSxzREFBcUQ7QUFDckQsZ0RBQStDO0FBQy9DLHlDQUFtRDtBQUNuRCwrQ0FBOEM7QUFFOUM7Ozs7Ozs7Ozs7O0dBV0c7QUFDSCxTQUFzQixJQUFJLENBQ3RCLE1BQWUsRUFDZixJQUFXLEVBQ1gsWUFBb0IsRUFDcEIsYUFBcUIsRUFDckIsTUFBYyxFQUNkLFVBQW1CLEVBQ25CLGFBQXNCLEVBQ3RCLGNBQTJCOzs7WUFJM0Isc0JBQU8sWUFBWSxDQUNmLE1BQU0sRUFDTixJQUFJLEVBQ0osWUFBWSxFQUNaLENBQUMsRUFBRSxhQUFhLGVBQUEsRUFBRSxNQUFNLFFBQUEsRUFBRSxDQUFDLEVBQzNCLFVBQVUsRUFDVixhQUFhLEVBQ2IsY0FBYyxDQUNqQixFQUFDOzs7Q0FDTDtBQXJCRCxvQkFxQkM7QUFFRDs7Ozs7Ozs7Ozs7R0FXRztBQUNILFNBQXNCLFdBQVcsQ0FDN0IsTUFBZSxFQUNmLElBQVcsRUFDWCxZQUFvQixFQUNwQixjQUFzQixFQUN0QixNQUFjLEVBQ2QsVUFBbUIsRUFDbkIsYUFBc0IsRUFDdEIsY0FBMkI7OztZQUkzQixzQkFBTyxtQkFBbUIsQ0FDdEIsTUFBTSxFQUNOLElBQUksRUFDSixZQUFZLEVBQ1osQ0FBQyxFQUFFLGNBQWMsZ0JBQUEsRUFBRSxNQUFNLFFBQUEsRUFBRSxDQUFDLEVBQzVCLFVBQVUsRUFDVixhQUFhLEVBQ2IsY0FBYyxDQUNqQixFQUFDOzs7Q0FDTDtBQXJCRCxrQ0FxQkM7QUFFRDs7Ozs7Ozs7OztHQVVHO0FBQ0gsU0FBc0IsWUFBWSxDQUM5QixNQUFlLEVBQ2YsSUFBVyxFQUNYLFlBQW9CLEVBQ3BCLE9BSUcsRUFDSCxVQUFtQixFQUNuQixhQUFzQixFQUN0QixjQUEyQjs7OztZQUlyQixVQUFVLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFBLE1BQU07Z0JBQ2pDLElBQU0sYUFBYSxHQUFHLDJCQUFZLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDcEUsSUFBSSxDQUFDLGFBQWEsRUFBRTtvQkFDaEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO2lCQUN0RDtnQkFFRCxPQUFPO29CQUNILE9BQU8sRUFBRSxxQkFBUyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDO29CQUN6RCxXQUFXLEVBQUUsYUFBYSxDQUFDLFdBQVc7b0JBQ3RDLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTTtvQkFDckIsZUFBZSxFQUFFLE1BQU0sQ0FBQyxlQUFlO2lCQUMxQyxDQUFDO1lBQ04sQ0FBQyxDQUFDLENBQUM7WUFFSCxzQkFBTyx3QkFBd0IsQ0FDM0IsTUFBTSxFQUNOLElBQUksRUFDSjtvQkFDSSxZQUFZLGNBQUE7b0JBQ1osWUFBWSxFQUFFLFVBQVUsYUFBVixVQUFVLGNBQVYsVUFBVSxHQUFJLENBQUM7b0JBQzdCLFVBQVUsRUFBRSxLQUFLO2lCQUNwQixFQUNELGdDQUFvQixFQUNwQixVQUFVLEVBQ1YsYUFBYSxFQUNiLGNBQWMsQ0FDakIsRUFBQzs7O0NBQ0w7QUExQ0Qsb0NBMENDO0FBRUQ7Ozs7Ozs7Ozs7R0FVRztBQUNILFNBQXNCLG1CQUFtQixDQUNyQyxNQUFlLEVBQ2YsSUFBVyxFQUNYLFlBQW9CLEVBQ3BCLE9BSUcsRUFDSCxVQUFtQixFQUNuQixhQUFzQixFQUN0QixjQUEyQjs7OztZQUlyQixVQUFVLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLENBQ3JDO2dCQUNJLE9BQU8sRUFBRSxNQUFNLENBQUMsY0FBYztnQkFDOUIsV0FBVyxFQUFFLHNDQUFvQjtnQkFDakMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNO2dCQUNyQixlQUFlLEVBQUUsTUFBTSxDQUFDLGVBQWU7YUFDMUMsQ0FDSixFQVB3QyxDQU94QyxDQUFDLENBQUM7WUFFSCxzQkFBTyx3QkFBd0IsQ0FDM0IsTUFBTSxFQUNOLElBQUksRUFDSjtvQkFDSSxZQUFZLGNBQUE7b0JBQ1osWUFBWSxFQUFFLFVBQVUsYUFBVixVQUFVLGNBQVYsVUFBVSxHQUFJLENBQUM7b0JBQzdCLFVBQVUsRUFBRSxLQUFLO2lCQUNwQixFQUNELGdDQUFvQixFQUNwQixVQUFVLEVBQ1YsYUFBYSxFQUNiLGNBQWMsQ0FDakIsRUFBQzs7O0NBQ0w7QUFyQ0Qsa0RBcUNDO0FBRUQ7Ozs7Ozs7Ozs7R0FVRztBQUNILFNBQXNCLHdCQUF3QixDQUMxQyxNQUFlLEVBQ2YsSUFBVyxFQUNYLG1CQUFzQixFQUN0QixlQUE4RCxFQUM5RCxPQUtHLEVBQ0gsYUFBc0IsRUFDdEIsY0FBMkI7Ozs7O3dCQUlMLHFCQUFNLGVBQWUsQ0FDdkMsTUFBTSxFQUNOLElBQUksRUFDSixtQkFBbUIsRUFDbkIsZUFBZSxFQUNmLE9BQU8sRUFDUCxDQUFDLENBQ0osRUFBQTs7b0JBUEssYUFBYSxHQUFHLFNBT3JCO29CQUVnQixxQkFBTSwyQkFBWSxDQUMvQixNQUFNLEVBQ04sYUFBYSxFQUNiLE9BQU8sRUFDUCxhQUFhLEVBQ2IsY0FBYyxDQUFDLEVBQUE7O29CQUxiLFFBQVEsR0FBRyxTQUtFO29CQUVuQixzQkFBTzs0QkFDSCxTQUFTLEVBQUUsUUFBUSxDQUFDLFNBQVM7NEJBQzdCLE9BQU8sRUFBRSxRQUFRLENBQUMsT0FBTzt5QkFDNUIsRUFBQzs7OztDQUNMO0FBcENELDREQW9DQztBQUVEOzs7Ozs7Ozs7R0FTRztBQUNILFNBQXNCLGVBQWUsQ0FDakMsTUFBZSxFQUNmLElBQVcsRUFDWCxtQkFBc0IsRUFDdEIsZUFBOEQsRUFDOUQsT0FBbUUsRUFDbkUsU0FBaUI7Ozs7OztvQkFLWCxlQUFlLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFDLEtBQUssRUFBRSxNQUFNLElBQUssT0FBQSxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBckIsQ0FBcUIsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDOUUsY0FBYyxHQUFHLFNBQVMsYUFBVCxTQUFTLGNBQVQsU0FBUyxHQUFJLENBQUMsQ0FBQztvQkFFbEMsZUFBZSxHQUFHLENBQUMsQ0FBQztvQkFDbEIsMEJBQTBCLEdBRzFCLEVBQUUsQ0FBQztvQkFDTCxRQUFRLEdBQUcsS0FBSyxDQUFDO29CQUNqQixPQUFPLEdBQUcsSUFBSSxDQUFDO29CQUNmLFdBQVcsR0FBRyxDQUFDLENBQUM7OztvQkFHVixJQUFJLEdBQUcsZUFBZSxDQUFDLG1CQUFtQixFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUMzRCxPQUFPLEdBQUcsS0FBSyxDQUFDO29CQUVWLFdBQVcsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxxQkFBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBRTdELGNBQWMsR0FBRyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQ3ZDLGNBQWMsR0FBRyxJQUFJLCtCQUFjLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUM5RCxPQUFPLEdBQUcscUJBQVMsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7b0JBQ3hDLHFCQUFNLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsRUFBQTs7b0JBQTlELGdCQUFnQixHQUFHLFNBQTJDO3lCQUVoRSxDQUFBLGdCQUFnQixDQUFDLEtBQUssS0FBSyxDQUFDLENBQUEsRUFBNUIsd0JBQTRCO29CQUM1QixXQUFXLEVBQUUsQ0FBQztvQkFDZCxJQUFJLFdBQVcsSUFBSSxjQUFjLEVBQUU7d0JBQy9CLFFBQVEsR0FBRyxJQUFJLENBQUM7cUJBQ25COzs7MEJBRXVELEVBQTFCLEtBQUEsZ0JBQWdCLENBQUMsU0FBUzs7O3lCQUExQixDQUFBLGNBQTBCLENBQUE7b0JBQTdDLGVBQWU7b0JBQ0EscUJBQU0sTUFBTSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsRUFBQTs7b0JBQXBELGFBQWEsR0FBRyxTQUFvQztvQkFFMUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPO3dCQUN0QixlQUFlLEdBQUcsZUFBZSxFQUFFO3dCQUNuQyxJQUFJLGFBQWEsQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTs0QkFDbkMsV0FBVyxFQUFFLENBQUM7NEJBQ2QsSUFBSSxXQUFXLElBQUksY0FBYyxFQUFFO2dDQUMvQixRQUFRLEdBQUcsSUFBSSxDQUFDOzZCQUNuQjt5QkFDSjs2QkFBTTs0QkFDSCxlQUFlLElBQUksYUFBYSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7NEJBRXpDLEtBQUssR0FBZTtnQ0FDdEIsSUFBSSxFQUFFLDRCQUFlO2dDQUNyQixhQUFhLEVBQUUsYUFBYSxDQUFDLGFBQWE7Z0NBQzFDLHNCQUFzQixFQUFFLGFBQWEsQ0FBQyxXQUFXOzZCQUNwRCxDQUFDOzRCQUVGLDBCQUEwQixDQUFDLElBQUksQ0FBQztnQ0FDNUIsS0FBSyxPQUFBO2dDQUNMLGNBQWMsZ0JBQUE7NkJBQ2pCLENBQUMsQ0FBQzs0QkFFSCxJQUFJLGVBQWUsSUFBSSxlQUFlLEVBQUU7Z0NBQ3BDLG9EQUFvRDtnQ0FDcEQsMENBQTBDO2dDQUMxQyxJQUFJLGVBQWUsR0FBRyxlQUFlLEdBQUcsQ0FBQyxFQUFFO29DQUN2QyxPQUFPLENBQUMsSUFBSSxDQUFDO3dDQUNULE1BQU0sRUFBRSxlQUFlLEdBQUcsZUFBZTt3Q0FDekMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU87d0NBQzdDLFdBQVcsRUFBRSxhQUFhLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJO3FDQUNqRCxDQUFDLENBQUM7aUNBQ047Z0NBQ0QsUUFBUSxHQUFHLElBQUksQ0FBQzs2QkFDbkI7eUJBQ0o7cUJBQ0o7OztvQkFyQ3lCLElBQTBCLENBQUE7Ozt3QkF3Q3ZELENBQUMsUUFBUTs7O29CQUVsQixJQUFJLGVBQWUsR0FBRyxlQUFlLEVBQUU7d0JBQ25DLE1BQU0sSUFBSSxLQUFLLENBQUMsbUVBQW1FLENBQUMsQ0FBQztxQkFDeEY7b0JBRUQsc0JBQU8sMEJBQTBCLEVBQUM7Ozs7Q0FDckM7QUF2RkQsMENBdUZDIn0=