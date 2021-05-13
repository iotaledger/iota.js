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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendData = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
const payload_1 = require("../binary/payload");
const singleNodeClient_1 = require("../clients/singleNodeClient");
const IIndexationPayload_1 = require("../models/IIndexationPayload");
const converter_1 = require("../utils/converter");
/**
 * Send a data message.
 * @param client The client or node endpoint to send the data with.
 * @param indexationKey The index name.
 * @param indexationData The index data as either UTF8 text or Uint8Array bytes.
 * @returns The id of the message created and the message.
 */
function sendData(client, indexationKey, indexationData) {
    return __awaiter(this, void 0, void 0, function* () {
        const localClient = typeof client === "string" ? new singleNodeClient_1.SingleNodeClient(client) : client;
        if (!indexationKey) {
            throw new Error("indexationKey must not be empty");
        }
        const localIndexationKeyHex = typeof (indexationKey) === "string"
            ? converter_1.Converter.utf8ToHex(indexationKey) : converter_1.Converter.bytesToHex(indexationKey);
        if (localIndexationKeyHex.length / 2 < payload_1.MIN_INDEXATION_KEY_LENGTH) {
            throw new Error(`The indexation key length is ${localIndexationKeyHex.length / 2}, which is below the minimum size of ${payload_1.MIN_INDEXATION_KEY_LENGTH}`);
        }
        if (localIndexationKeyHex.length / 2 > payload_1.MAX_INDEXATION_KEY_LENGTH) {
            throw new Error(`The indexation key length is ${localIndexationKeyHex.length / 2}, which exceeds the maximum size of ${payload_1.MAX_INDEXATION_KEY_LENGTH}`);
        }
        const indexationPayload = {
            type: IIndexationPayload_1.INDEXATION_PAYLOAD_TYPE,
            index: localIndexationKeyHex,
            data: indexationData ? (typeof indexationData === "string"
                ? converter_1.Converter.utf8ToHex(indexationData) : converter_1.Converter.bytesToHex(indexationData)) : undefined
        };
        const message = {
            payload: indexationPayload
        };
        const messageId = yield localClient.messageSubmit(message);
        return {
            message,
            messageId
        };
    });
}
exports.sendData = sendData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZERhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaGlnaExldmVsL3NlbmREYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLCtCQUErQjtBQUMvQixzQ0FBc0M7QUFDdEMsK0NBQXlGO0FBQ3pGLGtFQUErRDtBQUUvRCxxRUFBMkY7QUFFM0Ysa0RBQStDO0FBRS9DOzs7Ozs7R0FNRztBQUNILFNBQXNCLFFBQVEsQ0FDMUIsTUFBd0IsRUFDeEIsYUFBa0MsRUFDbEMsY0FBb0M7O1FBSXBDLE1BQU0sV0FBVyxHQUFHLE9BQU8sTUFBTSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxtQ0FBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBRXZGLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDaEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1NBQ3REO1FBRUQsTUFBTSxxQkFBcUIsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLEtBQUssUUFBUTtZQUM3RCxDQUFDLENBQUMscUJBQVMsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLHFCQUFTLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRS9FLElBQUkscUJBQXFCLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxtQ0FBeUIsRUFBRTtZQUM5RCxNQUFNLElBQUksS0FBSyxDQUFDLGdDQUFnQyxxQkFBcUIsQ0FBQyxNQUFNLEdBQUcsQ0FDM0Usd0NBQXdDLG1DQUF5QixFQUFFLENBQUMsQ0FBQztTQUM1RTtRQUVELElBQUkscUJBQXFCLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxtQ0FBeUIsRUFBRTtZQUM5RCxNQUFNLElBQUksS0FBSyxDQUFDLGdDQUFnQyxxQkFBcUIsQ0FBQyxNQUFNLEdBQUcsQ0FDM0UsdUNBQXVDLG1DQUF5QixFQUFFLENBQUMsQ0FBQztTQUMzRTtRQUVELE1BQU0saUJBQWlCLEdBQXVCO1lBQzFDLElBQUksRUFBRSw0Q0FBdUI7WUFDN0IsS0FBSyxFQUFFLHFCQUFxQjtZQUM1QixJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sY0FBYyxLQUFLLFFBQVE7Z0JBQ3RELENBQUMsQ0FBQyxxQkFBUyxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMscUJBQVMsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUztTQUNoRyxDQUFDO1FBRUYsTUFBTSxPQUFPLEdBQWE7WUFDdEIsT0FBTyxFQUFFLGlCQUFpQjtTQUM3QixDQUFDO1FBRUYsTUFBTSxTQUFTLEdBQUcsTUFBTSxXQUFXLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNELE9BQU87WUFDSCxPQUFPO1lBQ1AsU0FBUztTQUNaLENBQUM7SUFDTixDQUFDO0NBQUE7QUExQ0QsNEJBMENDIn0=