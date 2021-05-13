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
exports.retry = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
const singleNodeClient_1 = require("../clients/singleNodeClient");
const promote_1 = require("./promote");
const reattach_1 = require("./reattach");
/**
 * Retry an existing message either by promoting or reattaching.
 * @param client The client or node endpoint to perform the retry with.
 * @param messageId The message to retry.
 * @returns The id and message that were retried.
 */
function retry(client, messageId) {
    return __awaiter(this, void 0, void 0, function* () {
        const localClient = typeof client === "string" ? new singleNodeClient_1.SingleNodeClient(client) : client;
        const metadata = yield localClient.messageMetadata(messageId);
        if (!metadata) {
            throw new Error("The message does not exist.");
        }
        if (metadata.shouldPromote) {
            return promote_1.promote(client, messageId);
        }
        else if (metadata.shouldReattach) {
            return reattach_1.reattach(client, messageId);
        }
        throw new Error("The message should not be promoted or reattached.");
    });
}
exports.retry = retry;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV0cnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaGlnaExldmVsL3JldHJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLCtCQUErQjtBQUMvQixzQ0FBc0M7QUFDdEMsa0VBQStEO0FBRy9ELHVDQUFvQztBQUNwQyx5Q0FBc0M7QUFFdEM7Ozs7O0dBS0c7QUFDSCxTQUFzQixLQUFLLENBQUMsTUFBd0IsRUFBRSxTQUFpQjs7UUFJbkUsTUFBTSxXQUFXLEdBQUcsT0FBTyxNQUFNLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLG1DQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFFdkYsTUFBTSxRQUFRLEdBQUcsTUFBTSxXQUFXLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTlELElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDWCxNQUFNLElBQUksS0FBSyxDQUFDLDZCQUE2QixDQUFDLENBQUM7U0FDbEQ7UUFFRCxJQUFJLFFBQVEsQ0FBQyxhQUFhLEVBQUU7WUFDeEIsT0FBTyxpQkFBTyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztTQUNyQzthQUFNLElBQUksUUFBUSxDQUFDLGNBQWMsRUFBRTtZQUNoQyxPQUFPLG1CQUFRLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQ3RDO1FBRUQsTUFBTSxJQUFJLEtBQUssQ0FBQyxtREFBbUQsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7Q0FBQTtBQW5CRCxzQkFtQkMifQ==