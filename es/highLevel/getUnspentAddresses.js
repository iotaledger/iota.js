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
exports.getUnspentAddresses = void 0;
var ed25519Address_1 = require("../addressTypes/ed25519Address");
var IEd25519Address_1 = require("../models/IEd25519Address");
var bech32Helper_1 = require("../utils/bech32Helper");
var converter_1 = require("../utils/converter");
/**
 * Get all the unspent addresses.
 * @param client The client to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param basePath The base path to start looking for addresses.
 * @param startIndex Optional start index for the wallet count address, defaults to 0.
 * @param countLimit Limit the number of items to find.
 * @returns All the unspent addresses.
 */
function getUnspentAddresses(client, seed, basePath, startIndex, countLimit) {
    return __awaiter(this, void 0, void 0, function () {
        var localStartIndex, localCountLimit, finished, allUnspent, addressKeyPair, ed25519Address, addressBytes, addressHex, addressResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    localStartIndex = startIndex !== null && startIndex !== void 0 ? startIndex : 0;
                    localCountLimit = countLimit !== null && countLimit !== void 0 ? countLimit : Number.MAX_SAFE_INTEGER;
                    finished = false;
                    allUnspent = [];
                    _a.label = 1;
                case 1:
                    basePath.push(localStartIndex);
                    addressKeyPair = seed.generateSeedFromPath(basePath).keyPair();
                    basePath.pop();
                    ed25519Address = new ed25519Address_1.Ed25519Address();
                    addressBytes = ed25519Address.publicKeyToAddress(addressKeyPair.publicKey);
                    addressHex = converter_1.Converter.bytesToHex(addressBytes);
                    return [4 /*yield*/, client.addressEd25519(addressHex)];
                case 2:
                    addressResponse = _a.sent();
                    // If there are no outputs for the address we have reached the
                    // end of the used addresses
                    if (addressResponse.count === 0) {
                        finished = true;
                    }
                    else {
                        allUnspent.push({
                            address: bech32Helper_1.Bech32Helper.toBech32(IEd25519Address_1.ED25519_ADDRESS_TYPE, addressBytes),
                            index: localStartIndex,
                            balance: addressResponse.balance
                        });
                        if (allUnspent.length === localCountLimit) {
                            finished = true;
                        }
                    }
                    localStartIndex++;
                    _a.label = 3;
                case 3:
                    if (!finished) return [3 /*break*/, 1];
                    _a.label = 4;
                case 4: return [2 /*return*/, allUnspent];
            }
        });
    });
}
exports.getUnspentAddresses = getUnspentAddresses;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VW5zcGVudEFkZHJlc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWdoTGV2ZWwvZ2V0VW5zcGVudEFkZHJlc3Nlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpRUFBZ0U7QUFHaEUsNkRBQWlFO0FBRWpFLHNEQUFxRDtBQUNyRCxnREFBK0M7QUFFL0M7Ozs7Ozs7O0dBUUc7QUFDSCxTQUFzQixtQkFBbUIsQ0FDckMsTUFBZSxFQUNmLElBQVcsRUFDWCxRQUFtQixFQUNuQixVQUFtQixFQUNuQixVQUFtQjs7Ozs7O29CQUtmLGVBQWUsR0FBRyxVQUFVLGFBQVYsVUFBVSxjQUFWLFVBQVUsR0FBSSxDQUFDLENBQUM7b0JBQ2hDLGVBQWUsR0FBRyxVQUFVLGFBQVYsVUFBVSxjQUFWLFVBQVUsR0FBSSxNQUFNLENBQUMsZ0JBQWdCLENBQUM7b0JBQzFELFFBQVEsR0FBRyxLQUFLLENBQUM7b0JBQ2YsVUFBVSxHQUlWLEVBQUUsQ0FBQzs7O29CQUdMLFFBQVEsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7b0JBQ3pCLGNBQWMsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQ3JFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztvQkFFVCxjQUFjLEdBQUcsSUFBSSwrQkFBYyxFQUFFLENBQUM7b0JBQ3RDLFlBQVksR0FBRyxjQUFjLENBQUMsa0JBQWtCLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUMzRSxVQUFVLEdBQUcscUJBQVMsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7b0JBQzlCLHFCQUFNLE1BQU0sQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEVBQUE7O29CQUF6RCxlQUFlLEdBQUcsU0FBdUM7b0JBRS9ELDhEQUE4RDtvQkFDOUQsNEJBQTRCO29CQUM1QixJQUFJLGVBQWUsQ0FBQyxLQUFLLEtBQUssQ0FBQyxFQUFFO3dCQUM3QixRQUFRLEdBQUcsSUFBSSxDQUFDO3FCQUNuQjt5QkFBTTt3QkFDSCxVQUFVLENBQUMsSUFBSSxDQUFDOzRCQUNaLE9BQU8sRUFBRSwyQkFBWSxDQUFDLFFBQVEsQ0FBQyxzQ0FBb0IsRUFBRSxZQUFZLENBQUM7NEJBQ2xFLEtBQUssRUFBRSxlQUFlOzRCQUN0QixPQUFPLEVBQUUsZUFBZSxDQUFDLE9BQU87eUJBQ25DLENBQUMsQ0FBQzt3QkFFSCxJQUFJLFVBQVUsQ0FBQyxNQUFNLEtBQUssZUFBZSxFQUFFOzRCQUN2QyxRQUFRLEdBQUcsSUFBSSxDQUFDO3lCQUNuQjtxQkFDSjtvQkFFRCxlQUFlLEVBQUUsQ0FBQzs7O3dCQUNiLENBQUMsUUFBUTs7d0JBRWxCLHNCQUFPLFVBQVUsRUFBQzs7OztDQUNyQjtBQWpERCxrREFpREMifQ==