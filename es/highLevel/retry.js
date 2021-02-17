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
exports.retry = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
var singleNodeClient_1 = require("../clients/singleNodeClient");
var promote_1 = require("./promote");
var reattach_1 = require("./reattach");
/**
 * Retry an existing message either by promoting or reattaching.
 * @param client The client or node endpoint to perform the retry with.
 * @param messageId The message to retry.
 * @returns The id and message that were retried.
 */
function retry(client, messageId) {
    return __awaiter(this, void 0, void 0, function () {
        var localClient, metadata;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    localClient = typeof client === "string" ? new singleNodeClient_1.SingleNodeClient(client) : client;
                    return [4 /*yield*/, localClient.messageMetadata(messageId)];
                case 1:
                    metadata = _a.sent();
                    if (!metadata) {
                        throw new Error("The message does not exist.");
                    }
                    if (metadata.shouldPromote) {
                        return [2 /*return*/, promote_1.promote(client, messageId)];
                    }
                    else if (metadata.shouldReattach) {
                        return [2 /*return*/, reattach_1.reattach(client, messageId)];
                    }
                    throw new Error("The message should not be promoted or reattached.");
            }
        });
    });
}
exports.retry = retry;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV0cnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaGlnaExldmVsL3JldHJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtCQUErQjtBQUMvQixzQ0FBc0M7QUFDdEMsZ0VBQStEO0FBRy9ELHFDQUFvQztBQUNwQyx1Q0FBc0M7QUFFdEM7Ozs7O0dBS0c7QUFDSCxTQUFzQixLQUFLLENBQUMsTUFBd0IsRUFBRSxTQUFpQjs7Ozs7O29CQUk3RCxXQUFXLEdBQUcsT0FBTyxNQUFNLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLG1DQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7b0JBRXRFLHFCQUFNLFdBQVcsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLEVBQUE7O29CQUF2RCxRQUFRLEdBQUcsU0FBNEM7b0JBRTdELElBQUksQ0FBQyxRQUFRLEVBQUU7d0JBQ1gsTUFBTSxJQUFJLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO3FCQUNsRDtvQkFFRCxJQUFJLFFBQVEsQ0FBQyxhQUFhLEVBQUU7d0JBQ3hCLHNCQUFPLGlCQUFPLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxFQUFDO3FCQUNyQzt5QkFBTSxJQUFJLFFBQVEsQ0FBQyxjQUFjLEVBQUU7d0JBQ2hDLHNCQUFPLG1CQUFRLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxFQUFDO3FCQUN0QztvQkFFRCxNQUFNLElBQUksS0FBSyxDQUFDLG1EQUFtRCxDQUFDLENBQUM7Ozs7Q0FDeEU7QUFuQkQsc0JBbUJDIn0=