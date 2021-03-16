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
exports.reattach = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
var singleNodeClient_1 = require("../clients/singleNodeClient");
/**
 * Reattach an existing message.
 * @param client The client or node endpoint to perform the reattach with.
 * @param messageId The message to reattach.
 * @returns The id and message that were reattached.
 */
function reattach(client, messageId) {
    return __awaiter(this, void 0, void 0, function () {
        var localClient, message, reattachMessage, reattachedMessageId;
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
                    reattachMessage = {
                        payload: message.payload
                    };
                    return [4 /*yield*/, localClient.messageSubmit(reattachMessage)];
                case 2:
                    reattachedMessageId = _a.sent();
                    return [2 /*return*/, {
                            message: message,
                            messageId: reattachedMessageId
                        }];
            }
        });
    });
}
exports.reattach = reattach;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhdHRhY2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaGlnaExldmVsL3JlYXR0YWNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtCQUErQjtBQUMvQixzQ0FBc0M7QUFDdEMsZ0VBQStEO0FBSS9EOzs7OztHQUtHO0FBQ0gsU0FBc0IsUUFBUSxDQUFDLE1BQXdCLEVBQUUsU0FBaUI7Ozs7OztvQkFJaEUsV0FBVyxHQUFHLE9BQU8sTUFBTSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxtQ0FBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO29CQUV2RSxxQkFBTSxXQUFXLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFBOztvQkFBOUMsT0FBTyxHQUFHLFNBQW9DO29CQUNwRCxJQUFJLENBQUMsT0FBTyxFQUFFO3dCQUNWLE1BQU0sSUFBSSxLQUFLLENBQUMsNkJBQTZCLENBQUMsQ0FBQztxQkFDbEQ7b0JBRUssZUFBZSxHQUFhO3dCQUM5QixPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU87cUJBQzNCLENBQUM7b0JBRTBCLHFCQUFNLFdBQVcsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLEVBQUE7O29CQUF0RSxtQkFBbUIsR0FBRyxTQUFnRDtvQkFFNUUsc0JBQU87NEJBQ0gsT0FBTyxTQUFBOzRCQUNQLFNBQVMsRUFBRSxtQkFBbUI7eUJBQ2pDLEVBQUM7Ozs7Q0FDTDtBQXJCRCw0QkFxQkMifQ==