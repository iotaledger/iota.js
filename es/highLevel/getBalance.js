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
exports.getBalancePath = exports.getBalance = void 0;
var getUnspentAddresses_1 = require("./getUnspentAddresses");
/**
 * Get the balance for a list of addresses.
 * @param client The client to send the transfer with.
 * @param seed The seed.
 * @param accountIndex The account index in the wallet.
 * @param startIndex The start index to generate from, defaults to 0.
 * @returns The balance.
 */
function getBalance(client, seed, accountIndex, startIndex) {
    if (startIndex === void 0) { startIndex = 0; }
    return __awaiter(this, void 0, void 0, function () {
        var allUnspent;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getUnspentAddresses_1.getUnspentAddresses(client, seed, accountIndex, startIndex)];
                case 1:
                    allUnspent = _a.sent();
                    return [2 /*return*/, allUnspent.reduce(function (total, output) { return total + output.balance; }, 0)];
            }
        });
    });
}
exports.getBalance = getBalance;
/**
 * Get the balance for a list of addresses.
 * @param client The client to send the transfer with.
 * @param seed The seed.
 * @param basePath The base path to start looking for addresses.
 * @param startIndex The start index to generate from, defaults to 0.
 * @returns The balance.
 */
function getBalancePath(client, seed, basePath, startIndex) {
    if (startIndex === void 0) { startIndex = 0; }
    return __awaiter(this, void 0, void 0, function () {
        var allUnspent;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getUnspentAddresses_1.getUnspentAddressesBip32(client, seed, basePath, startIndex)];
                case 1:
                    allUnspent = _a.sent();
                    return [2 /*return*/, allUnspent.reduce(function (total, output) { return total + output.balance; }, 0)];
            }
        });
    });
}
exports.getBalancePath = getBalancePath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0QmFsYW5jZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWdoTGV2ZWwvZ2V0QmFsYW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLQSw2REFBc0Y7QUFFdEY7Ozs7Ozs7R0FPRztBQUNILFNBQXNCLFVBQVUsQ0FDNUIsTUFBZSxFQUNmLElBQVcsRUFDWCxZQUFvQixFQUNwQixVQUFzQjtJQUF0QiwyQkFBQSxFQUFBLGNBQXNCOzs7Ozt3QkFDSCxxQkFBTSx5Q0FBbUIsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxVQUFVLENBQUMsRUFBQTs7b0JBQTlFLFVBQVUsR0FBRyxTQUFpRTtvQkFFcEYsc0JBQU8sVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFDLEtBQUssRUFBRSxNQUFNLElBQUssT0FBQSxLQUFLLEdBQUcsTUFBTSxDQUFDLE9BQU8sRUFBdEIsQ0FBc0IsRUFBRSxDQUFDLENBQUMsRUFBQzs7OztDQUMxRTtBQVJELGdDQVFDO0FBRUQ7Ozs7Ozs7R0FPRztBQUNILFNBQXNCLGNBQWMsQ0FDaEMsTUFBZSxFQUNmLElBQVcsRUFDWCxRQUFtQixFQUNuQixVQUFzQjtJQUF0QiwyQkFBQSxFQUFBLGNBQXNCOzs7Ozt3QkFDSCxxQkFBTSw4Q0FBd0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUMsRUFBQTs7b0JBQS9FLFVBQVUsR0FBRyxTQUFrRTtvQkFFckYsc0JBQU8sVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFDLEtBQUssRUFBRSxNQUFNLElBQUssT0FBQSxLQUFLLEdBQUcsTUFBTSxDQUFDLE9BQU8sRUFBdEIsQ0FBc0IsRUFBRSxDQUFDLENBQUMsRUFBQzs7OztDQUMxRTtBQVJELHdDQVFDIn0=