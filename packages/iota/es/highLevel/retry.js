// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { SingleNodeClient } from "../clients/singleNodeClient";
import { promote } from "./promote";
import { reattach } from "./reattach";
/**
 * Retry an existing message either by promoting or reattaching.
 * @param client The client or node endpoint to perform the retry with.
 * @param messageId The message to retry.
 * @returns The id and message that were retried.
 */
export async function retry(client, messageId) {
    const localClient = typeof client === "string" ? new SingleNodeClient(client) : client;
    const metadata = await localClient.messageMetadata(messageId);
    if (!metadata) {
        throw new Error("The message does not exist.");
    }
    if (metadata.shouldPromote) {
        return promote(client, messageId);
    }
    else if (metadata.shouldReattach) {
        return reattach(client, messageId);
    }
    throw new Error("The message should not be promoted or reattached.");
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV0cnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaGlnaExldmVsL3JldHJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLCtCQUErQjtBQUMvQixzQ0FBc0M7QUFDdEMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFHL0QsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUNwQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRXRDOzs7OztHQUtHO0FBQ0gsTUFBTSxDQUFDLEtBQUssVUFBVSxLQUFLLENBQ3ZCLE1BQXdCLEVBQ3hCLFNBQWlCO0lBS2pCLE1BQU0sV0FBVyxHQUFHLE9BQU8sTUFBTSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO0lBRXZGLE1BQU0sUUFBUSxHQUFHLE1BQU0sV0FBVyxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUU5RCxJQUFJLENBQUMsUUFBUSxFQUFFO1FBQ1gsTUFBTSxJQUFJLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0tBQ2xEO0lBRUQsSUFBSSxRQUFRLENBQUMsYUFBYSxFQUFFO1FBQ3hCLE9BQU8sT0FBTyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztLQUNyQztTQUFNLElBQUksUUFBUSxDQUFDLGNBQWMsRUFBRTtRQUNoQyxPQUFPLFFBQVEsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7S0FDdEM7SUFFRCxNQUFNLElBQUksS0FBSyxDQUFDLG1EQUFtRCxDQUFDLENBQUM7QUFDekUsQ0FBQyJ9