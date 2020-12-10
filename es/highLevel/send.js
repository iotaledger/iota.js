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
exports.calculateInputs = exports.sendEd25519 = exports.send = void 0;
var ed25519Address_1 = require("../addressTypes/ed25519Address");
var IEd25519Address_1 = require("../models/IEd25519Address");
var bech32Helper_1 = require("../utils/bech32Helper");
var converter_1 = require("../utils/converter");
var sendAdvanced_1 = require("./sendAdvanced");
/**
 * Send a transfer from the balance on the seed.
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
 * Send a transfer from the balance on the seed.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWdoTGV2ZWwvc2VuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpRUFBZ0U7QUFHaEUsNkRBQWlFO0FBS2pFLHNEQUFxRDtBQUNyRCxnREFBK0M7QUFDL0MsK0NBQThDO0FBRTlDOzs7Ozs7Ozs7R0FTRztBQUNILFNBQXNCLElBQUksQ0FDdEIsTUFBZSxFQUNmLElBQVcsRUFDWCxRQUFtQixFQUNuQixhQUFxQixFQUNyQixNQUFjLEVBQ2QsVUFBbUI7Ozs7OztvQkFJYixhQUFhLEdBQUcsMkJBQVksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBQzdELElBQUksQ0FBQyxhQUFhLEVBQUU7d0JBQ2hCLE1BQU0sSUFBSSxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQztxQkFDdEQ7b0JBRUssT0FBTyxHQUFHO3dCQUNaOzRCQUNJLE9BQU8sRUFBRSxxQkFBUyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDOzRCQUN6RCxXQUFXLEVBQUUsYUFBYSxDQUFDLFdBQVc7NEJBQ3RDLE1BQU0sUUFBQTt5QkFDVDtxQkFDSixDQUFDO29CQUNtQixxQkFBTSxlQUFlLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FBQyxFQUFBOztvQkFBakYsWUFBWSxHQUFHLFNBQWtFO29CQUV0RSxxQkFBTSwyQkFBWSxDQUMvQixNQUFNLEVBQ04sWUFBWSxFQUNaLE9BQU8sQ0FBQyxFQUFBOztvQkFITixRQUFRLEdBQUcsU0FHTDtvQkFFWixzQkFBTzs0QkFDSCxTQUFTLEVBQUUsUUFBUSxDQUFDLFNBQVM7NEJBQzdCLE9BQU8sRUFBRSxRQUFRLENBQUMsT0FBTzt5QkFDNUIsRUFBQzs7OztDQUNMO0FBakNELG9CQWlDQztBQUVEOzs7Ozs7Ozs7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