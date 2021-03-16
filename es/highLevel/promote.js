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
exports.promote = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
var message_1 = require("../binary/message");
var singleNodeClient_1 = require("../clients/singleNodeClient");
/**
 * Promote an existing message.
 * @param client The clientor node endpoint to perform the promote with.
 * @param messageId The message to promote.
 * @returns The id and message that were promoted.
 */
function promote(client, messageId) {
    return __awaiter(this, void 0, void 0, function () {
        var localClient, message, tipsResponse, promoteMessage, promoteMessageId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    localClient = typeof client === "string" ? new singleNodeClient_1.SingleNodeClient(client) : client;
                    return [4 /*yield*/, localClient.message(messageId)];
                case 1:
                    message = _a.sent();
                    if (!message) {
                        throw new Error("The message does not exist.");
                    }
                    return [4 /*yield*/, localClient.tips()];
                case 2:
                    tipsResponse = _a.sent();
                    // Parents must be unique and lexicographically sorted
                    // so don't add the messageId if it is already one of the tips
                    if (!tipsResponse.tipMessageIds.includes(messageId)) {
                        tipsResponse.tipMessageIds.unshift(messageId);
                    }
                    // If we now exceed the max parents remove as many as we need
                    if (tipsResponse.tipMessageIds.length > message_1.MAX_NUMBER_PARENTS) {
                        tipsResponse.tipMessageIds = tipsResponse.tipMessageIds.slice(0, message_1.MAX_NUMBER_PARENTS);
                    }
                    // Finally sort the list
                    tipsResponse.tipMessageIds.sort();
                    promoteMessage = {
                        parentMessageIds: tipsResponse.tipMessageIds
                    };
                    return [4 /*yield*/, localClient.messageSubmit(promoteMessage)];
                case 3:
                    promoteMessageId = _a.sent();
                    return [2 /*return*/, {
                            message: message,
                            messageId: promoteMessageId
                        }];
            }
        });
    });
}
exports.promote = promote;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvbW90ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWdoTGV2ZWwvcHJvbW90ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLDZDQUF1RDtBQUN2RCxnRUFBK0Q7QUFJL0Q7Ozs7O0dBS0c7QUFDSCxTQUFzQixPQUFPLENBQUMsTUFBd0IsRUFBRSxTQUFpQjs7Ozs7O29CQUkvRCxXQUFXLEdBQUcsT0FBTyxNQUFNLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLG1DQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7b0JBRXZFLHFCQUFNLFdBQVcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUE7O29CQUE5QyxPQUFPLEdBQUcsU0FBb0M7b0JBQ3BELElBQUksQ0FBQyxPQUFPLEVBQUU7d0JBQ1YsTUFBTSxJQUFJLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO3FCQUNsRDtvQkFFb0IscUJBQU0sV0FBVyxDQUFDLElBQUksRUFBRSxFQUFBOztvQkFBdkMsWUFBWSxHQUFHLFNBQXdCO29CQUU3QyxzREFBc0Q7b0JBQ3RELDhEQUE4RDtvQkFDOUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO3dCQUNqRCxZQUFZLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztxQkFDakQ7b0JBRUQsNkRBQTZEO29CQUM3RCxJQUFJLFlBQVksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLDRCQUFrQixFQUFFO3dCQUN4RCxZQUFZLENBQUMsYUFBYSxHQUFHLFlBQVksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSw0QkFBa0IsQ0FBQyxDQUFDO3FCQUN4RjtvQkFFRCx3QkFBd0I7b0JBQ3hCLFlBQVksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBRTVCLGNBQWMsR0FBYTt3QkFDN0IsZ0JBQWdCLEVBQUUsWUFBWSxDQUFDLGFBQWE7cUJBQy9DLENBQUM7b0JBRXVCLHFCQUFNLFdBQVcsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLEVBQUE7O29CQUFsRSxnQkFBZ0IsR0FBRyxTQUErQztvQkFFeEUsc0JBQU87NEJBQ0gsT0FBTyxTQUFBOzRCQUNQLFNBQVMsRUFBRSxnQkFBZ0I7eUJBQzlCLEVBQUM7Ozs7Q0FDTDtBQXJDRCwwQkFxQ0MifQ==