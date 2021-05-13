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
exports.promote = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
const message_1 = require("../binary/message");
const singleNodeClient_1 = require("../clients/singleNodeClient");
/**
 * Promote an existing message.
 * @param client The clientor node endpoint to perform the promote with.
 * @param messageId The message to promote.
 * @returns The id and message that were promoted.
 */
function promote(client, messageId) {
    return __awaiter(this, void 0, void 0, function* () {
        const localClient = typeof client === "string" ? new singleNodeClient_1.SingleNodeClient(client) : client;
        const message = yield localClient.message(messageId);
        if (!message) {
            throw new Error("The message does not exist.");
        }
        const tipsResponse = yield localClient.tips();
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
        const promoteMessage = {
            parentMessageIds: tipsResponse.tipMessageIds
        };
        const promoteMessageId = yield localClient.messageSubmit(promoteMessage);
        return {
            message,
            messageId: promoteMessageId
        };
    });
}
exports.promote = promote;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvbW90ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWdoTGV2ZWwvcHJvbW90ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLCtDQUF1RDtBQUN2RCxrRUFBK0Q7QUFJL0Q7Ozs7O0dBS0c7QUFDSCxTQUFzQixPQUFPLENBQUMsTUFBd0IsRUFBRSxTQUFpQjs7UUFJckUsTUFBTSxXQUFXLEdBQUcsT0FBTyxNQUFNLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLG1DQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFFdkYsTUFBTSxPQUFPLEdBQUcsTUFBTSxXQUFXLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDVixNQUFNLElBQUksS0FBSyxDQUFDLDZCQUE2QixDQUFDLENBQUM7U0FDbEQ7UUFFRCxNQUFNLFlBQVksR0FBRyxNQUFNLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUU5QyxzREFBc0Q7UUFDdEQsOERBQThEO1FBQzlELElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUNqRCxZQUFZLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUNqRDtRQUVELDZEQUE2RDtRQUM3RCxJQUFJLFlBQVksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLDRCQUFrQixFQUFFO1lBQ3hELFlBQVksQ0FBQyxhQUFhLEdBQUcsWUFBWSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLDRCQUFrQixDQUFDLENBQUM7U0FDeEY7UUFFRCx3QkFBd0I7UUFDeEIsWUFBWSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVsQyxNQUFNLGNBQWMsR0FBYTtZQUM3QixnQkFBZ0IsRUFBRSxZQUFZLENBQUMsYUFBYTtTQUMvQyxDQUFDO1FBRUYsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLFdBQVcsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFekUsT0FBTztZQUNILE9BQU87WUFDUCxTQUFTLEVBQUUsZ0JBQWdCO1NBQzlCLENBQUM7SUFDTixDQUFDO0NBQUE7QUFyQ0QsMEJBcUNDIn0=