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
var converter_1 = require("../utils/converter");
/**
 * Send a data message.
 * @param client The client to send the transfer with.
 * @param indexationKey The index name.
 * @param indexationData The index data.
 * @returns The id of the message created and the message.
 */
function sendData(client, indexationKey, indexationData) {
    return __awaiter(this, void 0, void 0, function () {
        var indexationPayload, tips, message, messageId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!indexationKey || indexationKey.length === 0) {
                        throw new Error("indexationKey must not be empty");
                    }
                    if (!indexationData) {
                        throw new Error("indexationData must not be empty");
                    }
                    indexationPayload = {
                        type: 2,
                        index: indexationKey,
                        data: converter_1.Converter.bytesToHex(indexationData)
                    };
                    return [4 /*yield*/, client.tips()];
                case 1:
                    tips = _a.sent();
                    message = {
                        parent1MessageId: tips.tip1MessageId,
                        parent2MessageId: tips.tip2MessageId,
                        payload: indexationPayload
                    };
                    return [4 /*yield*/, client.messageSubmit(message)];
                case 2:
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZERhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaGlnaExldmVsL3NlbmREYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUtBLGdEQUErQztBQUUvQzs7Ozs7O0dBTUc7QUFDSCxTQUFzQixRQUFRLENBQUMsTUFBZSxFQUFFLGFBQXFCLEVBQUUsY0FBMEI7Ozs7OztvQkFJN0YsSUFBSSxDQUFDLGFBQWEsSUFBSSxhQUFhLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTt3QkFDOUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO3FCQUN0RDtvQkFFRCxJQUFJLENBQUMsY0FBYyxFQUFFO3dCQUNqQixNQUFNLElBQUksS0FBSyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7cUJBQ3ZEO29CQUVLLGlCQUFpQixHQUF1Qjt3QkFDMUMsSUFBSSxFQUFFLENBQUM7d0JBQ1AsS0FBSyxFQUFFLGFBQWE7d0JBQ3BCLElBQUksRUFBRSxxQkFBUyxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUM7cUJBQzdDLENBQUM7b0JBRVcscUJBQU0sTUFBTSxDQUFDLElBQUksRUFBRSxFQUFBOztvQkFBMUIsSUFBSSxHQUFHLFNBQW1CO29CQUUxQixPQUFPLEdBQWE7d0JBQ3RCLGdCQUFnQixFQUFFLElBQUksQ0FBQyxhQUFhO3dCQUNwQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsYUFBYTt3QkFDcEMsT0FBTyxFQUFFLGlCQUFpQjtxQkFDN0IsQ0FBQztvQkFFZ0IscUJBQU0sTUFBTSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsRUFBQTs7b0JBQS9DLFNBQVMsR0FBRyxTQUFtQztvQkFDckQsc0JBQU87NEJBQ0gsT0FBTyxTQUFBOzRCQUNQLFNBQVMsV0FBQTt5QkFDWixFQUFDOzs7O0NBQ0w7QUEvQkQsNEJBK0JDIn0=