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
exports.getUnspentAddressesWithAddressGenerator = exports.getUnspentAddressesBip32 = exports.getUnspentAddresses = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
var ed25519Address_1 = require("../addressTypes/ed25519Address");
var bip32Path_1 = require("../crypto/bip32Path");
var IEd25519Address_1 = require("../models/IEd25519Address");
var bech32Helper_1 = require("../utils/bech32Helper");
var converter_1 = require("../utils/converter");
var addresses_1 = require("./addresses");
/**
 * Get all the unspent addresses.
 * @param client The client to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param accountIndex The account index in the wallet.
 * @param startIndex Optional start index for the wallet count address, defaults to 0.
 * @param countLimit Limit the number of items to find.
 * @param zeroCount Abort when the number of zero balances is exceeded.
 * @returns All the unspent addresses.
 */
function getUnspentAddresses(client, seed, accountIndex, startIndex, countLimit, zeroCount) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, getUnspentAddressesWithAddressGenerator(client, seed, {
                    accountIndex: accountIndex,
                    addressIndex: startIndex !== null && startIndex !== void 0 ? startIndex : 0,
                    isInternal: false
                }, addresses_1.generateAccountAddress, countLimit, zeroCount)];
        });
    });
}
exports.getUnspentAddresses = getUnspentAddresses;
/**
 * Get all the unspent addresses with a bip32 base path.
 * @param client The client to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param basePath The base path.
 * @param startIndex Optional start index for the wallet count address, defaults to 0.
 * @param countLimit Limit the number of items to find.
 * @param zeroCount Abort when the number of zero balances is exceeded.
 * @returns All the unspent addresses.
 */
function getUnspentAddressesBip32(client, seed, basePath, startIndex, countLimit, zeroCount) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, getUnspentAddressesWithAddressGenerator(client, seed, {
                    basePath: basePath,
                    addressIndex: startIndex !== null && startIndex !== void 0 ? startIndex : 0
                }, addresses_1.generateBip32Address, countLimit, zeroCount)];
        });
    });
}
exports.getUnspentAddressesBip32 = getUnspentAddressesBip32;
/**
 * Get all the unspent addresses using an address generator.
 * @param client The client to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param initialAddressState The initial address state for calculating the addresses.
 * @param nextAddressPath Calculate the next address for inputs.
 * @param countLimit Limit the number of items to find.
 * @param zeroCount Abort when the number of zero balances is exceeded.
 * @returns All the unspent addresses.
 */
function getUnspentAddressesWithAddressGenerator(client, seed, initialAddressState, nextAddressPath, countLimit, zeroCount) {
    return __awaiter(this, void 0, void 0, function () {
        var localCountLimit, localZeroCount, finished, allUnspent, isFirst, zeroBalance, path, addressSeed, ed25519Address, addressBytes, addressHex, addressResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    localCountLimit = countLimit !== null && countLimit !== void 0 ? countLimit : Number.MAX_SAFE_INTEGER;
                    localZeroCount = zeroCount !== null && zeroCount !== void 0 ? zeroCount : 5;
                    finished = false;
                    allUnspent = [];
                    isFirst = true;
                    zeroBalance = 0;
                    _a.label = 1;
                case 1:
                    path = nextAddressPath(initialAddressState, isFirst);
                    isFirst = false;
                    addressSeed = seed.generateSeedFromPath(new bip32Path_1.Bip32Path(path));
                    ed25519Address = new ed25519Address_1.Ed25519Address(addressSeed.keyPair().publicKey);
                    addressBytes = ed25519Address.toAddress();
                    addressHex = converter_1.Converter.bytesToHex(addressBytes);
                    return [4 /*yield*/, client.addressEd25519(addressHex)];
                case 2:
                    addressResponse = _a.sent();
                    // If there are no outputs for the address we have reached the
                    // end of the used addresses
                    if (addressResponse.count === 0) {
                        zeroBalance++;
                        if (zeroBalance >= localZeroCount) {
                            finished = true;
                        }
                    }
                    else {
                        allUnspent.push({
                            address: bech32Helper_1.Bech32Helper.toBech32(IEd25519Address_1.ED25519_ADDRESS_TYPE, addressBytes),
                            path: path,
                            balance: addressResponse.balance
                        });
                        if (allUnspent.length === localCountLimit) {
                            finished = true;
                        }
                    }
                    _a.label = 3;
                case 3:
                    if (!finished) return [3 /*break*/, 1];
                    _a.label = 4;
                case 4: return [2 /*return*/, allUnspent];
            }
        });
    });
}
exports.getUnspentAddressesWithAddressGenerator = getUnspentAddressesWithAddressGenerator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VW5zcGVudEFkZHJlc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWdoTGV2ZWwvZ2V0VW5zcGVudEFkZHJlc3Nlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLGlFQUFnRTtBQUNoRSxpREFBZ0Q7QUFJaEQsNkRBQWlFO0FBRWpFLHNEQUFxRDtBQUNyRCxnREFBK0M7QUFDL0MseUNBQTJFO0FBRTNFOzs7Ozs7Ozs7R0FTRztBQUNILFNBQXNCLG1CQUFtQixDQUNyQyxNQUFlLEVBQ2YsSUFBVyxFQUNYLFlBQW9CLEVBQ3BCLFVBQW1CLEVBQ25CLFVBQW1CLEVBQ25CLFNBQWtCOzs7WUFLbEIsc0JBQU8sdUNBQXVDLENBQzFDLE1BQU0sRUFDTixJQUFJLEVBQ0o7b0JBQ0ksWUFBWSxjQUFBO29CQUNaLFlBQVksRUFBRSxVQUFVLGFBQVYsVUFBVSxjQUFWLFVBQVUsR0FBSSxDQUFDO29CQUM3QixVQUFVLEVBQUUsS0FBSztpQkFDcEIsRUFDRCxrQ0FBc0IsRUFDdEIsVUFBVSxFQUNWLFNBQVMsQ0FDWixFQUFDOzs7Q0FDTDtBQXZCRCxrREF1QkM7QUFFRDs7Ozs7Ozs7O0dBU0c7QUFDSCxTQUFzQix3QkFBd0IsQ0FDMUMsTUFBZSxFQUNmLElBQVcsRUFDWCxRQUFtQixFQUNuQixVQUFtQixFQUNuQixVQUFtQixFQUNuQixTQUFrQjs7O1lBS2xCLHNCQUFPLHVDQUF1QyxDQUMxQyxNQUFNLEVBQ04sSUFBSSxFQUNKO29CQUNJLFFBQVEsVUFBQTtvQkFDUixZQUFZLEVBQUUsVUFBVSxhQUFWLFVBQVUsY0FBVixVQUFVLEdBQUksQ0FBQztpQkFDaEMsRUFDRCxnQ0FBb0IsRUFDcEIsVUFBVSxFQUNWLFNBQVMsQ0FDWixFQUFDOzs7Q0FDTDtBQXRCRCw0REFzQkM7QUFFRDs7Ozs7Ozs7O0dBU0c7QUFDSCxTQUFzQix1Q0FBdUMsQ0FDekQsTUFBZSxFQUNmLElBQVcsRUFDWCxtQkFBc0IsRUFDdEIsZUFBOEQsRUFDOUQsVUFBbUIsRUFDbkIsU0FBa0I7Ozs7OztvQkFLWixlQUFlLEdBQUcsVUFBVSxhQUFWLFVBQVUsY0FBVixVQUFVLEdBQUksTUFBTSxDQUFDLGdCQUFnQixDQUFDO29CQUN4RCxjQUFjLEdBQUcsU0FBUyxhQUFULFNBQVMsY0FBVCxTQUFTLEdBQUksQ0FBQyxDQUFDO29CQUNsQyxRQUFRLEdBQUcsS0FBSyxDQUFDO29CQUNmLFVBQVUsR0FJVixFQUFFLENBQUM7b0JBRUwsT0FBTyxHQUFHLElBQUksQ0FBQztvQkFDZixXQUFXLEdBQUcsQ0FBQyxDQUFDOzs7b0JBR1YsSUFBSSxHQUFHLGVBQWUsQ0FBQyxtQkFBbUIsRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFDM0QsT0FBTyxHQUFHLEtBQUssQ0FBQztvQkFFVixXQUFXLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUkscUJBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUU3RCxjQUFjLEdBQUcsSUFBSSwrQkFBYyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDckUsWUFBWSxHQUFHLGNBQWMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztvQkFDMUMsVUFBVSxHQUFHLHFCQUFTLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUM5QixxQkFBTSxNQUFNLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxFQUFBOztvQkFBekQsZUFBZSxHQUFHLFNBQXVDO29CQUUvRCw4REFBOEQ7b0JBQzlELDRCQUE0QjtvQkFDNUIsSUFBSSxlQUFlLENBQUMsS0FBSyxLQUFLLENBQUMsRUFBRTt3QkFDN0IsV0FBVyxFQUFFLENBQUM7d0JBQ2QsSUFBSSxXQUFXLElBQUksY0FBYyxFQUFFOzRCQUMvQixRQUFRLEdBQUcsSUFBSSxDQUFDO3lCQUNuQjtxQkFDSjt5QkFBTTt3QkFDSCxVQUFVLENBQUMsSUFBSSxDQUFDOzRCQUNaLE9BQU8sRUFBRSwyQkFBWSxDQUFDLFFBQVEsQ0FBQyxzQ0FBb0IsRUFBRSxZQUFZLENBQUM7NEJBQ2xFLElBQUksTUFBQTs0QkFDSixPQUFPLEVBQUUsZUFBZSxDQUFDLE9BQU87eUJBQ25DLENBQUMsQ0FBQzt3QkFFSCxJQUFJLFVBQVUsQ0FBQyxNQUFNLEtBQUssZUFBZSxFQUFFOzRCQUN2QyxRQUFRLEdBQUcsSUFBSSxDQUFDO3lCQUNuQjtxQkFDSjs7O3dCQUNJLENBQUMsUUFBUTs7d0JBRWxCLHNCQUFPLFVBQVUsRUFBQzs7OztDQUNyQjtBQXZERCwwRkF1REMifQ==