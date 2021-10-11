// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { MAX_NUMBER_PARENTS } from "../binary/message";
import { SingleNodeClient } from "../clients/singleNodeClient";
/**
 * Promote an existing message.
 * @param client The clientor node endpoint to perform the promote with.
 * @param messageId The message to promote.
 * @returns The id and message that were promoted.
 */
export async function promote(client, messageId) {
    const localClient = typeof client === "string" ? new SingleNodeClient(client) : client;
    const message = await localClient.message(messageId);
    if (!message) {
        throw new Error("The message does not exist.");
    }
    const tipsResponse = await localClient.tips();
    // Parents must be unique and lexicographically sorted
    // so don't add the messageId if it is already one of the tips
    if (!tipsResponse.tipMessageIds.includes(messageId)) {
        tipsResponse.tipMessageIds.unshift(messageId);
    }
    // If we now exceed the max parents remove as many as we need
    if (tipsResponse.tipMessageIds.length > MAX_NUMBER_PARENTS) {
        tipsResponse.tipMessageIds = tipsResponse.tipMessageIds.slice(0, MAX_NUMBER_PARENTS);
    }
    // Finally sort the list
    tipsResponse.tipMessageIds.sort();
    const promoteMessage = {
        parentMessageIds: tipsResponse.tipMessageIds
    };
    const promoteMessageId = await localClient.messageSubmit(promoteMessage);
    return {
        message,
        messageId: promoteMessageId
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvbW90ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWdoTGV2ZWwvcHJvbW90ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBSS9EOzs7OztHQUtHO0FBQ0gsTUFBTSxDQUFDLEtBQUssVUFBVSxPQUFPLENBQ3pCLE1BQXdCLEVBQ3hCLFNBQWlCO0lBS2pCLE1BQU0sV0FBVyxHQUFHLE9BQU8sTUFBTSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO0lBRXZGLE1BQU0sT0FBTyxHQUFHLE1BQU0sV0FBVyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNyRCxJQUFJLENBQUMsT0FBTyxFQUFFO1FBQ1YsTUFBTSxJQUFJLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0tBQ2xEO0lBRUQsTUFBTSxZQUFZLEdBQUcsTUFBTSxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7SUFFOUMsc0RBQXNEO0lBQ3RELDhEQUE4RDtJQUM5RCxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDakQsWUFBWSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDakQ7SUFFRCw2REFBNkQ7SUFDN0QsSUFBSSxZQUFZLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxrQkFBa0IsRUFBRTtRQUN4RCxZQUFZLENBQUMsYUFBYSxHQUFHLFlBQVksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO0tBQ3hGO0lBRUQsd0JBQXdCO0lBQ3hCLFlBQVksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7SUFFbEMsTUFBTSxjQUFjLEdBQWE7UUFDN0IsZ0JBQWdCLEVBQUUsWUFBWSxDQUFDLGFBQWE7S0FDL0MsQ0FBQztJQUVGLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxXQUFXLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBRXpFLE9BQU87UUFDSCxPQUFPO1FBQ1AsU0FBUyxFQUFFLGdCQUFnQjtLQUM5QixDQUFDO0FBQ04sQ0FBQyJ9