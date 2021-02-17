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
exports.sendData = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
var payload_1 = require("../binary/payload");
var singleNodeClient_1 = require("../clients/singleNodeClient");
var IIndexationPayload_1 = require("../models/IIndexationPayload");
var converter_1 = require("../utils/converter");
/**
 * Send a data message.
 * @param client The client or node endpoint to send the data with.
 * @param indexationKey The index name.
 * @param indexationData The index data.
 * @returns The id of the message created and the message.
 */
function sendData(client, indexationKey, indexationData) {
    return __awaiter(this, void 0, void 0, function () {
        var localClient, indexationPayload, message, messageId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    localClient = typeof client === "string" ? new singleNodeClient_1.SingleNodeClient(client) : client;
                    if (!indexationKey) {
                        throw new Error("indexationKey must not be empty");
                    }
                    if (indexationKey.length < payload_1.MIN_INDEXATION_KEY_LENGTH) {
                        throw new Error("The indexation key length is " + indexationKey.length + ", which is below the minimum size of " + payload_1.MIN_INDEXATION_KEY_LENGTH);
                    }
                    if (indexationKey.length > payload_1.MAX_INDEXATION_KEY_LENGTH) {
                        throw new Error("The indexation key length is " + indexationKey.length + ", which exceeds the maximum size of " + payload_1.MAX_INDEXATION_KEY_LENGTH);
                    }
                    indexationPayload = {
                        type: IIndexationPayload_1.INDEXATION_PAYLOAD_TYPE,
                        index: indexationKey,
                        data: indexationData ? converter_1.Converter.bytesToHex(indexationData) : ""
                    };
                    message = {
                        payload: indexationPayload
                    };
                    return [4 /*yield*/, localClient.messageSubmit(message)];
                case 1:
                    messageId = _a.sent();
                    return [2 /*return*/, {
                            message: message,
                            messageId: messageId
                        }];
            }
        });
    });
}
exports.sendData = sendData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZERhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaGlnaExldmVsL3NlbmREYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtCQUErQjtBQUMvQixzQ0FBc0M7QUFDdEMsNkNBQXlGO0FBQ3pGLGdFQUErRDtBQUUvRCxtRUFBMkY7QUFFM0YsZ0RBQStDO0FBRS9DOzs7Ozs7R0FNRztBQUNILFNBQXNCLFFBQVEsQ0FBQyxNQUF3QixFQUFFLGFBQXFCLEVBQUUsY0FBMkI7Ozs7OztvQkFJakcsV0FBVyxHQUFHLE9BQU8sTUFBTSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxtQ0FBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO29CQUV2RixJQUFJLENBQUMsYUFBYSxFQUFFO3dCQUNoQixNQUFNLElBQUksS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7cUJBQ3REO29CQUVELElBQUksYUFBYSxDQUFDLE1BQU0sR0FBRyxtQ0FBeUIsRUFBRTt3QkFDbEQsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQ0FBZ0MsYUFBYSxDQUFDLE1BQU0sNkNBQ3hCLG1DQUEyQixDQUFDLENBQUM7cUJBQzVFO29CQUVELElBQUksYUFBYSxDQUFDLE1BQU0sR0FBRyxtQ0FBeUIsRUFBRTt3QkFDbEQsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQ0FBZ0MsYUFBYSxDQUFDLE1BQU0sNENBQ3pCLG1DQUEyQixDQUFDLENBQUM7cUJBQzNFO29CQUVLLGlCQUFpQixHQUF1Qjt3QkFDMUMsSUFBSSxFQUFFLDRDQUF1Qjt3QkFDN0IsS0FBSyxFQUFFLGFBQWE7d0JBQ3BCLElBQUksRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDLHFCQUFTLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO3FCQUNuRSxDQUFDO29CQUVJLE9BQU8sR0FBYTt3QkFDdEIsT0FBTyxFQUFFLGlCQUFpQjtxQkFDN0IsQ0FBQztvQkFFZ0IscUJBQU0sV0FBVyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsRUFBQTs7b0JBQXBELFNBQVMsR0FBRyxTQUF3QztvQkFDMUQsc0JBQU87NEJBQ0gsT0FBTyxTQUFBOzRCQUNQLFNBQVMsV0FBQTt5QkFDWixFQUFDOzs7O0NBQ0w7QUFuQ0QsNEJBbUNDIn0=