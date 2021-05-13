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
exports.retrieveData = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
const singleNodeClient_1 = require("../clients/singleNodeClient");
const IIndexationPayload_1 = require("../models/IIndexationPayload");
const ITransactionPayload_1 = require("../models/ITransactionPayload");
const converter_1 = require("../utils/converter");
/**
 * Retrieve a data message.
 * @param client The client or node endpoint to retrieve the data with.
 * @param messageId The message id of the data to get.
 * @returns The message index and data.
 */
function retrieveData(client, messageId) {
    return __awaiter(this, void 0, void 0, function* () {
        const localClient = typeof client === "string" ? new singleNodeClient_1.SingleNodeClient(client) : client;
        const message = yield localClient.message(messageId);
        if (message === null || message === void 0 ? void 0 : message.payload) {
            let indexationPayload;
            if (message.payload.type === ITransactionPayload_1.TRANSACTION_PAYLOAD_TYPE) {
                indexationPayload = message.payload.essence.payload;
            }
            else if (message.payload.type === IIndexationPayload_1.INDEXATION_PAYLOAD_TYPE) {
                indexationPayload = message.payload;
            }
            if (indexationPayload) {
                return {
                    index: converter_1.Converter.hexToBytes(indexationPayload.index),
                    data: indexationPayload.data ? converter_1.Converter.hexToBytes(indexationPayload.data) : undefined
                };
            }
        }
    });
}
exports.retrieveData = retrieveData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV0cmlldmVEYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hpZ2hMZXZlbC9yZXRyaWV2ZURhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsK0JBQStCO0FBQy9CLHNDQUFzQztBQUN0QyxrRUFBK0Q7QUFFL0QscUVBQTJGO0FBQzNGLHVFQUF5RTtBQUN6RSxrREFBK0M7QUFFL0M7Ozs7O0dBS0c7QUFDSCxTQUFzQixZQUFZLENBQUMsTUFBd0IsRUFBRSxTQUFpQjs7UUFJMUUsTUFBTSxXQUFXLEdBQUcsT0FBTyxNQUFNLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLG1DQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFFdkYsTUFBTSxPQUFPLEdBQUcsTUFBTSxXQUFXLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRXJELElBQUksT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLE9BQU8sRUFBRTtZQUNsQixJQUFJLGlCQUFpRCxDQUFDO1lBRXRELElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssOENBQXdCLEVBQUU7Z0JBQ25ELGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQzthQUN2RDtpQkFBTSxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLDRDQUF1QixFQUFFO2dCQUN6RCxpQkFBaUIsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDO2FBQ3ZDO1lBRUQsSUFBSSxpQkFBaUIsRUFBRTtnQkFDbkIsT0FBTztvQkFDSCxLQUFLLEVBQUUscUJBQVMsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDO29CQUNwRCxJQUFJLEVBQUUsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxxQkFBUyxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUztpQkFDMUYsQ0FBQzthQUNMO1NBQ0o7SUFDTCxDQUFDO0NBQUE7QUF4QkQsb0NBd0JDIn0=