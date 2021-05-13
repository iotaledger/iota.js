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
exports.reattach = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
const singleNodeClient_1 = require("../clients/singleNodeClient");
/**
 * Reattach an existing message.
 * @param client The client or node endpoint to perform the reattach with.
 * @param messageId The message to reattach.
 * @returns The id and message that were reattached.
 */
function reattach(client, messageId) {
    return __awaiter(this, void 0, void 0, function* () {
        const localClient = typeof client === "string" ? new singleNodeClient_1.SingleNodeClient(client) : client;
        const message = yield localClient.message(messageId);
        if (!message) {
            throw new Error("The message does not exist.");
        }
        const reattachMessage = {
            payload: message.payload
        };
        const reattachedMessageId = yield localClient.messageSubmit(reattachMessage);
        return {
            message,
            messageId: reattachedMessageId
        };
    });
}
exports.reattach = reattach;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhdHRhY2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaGlnaExldmVsL3JlYXR0YWNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLCtCQUErQjtBQUMvQixzQ0FBc0M7QUFDdEMsa0VBQStEO0FBSS9EOzs7OztHQUtHO0FBQ0gsU0FBc0IsUUFBUSxDQUFDLE1BQXdCLEVBQUUsU0FBaUI7O1FBSXRFLE1BQU0sV0FBVyxHQUFHLE9BQU8sTUFBTSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxtQ0FBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBRXZGLE1BQU0sT0FBTyxHQUFHLE1BQU0sV0FBVyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1YsTUFBTSxJQUFJLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1NBQ2xEO1FBRUQsTUFBTSxlQUFlLEdBQWE7WUFDOUIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPO1NBQzNCLENBQUM7UUFFRixNQUFNLG1CQUFtQixHQUFHLE1BQU0sV0FBVyxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUU3RSxPQUFPO1lBQ0gsT0FBTztZQUNQLFNBQVMsRUFBRSxtQkFBbUI7U0FDakMsQ0FBQztJQUNOLENBQUM7Q0FBQTtBQXJCRCw0QkFxQkMifQ==