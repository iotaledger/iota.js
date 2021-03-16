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
exports.getUnspentAddressesWithAddressGenerator = exports.getUnspentAddresses = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
var ed25519Address_1 = require("../addressTypes/ed25519Address");
var singleNodeClient_1 = require("../clients/singleNodeClient");
var bip32Path_1 = require("../crypto/bip32Path");
var IEd25519Address_1 = require("../models/IEd25519Address");
var bech32Helper_1 = require("../utils/bech32Helper");
var converter_1 = require("../utils/converter");
var addresses_1 = require("./addresses");
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
function getUnspentAddresses(client, seed, accountIndex, addressOptions) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            return [2 /*return*/, getUnspentAddressesWithAddressGenerator(client, seed, {
                    accountIndex: accountIndex,
                    addressIndex: (_a = addressOptions === null || addressOptions === void 0 ? void 0 : addressOptions.startIndex) !== null && _a !== void 0 ? _a : 0,
                    isInternal: false
                }, addresses_1.generateBip44Address, addressOptions)];
        });
    });
}
exports.getUnspentAddresses = getUnspentAddresses;
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
function getUnspentAddressesWithAddressGenerator(client, seed, initialAddressState, nextAddressPath, addressOptions) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var localClient, nodeInfo, localRequiredLimit, localZeroCount, finished, allUnspent, isFirst, zeroBalance, path, addressSeed, ed25519Address, addressBytes, addressHex, addressResponse;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    localClient = typeof client === "string" ? new singleNodeClient_1.SingleNodeClient(client) : client;
                    return [4 /*yield*/, localClient.info()];
                case 1:
                    nodeInfo = _c.sent();
                    localRequiredLimit = (_a = addressOptions === null || addressOptions === void 0 ? void 0 : addressOptions.requiredCount) !== null && _a !== void 0 ? _a : Number.MAX_SAFE_INTEGER;
                    localZeroCount = (_b = addressOptions === null || addressOptions === void 0 ? void 0 : addressOptions.zeroCount) !== null && _b !== void 0 ? _b : 20;
                    finished = false;
                    allUnspent = [];
                    isFirst = true;
                    zeroBalance = 0;
                    _c.label = 2;
                case 2:
                    path = nextAddressPath(initialAddressState, isFirst);
                    isFirst = false;
                    addressSeed = seed.generateSeedFromPath(new bip32Path_1.Bip32Path(path));
                    ed25519Address = new ed25519Address_1.Ed25519Address(addressSeed.keyPair().publicKey);
                    addressBytes = ed25519Address.toAddress();
                    addressHex = converter_1.Converter.bytesToHex(addressBytes);
                    return [4 /*yield*/, localClient.addressEd25519(addressHex)];
                case 3:
                    addressResponse = _c.sent();
                    // If there is no balance we increment the counter and end
                    // the text when we have reached the count
                    if (addressResponse.balance === 0) {
                        zeroBalance++;
                        if (zeroBalance >= localZeroCount) {
                            finished = true;
                        }
                    }
                    else {
                        allUnspent.push({
                            address: bech32Helper_1.Bech32Helper.toBech32(IEd25519Address_1.ED25519_ADDRESS_TYPE, addressBytes, nodeInfo.bech32HRP),
                            path: path,
                            balance: addressResponse.balance
                        });
                        if (allUnspent.length === localRequiredLimit) {
                            finished = true;
                        }
                    }
                    _c.label = 4;
                case 4:
                    if (!finished) return [3 /*break*/, 2];
                    _c.label = 5;
                case 5: return [2 /*return*/, allUnspent];
            }
        });
    });
}
exports.getUnspentAddressesWithAddressGenerator = getUnspentAddressesWithAddressGenerator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VW5zcGVudEFkZHJlc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWdoTGV2ZWwvZ2V0VW5zcGVudEFkZHJlc3Nlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLGlFQUFnRTtBQUNoRSxnRUFBK0Q7QUFDL0QsaURBQWdEO0FBR2hELDZEQUFpRTtBQUVqRSxzREFBcUQ7QUFDckQsZ0RBQStDO0FBQy9DLHlDQUFtRDtBQUVuRDs7Ozs7Ozs7OztHQVVHO0FBQ0gsU0FBc0IsbUJBQW1CLENBQ3JDLE1BQXdCLEVBQ3hCLElBQVcsRUFDWCxZQUFvQixFQUNwQixjQUlDOzs7O1lBS0Qsc0JBQU8sdUNBQXVDLENBQzFDLE1BQU0sRUFDTixJQUFJLEVBQ0o7b0JBQ0ksWUFBWSxjQUFBO29CQUNaLFlBQVksRUFBRSxNQUFBLGNBQWMsYUFBZCxjQUFjLHVCQUFkLGNBQWMsQ0FBRSxVQUFVLG1DQUFJLENBQUM7b0JBQzdDLFVBQVUsRUFBRSxLQUFLO2lCQUNwQixFQUNELGdDQUFvQixFQUNwQixjQUFjLENBQ2pCLEVBQUM7OztDQUNMO0FBeEJELGtEQXdCQztBQUVEOzs7Ozs7Ozs7OztHQVdHO0FBQ0gsU0FBc0IsdUNBQXVDLENBQ3pELE1BQXdCLEVBQ3hCLElBQVcsRUFDWCxtQkFBc0IsRUFDdEIsZUFBOEQsRUFDOUQsY0FJQzs7Ozs7OztvQkFLSyxXQUFXLEdBQUcsT0FBTyxNQUFNLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLG1DQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7b0JBRXRFLHFCQUFNLFdBQVcsQ0FBQyxJQUFJLEVBQUUsRUFBQTs7b0JBQW5DLFFBQVEsR0FBRyxTQUF3QjtvQkFDbkMsa0JBQWtCLEdBQUcsTUFBQSxjQUFjLGFBQWQsY0FBYyx1QkFBZCxjQUFjLENBQUUsYUFBYSxtQ0FBSSxNQUFNLENBQUMsZ0JBQWdCLENBQUM7b0JBQzlFLGNBQWMsR0FBRyxNQUFBLGNBQWMsYUFBZCxjQUFjLHVCQUFkLGNBQWMsQ0FBRSxTQUFTLG1DQUFJLEVBQUUsQ0FBQztvQkFDbkQsUUFBUSxHQUFHLEtBQUssQ0FBQztvQkFDZixVQUFVLEdBSVYsRUFBRSxDQUFDO29CQUVMLE9BQU8sR0FBRyxJQUFJLENBQUM7b0JBQ2YsV0FBVyxHQUFHLENBQUMsQ0FBQzs7O29CQUdWLElBQUksR0FBRyxlQUFlLENBQUMsbUJBQW1CLEVBQUUsT0FBTyxDQUFDLENBQUM7b0JBQzNELE9BQU8sR0FBRyxLQUFLLENBQUM7b0JBRVYsV0FBVyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLHFCQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFFN0QsY0FBYyxHQUFHLElBQUksK0JBQWMsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ3JFLFlBQVksR0FBRyxjQUFjLENBQUMsU0FBUyxFQUFFLENBQUM7b0JBQzFDLFVBQVUsR0FBRyxxQkFBUyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFDOUIscUJBQU0sV0FBVyxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsRUFBQTs7b0JBQTlELGVBQWUsR0FBRyxTQUE0QztvQkFFcEUsMERBQTBEO29CQUMxRCwwQ0FBMEM7b0JBQzFDLElBQUksZUFBZSxDQUFDLE9BQU8sS0FBSyxDQUFDLEVBQUU7d0JBQy9CLFdBQVcsRUFBRSxDQUFDO3dCQUNkLElBQUksV0FBVyxJQUFJLGNBQWMsRUFBRTs0QkFDL0IsUUFBUSxHQUFHLElBQUksQ0FBQzt5QkFDbkI7cUJBQ0o7eUJBQU07d0JBQ0gsVUFBVSxDQUFDLElBQUksQ0FBQzs0QkFDWixPQUFPLEVBQUUsMkJBQVksQ0FBQyxRQUFRLENBQUMsc0NBQW9CLEVBQUUsWUFBWSxFQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUM7NEJBQ3RGLElBQUksTUFBQTs0QkFDSixPQUFPLEVBQUUsZUFBZSxDQUFDLE9BQU87eUJBQ25DLENBQUMsQ0FBQzt3QkFFSCxJQUFJLFVBQVUsQ0FBQyxNQUFNLEtBQUssa0JBQWtCLEVBQUU7NEJBQzFDLFFBQVEsR0FBRyxJQUFJLENBQUM7eUJBQ25CO3FCQUNKOzs7d0JBQ0ksQ0FBQyxRQUFROzt3QkFFbEIsc0JBQU8sVUFBVSxFQUFDOzs7O0NBQ3JCO0FBN0RELDBGQTZEQyJ9