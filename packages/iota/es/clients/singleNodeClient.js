// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { ArrayHelper, Blake2b } from "@iota/crypto.js";
import { BigIntHelper, Converter, WriteStream } from "@iota/util.js";
import bigInt from "big-integer";
import { MAX_MESSAGE_LENGTH, serializeMessage } from "../binary/message";
import { DEFAULT_PROTOCOL_VERSION } from "../models/IMessage";
import { ClientError } from "./clientError";
/**
 * Client for API communication.
 */
export class SingleNodeClient {
    /**
     * Create a new instance of client.
     * @param endpoint The endpoint.
     * @param options Options for the client.
     */
    constructor(endpoint, options) {
        var _a, _b, _c, _d, _e;
        if (!endpoint) {
            throw new Error("The endpoint can not be empty");
        }
        this._endpoint = endpoint.replace(/\/+$/, "");
        this._basePath = (_a = options === null || options === void 0 ? void 0 : options.basePath) !== null && _a !== void 0 ? _a : "/api/v2/";
        this._basePluginPath = (_b = options === null || options === void 0 ? void 0 : options.basePluginPath) !== null && _b !== void 0 ? _b : "/api/plugins/";
        this._powProvider = options === null || options === void 0 ? void 0 : options.powProvider;
        this._timeout = options === null || options === void 0 ? void 0 : options.timeout;
        this._userName = options === null || options === void 0 ? void 0 : options.userName;
        this._password = options === null || options === void 0 ? void 0 : options.password;
        this._headers = options === null || options === void 0 ? void 0 : options.headers;
        this._protocolVersion = (_c = options === null || options === void 0 ? void 0 : options.protocolVersion) !== null && _c !== void 0 ? _c : DEFAULT_PROTOCOL_VERSION;
        if (this._userName && this._password && !this._endpoint.startsWith("https")) {
            throw new Error("Basic authentication requires the endpoint to be https");
        }
        if (this._userName && this._password && (((_d = this._headers) === null || _d === void 0 ? void 0 : _d.authorization) || ((_e = this._headers) === null || _e === void 0 ? void 0 : _e.Authorization))) {
            throw new Error("You can not supply both user/pass and authorization header");
        }
    }
    /**
     * Get the health of the node.
     * @returns True if the node is healthy.
     */
    async health() {
        const status = await this.fetchStatus("/health");
        if (status === 200) {
            return true;
        }
        else if (status === 503) {
            return false;
        }
        throw new ClientError("Unexpected response code", "/health", status);
    }
    /**
     * Get the info about the node.
     * @returns The node information.
     */
    async info() {
        return this.fetchJson(this._basePath, "get", "info");
    }
    /**
     * Get the tips from the node.
     * @returns The tips.
     */
    async tips() {
        return this.fetchJson(this._basePath, "get", "tips");
    }
    /**
     * Get the message data by id.
     * @param messageId The message to get the data for.
     * @returns The message data.
     */
    async message(messageId) {
        return this.fetchJson(this._basePath, "get", `messages/${messageId}`);
    }
    /**
     * Get the message metadata by id.
     * @param messageId The message to get the metadata for.
     * @returns The message metadata.
     */
    async messageMetadata(messageId) {
        return this.fetchJson(this._basePath, "get", `messages/${messageId}/metadata`);
    }
    /**
     * Get the message raw data by id.
     * @param messageId The message to get the data for.
     * @returns The message raw data.
     */
    async messageRaw(messageId) {
        return this.fetchBinary(this._basePath, "get", `messages/${messageId}/raw`);
    }
    /**
     * Submit message.
     * @param message The message to submit.
     * @returns The messageId.
     */
    async messageSubmit(message) {
        var _a, _b;
        message.protocolVersion = this._protocolVersion;
        let minPoWScore = 0;
        if (this._powProvider) {
            // If there is a local pow provider and no networkId or parent message ids
            // we must populate them, so that the they are not filled in by the
            // node causing invalid pow calculation
            if (this._protocol === undefined) {
                await this.populateProtocolInfoCache();
            }
            minPoWScore = (_b = (_a = this._protocol) === null || _a === void 0 ? void 0 : _a.minPoWScore) !== null && _b !== void 0 ? _b : 0;
            if (!message.parentMessageIds || message.parentMessageIds.length === 0) {
                const tips = await this.tips();
                message.parentMessageIds = tips.tipMessageIds;
            }
        }
        const writeStream = new WriteStream();
        serializeMessage(writeStream, message);
        const messageBytes = writeStream.finalBytes();
        if (messageBytes.length > MAX_MESSAGE_LENGTH) {
            throw new Error(`The message length is ${messageBytes.length}, which exceeds the maximum size of ${MAX_MESSAGE_LENGTH}`);
        }
        if (this._powProvider) {
            const nonce = await this._powProvider.pow(messageBytes, minPoWScore);
            message.nonce = nonce.toString();
        }
        const response = await this.fetchJson(this._basePath, "post", "messages", message);
        return response.messageId;
    }
    /**
     * Submit message in raw format.
     * @param message The message to submit.
     * @returns The messageId.
     */
    async messageSubmitRaw(message) {
        var _a, _b;
        if (message.length > MAX_MESSAGE_LENGTH) {
            throw new Error(`The message length is ${message.length}, which exceeds the maximum size of ${MAX_MESSAGE_LENGTH}`);
        }
        message[0] = this._protocolVersion;
        if (this._powProvider && ArrayHelper.equal(message.slice(-8), SingleNodeClient.NONCE_ZERO)) {
            if (this._protocol === undefined) {
                await this.populateProtocolInfoCache();
            }
            const nonce = await this._powProvider.pow(message, (_b = (_a = this._protocol) === null || _a === void 0 ? void 0 : _a.minPoWScore) !== null && _b !== void 0 ? _b : 0);
            BigIntHelper.write8(bigInt(nonce), message, message.length - 8);
        }
        const response = await this.fetchBinary(this._basePath, "post", "messages", message);
        return response.messageId;
    }
    /**
     * Get the children of a message.
     * @param messageId The id of the message to get the children for.
     * @returns The messages children.
     */
    async messageChildren(messageId) {
        return this.fetchJson(this._basePath, "get", `messages/${messageId}/children`);
    }
    /**
     * Get the message that was included in the ledger for a transaction.
     * @param transactionId The id of the transaction to get the included message for.
     * @returns The message.
     */
    async transactionIncludedMessage(transactionId) {
        return this.fetchJson(this._basePath, "get", `transactions/${transactionId}/included-message`);
    }
    /**
     * Find an output by its identifier.
     * @param outputId The id of the output to get.
     * @returns The output details.
     */
    async output(outputId) {
        return this.fetchJson(this._basePath, "get", `outputs/${outputId}`);
    }
    /**
     * Get the requested milestone.
     * @param index The index of the milestone to get.
     * @returns The milestone details.
     */
    async milestone(index) {
        return this.fetchJson(this._basePath, "get", `milestones/${index}`);
    }
    /**
     * Get the requested milestone utxo changes.
     * @param index The index of the milestone to request the changes for.
     * @returns The milestone utxo changes details.
     */
    async milestoneUtxoChanges(index) {
        return this.fetchJson(this._basePath, "get", `milestones/${index}/utxo-changes`);
    }
    /**
     * Get the current treasury output.
     * @returns The details for the treasury.
     */
    async treasury() {
        return this.fetchJson(this._basePath, "get", "treasury");
    }
    /**
     * Get all the stored receipts or those for a given migrated at index.
     * @param migratedAt The index the receipts were migrated at, if not supplied returns all stored receipts.
     * @returns The stored receipts.
     */
    async receipts(migratedAt) {
        return this.fetchJson(this._basePath, "get", `receipts${migratedAt !== undefined ? `/${migratedAt}` : ""}`);
    }
    /**
     * Get the list of peers.
     * @returns The list of peers.
     */
    async peers() {
        return this.fetchJson(this._basePath, "get", "peers");
    }
    /**
     * Add a new peer.
     * @param multiAddress The address of the peer to add.
     * @param alias An optional alias for the peer.
     * @returns The details for the created peer.
     */
    async peerAdd(multiAddress, alias) {
        return this.fetchJson(this._basePath, "post", "peers", {
            multiAddress,
            alias
        });
    }
    /**
     * Delete a peer.
     * @param peerId The peer to delete.
     * @returns Nothing.
     */
    async peerDelete(peerId) {
        // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
        return this.fetchJson(this._basePath, "delete", `peers/${peerId}`);
    }
    /**
     * Get a peer.
     * @param peerId The peer to delete.
     * @returns The details for the created peer.
     */
    async peer(peerId) {
        return this.fetchJson(this._basePath, "get", `peers/${peerId}`);
    }
    /**
     * Get the protocol info from the node.
     * @returns The protocol info.
     */
    async protocolInfo() {
        if (this._protocol === undefined) {
            await this.populateProtocolInfoCache();
        }
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this._protocol;
    }
    /**
     * Extension method which provides request methods for plugins.
     * @param basePluginPath The base path for the plugin eg indexer/v1/ .
     * @param method The http method.
     * @param methodPath The path for the plugin request.
     * @param queryParams Additional query params for the request.
     * @param request The request object.
     * @returns The response object.
     */
    async pluginFetch(basePluginPath, method, methodPath, queryParams, request) {
        return this.fetchJson(this._basePluginPath, method, `${basePluginPath}${methodPath}${this.combineQueryParams(queryParams)}`, request);
    }
    /**
     * Perform a request and just return the status.
     * @param route The route of the request.
     * @returns The response.
     * @internal
     */
    async fetchStatus(route) {
        const response = await this.fetchWithTimeout("get", route);
        return response.status;
    }
    /**
     * Populate the info cached fields.
     * @internal
     */
    async populateProtocolInfoCache() {
        if (this._protocol === undefined) {
            const info = await this.info();
            const networkIdBytes = Blake2b.sum256(Converter.utf8ToBytes(info.protocol.networkName));
            this._protocol = {
                networkName: info.protocol.networkName,
                networkId: BigIntHelper.read8(networkIdBytes, 0).toString(),
                bech32HRP: info.protocol.bech32HRP,
                minPoWScore: info.protocol.minPoWScore
            };
        }
    }
    /**
     * Perform a request in json format.
     * @param basePath The base path for the request.
     * @param method The http method.
     * @param route The route of the request.
     * @param requestData Request to send to the endpoint.
     * @returns The response.
     * @internal
     */
    async fetchJson(basePath, method, route, requestData) {
        const response = await this.fetchWithTimeout(method, `${basePath}${route}`, { "Content-Type": "application/json" }, requestData ? JSON.stringify(requestData) : undefined);
        let errorMessage;
        let errorCode;
        if (response.ok) {
            if (response.status === 204) {
                // No content
                return {};
            }
            try {
                const responseData = await response.json();
                if (responseData.error) {
                    errorMessage = responseData.error.message;
                    errorCode = responseData.error.code;
                }
                else {
                    return responseData;
                }
            }
            catch { }
        }
        if (!errorMessage) {
            try {
                const json = await response.json();
                if (json.error) {
                    errorMessage = json.error.message;
                    errorCode = json.error.code;
                }
            }
            catch { }
        }
        if (!errorMessage) {
            try {
                const text = await response.text();
                if (text.length > 0) {
                    const match = /code=(\d+), message=(.*)/.exec(text);
                    if ((match === null || match === void 0 ? void 0 : match.length) === 3) {
                        errorCode = match[1];
                        errorMessage = match[2];
                    }
                    else {
                        errorMessage = text;
                    }
                }
            }
            catch { }
        }
        throw new ClientError(errorMessage !== null && errorMessage !== void 0 ? errorMessage : response.statusText, route, response.status, errorCode !== null && errorCode !== void 0 ? errorCode : response.status.toString());
    }
    /**
     * Perform a request for binary data.
     * @param basePath The base path for the request.
     * @param method The http method.
     * @param route The route of the request.
     * @param requestData Request to send to the endpoint.
     * @returns The response.
     * @internal
     */
    async fetchBinary(basePath, method, route, requestData) {
        var _a, _b, _c;
        const response = await this.fetchWithTimeout(method, `${basePath}${route}`, { "Content-Type": "application/octet-stream" }, requestData);
        let responseData;
        if (response.ok) {
            if (method === "get") {
                return new Uint8Array(await response.arrayBuffer());
            }
            responseData = await response.json();
            if (!(responseData === null || responseData === void 0 ? void 0 : responseData.error)) {
                return responseData === null || responseData === void 0 ? void 0 : responseData.data;
            }
        }
        if (!responseData) {
            responseData = await response.json();
        }
        throw new ClientError((_b = (_a = responseData === null || responseData === void 0 ? void 0 : responseData.error) === null || _a === void 0 ? void 0 : _a.message) !== null && _b !== void 0 ? _b : response.statusText, route, response.status, (_c = responseData === null || responseData === void 0 ? void 0 : responseData.error) === null || _c === void 0 ? void 0 : _c.code);
    }
    /**
     * Perform a fetch request.
     * @param method The http method.
     * @param route The route of the request.
     * @param headers The headers for the request.
     * @param requestData Request to send to the endpoint.
     * @returns The response.
     * @internal
     */
    async fetchWithTimeout(method, route, headers, body) {
        let controller;
        let timerId;
        if (this._timeout !== undefined) {
            controller = new AbortController();
            timerId = setTimeout(() => {
                if (controller) {
                    controller.abort();
                }
            }, this._timeout);
        }
        const finalHeaders = {};
        if (this._headers) {
            for (const header in this._headers) {
                finalHeaders[header] = this._headers[header];
            }
        }
        if (headers) {
            for (const header in headers) {
                finalHeaders[header] = headers[header];
            }
        }
        if (this._userName && this._password) {
            const userPass = Converter.bytesToBase64(Converter.utf8ToBytes(`${this._userName}:${this._password}`));
            finalHeaders.Authorization = `Basic ${userPass}`;
        }
        try {
            const response = await fetch(`${this._endpoint}${route}`, {
                method,
                headers: finalHeaders,
                body,
                signal: controller ? controller.signal : undefined
            });
            return response;
        }
        catch (err) {
            throw err instanceof Error && err.name === "AbortError" ? new Error("Timeout") : err;
        }
        finally {
            if (timerId) {
                clearTimeout(timerId);
            }
        }
    }
    /**
     * Combine the query params.
     * @param queryParams The quer params to combine.
     * @returns The combined query params.
     */
    combineQueryParams(queryParams) {
        return queryParams && queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
    }
}
/**
 * A zero nonce.
 * @internal
 */
SingleNodeClient.NONCE_ZERO = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2luZ2xlTm9kZUNsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGllbnRzL3NpbmdsZU5vZGVDbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsK0JBQStCO0FBQy9CLHNDQUFzQztBQUN0QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRSxPQUFPLE1BQU0sTUFBTSxhQUFhLENBQUM7QUFDakMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFVekUsT0FBTyxFQUFFLHdCQUF3QixFQUFZLE1BQU0sb0JBQW9CLENBQUM7QUFNeEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUc1Qzs7R0FFRztBQUNILE1BQU0sT0FBTyxnQkFBZ0I7SUF1RnpCOzs7O09BSUc7SUFDSCxZQUFZLFFBQWdCLEVBQUUsT0FBaUM7O1FBQzNELElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDWCxNQUFNLElBQUksS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUM7U0FDcEQ7UUFDRCxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBQSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsUUFBUSxtQ0FBSSxVQUFVLENBQUM7UUFDakQsSUFBSSxDQUFDLGVBQWUsR0FBRyxNQUFBLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxjQUFjLG1DQUFJLGVBQWUsQ0FBQztRQUNsRSxJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxXQUFXLENBQUM7UUFDekMsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsT0FBTyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLFFBQVEsQ0FBQztRQUNuQyxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxRQUFRLENBQUM7UUFDbkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsT0FBTyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxNQUFBLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxlQUFlLG1DQUFJLHdCQUF3QixDQUFDO1FBRTdFLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDekUsTUFBTSxJQUFJLEtBQUssQ0FBQyx3REFBd0QsQ0FBQyxDQUFDO1NBQzdFO1FBRUQsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFBLE1BQUEsSUFBSSxDQUFDLFFBQVEsMENBQUUsYUFBYSxNQUFJLE1BQUEsSUFBSSxDQUFDLFFBQVEsMENBQUUsYUFBYSxDQUFBLENBQUMsRUFBRTtZQUNwRyxNQUFNLElBQUksS0FBSyxDQUFDLDREQUE0RCxDQUFDLENBQUM7U0FDakY7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksS0FBSyxDQUFDLE1BQU07UUFDZixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFakQsSUFBSSxNQUFNLEtBQUssR0FBRyxFQUFFO1lBQ2hCLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7YUFBTSxJQUFJLE1BQU0sS0FBSyxHQUFHLEVBQUU7WUFDdkIsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFFRCxNQUFNLElBQUksV0FBVyxDQUFDLDBCQUEwQixFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksS0FBSyxDQUFDLElBQUk7UUFDYixPQUFPLElBQUksQ0FBQyxTQUFTLENBQW1CLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFRDs7O09BR0c7SUFDSSxLQUFLLENBQUMsSUFBSTtRQUNiLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBdUIsSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQWlCO1FBQ2xDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBa0IsSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsWUFBWSxTQUFTLEVBQUUsQ0FBQyxDQUFDO0lBQzNGLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksS0FBSyxDQUFDLGVBQWUsQ0FBQyxTQUFpQjtRQUMxQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQTBCLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLFlBQVksU0FBUyxXQUFXLENBQUMsQ0FBQztJQUM1RyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLEtBQUssQ0FBQyxVQUFVLENBQUMsU0FBaUI7UUFDckMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLFlBQVksU0FBUyxNQUFNLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBaUI7O1FBQ3hDLE9BQU8sQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDO1FBRWhELElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQztRQUNwQixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDbkIsMEVBQTBFO1lBQzFFLG1FQUFtRTtZQUNuRSx1Q0FBdUM7WUFDdkMsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLFNBQVMsRUFBRTtnQkFDOUIsTUFBTSxJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQzthQUMxQztZQUNELFdBQVcsR0FBRyxNQUFBLE1BQUEsSUFBSSxDQUFDLFNBQVMsMENBQUUsV0FBVyxtQ0FBSSxDQUFDLENBQUM7WUFFL0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsSUFBSSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDcEUsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQy9CLE9BQU8sQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO2FBQ2pEO1NBQ0o7UUFFRCxNQUFNLFdBQVcsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBQ3RDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN2QyxNQUFNLFlBQVksR0FBRyxXQUFXLENBQUMsVUFBVSxFQUFFLENBQUM7UUFFOUMsSUFBSSxZQUFZLENBQUMsTUFBTSxHQUFHLGtCQUFrQixFQUFFO1lBQzFDLE1BQU0sSUFBSSxLQUFLLENBQ1gseUJBQXlCLFlBQVksQ0FBQyxNQUFNLHVDQUF1QyxrQkFBa0IsRUFBRSxDQUMxRyxDQUFDO1NBQ0w7UUFFRCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDbkIsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFDckUsT0FBTyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDcEM7UUFFRCxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQStCLElBQUksQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUVqSCxPQUFPLFFBQVEsQ0FBQyxTQUFTLENBQUM7SUFDOUIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsT0FBbUI7O1FBQzdDLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxrQkFBa0IsRUFBRTtZQUNyQyxNQUFNLElBQUksS0FBSyxDQUNYLHlCQUF5QixPQUFPLENBQUMsTUFBTSx1Q0FBdUMsa0JBQWtCLEVBQUUsQ0FDckcsQ0FBQztTQUNMO1FBRUQsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUVuQyxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDeEYsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLFNBQVMsRUFBRTtnQkFDOUIsTUFBTSxJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQzthQUMxQztZQUNELE1BQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLE1BQUEsTUFBQSxJQUFJLENBQUMsU0FBUywwQ0FBRSxXQUFXLG1DQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3JGLFlBQVksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ25FO1FBRUQsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFxQixJQUFJLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFekcsT0FBUSxRQUErQixDQUFDLFNBQVMsQ0FBQztJQUN0RCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLEtBQUssQ0FBQyxlQUFlLENBQUMsU0FBaUI7UUFDMUMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUEyQixJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxZQUFZLFNBQVMsV0FBVyxDQUFDLENBQUM7SUFDN0csQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxLQUFLLENBQUMsMEJBQTBCLENBQUMsYUFBcUI7UUFDekQsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFrQixJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxnQkFBZ0IsYUFBYSxtQkFBbUIsQ0FBQyxDQUFDO0lBQ3BILENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFnQjtRQUNoQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQXlCLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLFdBQVcsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUNoRyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBYTtRQUNoQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQTRCLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLGNBQWMsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUNuRyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxLQUFhO1FBQzNDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBdUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsY0FBYyxLQUFLLGVBQWUsQ0FBQyxDQUFDO0lBQzNILENBQUM7SUFFRDs7O09BR0c7SUFDSSxLQUFLLENBQUMsUUFBUTtRQUNqQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQW1CLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQy9FLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFtQjtRQUNyQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQ2pCLElBQUksQ0FBQyxTQUFTLEVBQ2QsS0FBSyxFQUNMLFdBQVcsVUFBVSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQ2hFLENBQUM7SUFDTixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksS0FBSyxDQUFDLEtBQUs7UUFDZCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQWlCLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLEtBQUssQ0FBQyxPQUFPLENBQUMsWUFBb0IsRUFBRSxLQUFjO1FBQ3JELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FNbkIsSUFBSSxDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFO1lBQy9CLFlBQVk7WUFDWixLQUFLO1NBQ1IsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQWM7UUFDbEMsbUVBQW1FO1FBQ25FLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBYyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxTQUFTLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDcEYsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQWM7UUFDNUIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFlLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUNsRixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksS0FBSyxDQUFDLFlBQVk7UUFNckIsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLFNBQVMsRUFBRTtZQUM5QixNQUFNLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1NBQzFDO1FBRUQsb0VBQW9FO1FBQ3BFLE9BQU8sSUFBSSxDQUFDLFNBQVUsQ0FBQztJQUMzQixDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSSxLQUFLLENBQUMsV0FBVyxDQUFPLGNBQXNCLEVBQUUsTUFBaUMsRUFBRSxVQUFrQixFQUFFLFdBQXNCLEVBQUUsT0FBVztRQUM3SSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQU8sSUFBSSxDQUFDLGVBQWUsRUFBRSxNQUFNLEVBQUUsR0FBRyxjQUFjLEdBQUcsVUFBVSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2hKLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNLLEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBYTtRQUNuQyxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFM0QsT0FBTyxRQUFRLENBQUMsTUFBTSxDQUFDO0lBQzNCLENBQUM7SUFFRDs7O09BR0c7SUFDSyxLQUFLLENBQUMseUJBQXlCO1FBQ25DLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxTQUFTLEVBQUU7WUFDOUIsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFFL0IsTUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUV4RixJQUFJLENBQUMsU0FBUyxHQUFHO2dCQUNiLFdBQVcsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVc7Z0JBQ3RDLFNBQVMsRUFBRSxZQUFZLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUU7Z0JBQzNELFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVM7Z0JBQ2xDLFdBQVcsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVc7YUFDekMsQ0FBQztTQUNMO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0ssS0FBSyxDQUFDLFNBQVMsQ0FBTyxRQUFnQixFQUFFLE1BQWlDLEVBQUUsS0FBYSxFQUFFLFdBQWU7UUFDN0csTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQ3hDLE1BQU0sRUFDTixHQUFHLFFBQVEsR0FBRyxLQUFLLEVBQUUsRUFDckIsRUFBRSxjQUFjLEVBQUUsa0JBQWtCLEVBQUUsRUFDdEMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQ3hELENBQUM7UUFFRixJQUFJLFlBQWdDLENBQUM7UUFDckMsSUFBSSxTQUE2QixDQUFDO1FBRWxDLElBQUksUUFBUSxDQUFDLEVBQUUsRUFBRTtZQUNiLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3pCLGFBQWE7Z0JBQ2IsT0FBTyxFQUFPLENBQUM7YUFDbEI7WUFDRCxJQUFJO2dCQUNBLE1BQU0sWUFBWSxHQUFzRCxNQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFFOUYsSUFBSSxZQUFZLENBQUMsS0FBSyxFQUFFO29CQUNwQixZQUFZLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7b0JBQzFDLFNBQVMsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztpQkFDdkM7cUJBQU07b0JBQ0gsT0FBTyxZQUFZLENBQUM7aUJBQ3ZCO2FBQ0o7WUFBQyxNQUFNLEdBQUc7U0FDZDtRQUVELElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDZixJQUFJO2dCQUNBLE1BQU0sSUFBSSxHQUFHLE1BQU0sUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNuQyxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1osWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO29CQUNsQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7aUJBQy9CO2FBQ0o7WUFBQyxNQUFNLEdBQUc7U0FDZDtRQUVELElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDZixJQUFJO2dCQUNBLE1BQU0sSUFBSSxHQUFHLE1BQU0sUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNuQyxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUNqQixNQUFNLEtBQUssR0FBRywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3BELElBQUksQ0FBQSxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsTUFBTSxNQUFLLENBQUMsRUFBRTt3QkFDckIsU0FBUyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDckIsWUFBWSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDM0I7eUJBQU07d0JBQ0gsWUFBWSxHQUFHLElBQUksQ0FBQztxQkFDdkI7aUJBQ0o7YUFDSjtZQUFDLE1BQU0sR0FBRztTQUNkO1FBRUQsTUFBTSxJQUFJLFdBQVcsQ0FDakIsWUFBWSxhQUFaLFlBQVksY0FBWixZQUFZLEdBQUksUUFBUSxDQUFDLFVBQVUsRUFDbkMsS0FBSyxFQUNMLFFBQVEsQ0FBQyxNQUFNLEVBQ2YsU0FBUyxhQUFULFNBQVMsY0FBVCxTQUFTLEdBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FDMUMsQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNLLEtBQUssQ0FBQyxXQUFXLENBQ3JCLFFBQWdCLEVBQ2hCLE1BQXNCLEVBQ3RCLEtBQWEsRUFDYixXQUF3Qjs7UUFFeEIsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQ3hDLE1BQU0sRUFDTixHQUFHLFFBQVEsR0FBRyxLQUFLLEVBQUUsRUFDckIsRUFBRSxjQUFjLEVBQUUsMEJBQTBCLEVBQUUsRUFDOUMsV0FBVyxDQUNkLENBQUM7UUFFRixJQUFJLFlBQXNDLENBQUM7UUFDM0MsSUFBSSxRQUFRLENBQUMsRUFBRSxFQUFFO1lBQ2IsSUFBSSxNQUFNLEtBQUssS0FBSyxFQUFFO2dCQUNsQixPQUFPLElBQUksVUFBVSxDQUFDLE1BQU0sUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7YUFDdkQ7WUFDRCxZQUFZLEdBQUcsTUFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7WUFFckMsSUFBSSxDQUFDLENBQUEsWUFBWSxhQUFaLFlBQVksdUJBQVosWUFBWSxDQUFFLEtBQUssQ0FBQSxFQUFFO2dCQUN0QixPQUFPLFlBQVksYUFBWixZQUFZLHVCQUFaLFlBQVksQ0FBRSxJQUFTLENBQUM7YUFDbEM7U0FDSjtRQUVELElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDZixZQUFZLEdBQUcsTUFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDeEM7UUFFRCxNQUFNLElBQUksV0FBVyxDQUNqQixNQUFBLE1BQUEsWUFBWSxhQUFaLFlBQVksdUJBQVosWUFBWSxDQUFFLEtBQUssMENBQUUsT0FBTyxtQ0FBSSxRQUFRLENBQUMsVUFBVSxFQUNuRCxLQUFLLEVBQ0wsUUFBUSxDQUFDLE1BQU0sRUFDZixNQUFBLFlBQVksYUFBWixZQUFZLHVCQUFaLFlBQVksQ0FBRSxLQUFLLDBDQUFFLElBQUksQ0FDNUIsQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNLLEtBQUssQ0FBQyxnQkFBZ0IsQ0FDMUIsTUFBaUMsRUFDakMsS0FBYSxFQUNiLE9BQWtDLEVBQ2xDLElBQTBCO1FBRTFCLElBQUksVUFBdUMsQ0FBQztRQUM1QyxJQUFJLE9BQW1DLENBQUM7UUFFeEMsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLFNBQVMsRUFBRTtZQUM3QixVQUFVLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztZQUNuQyxPQUFPLEdBQUcsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDdEIsSUFBSSxVQUFVLEVBQUU7b0JBQ1osVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO2lCQUN0QjtZQUNMLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDckI7UUFFRCxNQUFNLFlBQVksR0FBNkIsRUFBRSxDQUFDO1FBRWxELElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLEtBQUssTUFBTSxNQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDaEMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDaEQ7U0FDSjtRQUVELElBQUksT0FBTyxFQUFFO1lBQ1QsS0FBSyxNQUFNLE1BQU0sSUFBSSxPQUFPLEVBQUU7Z0JBQzFCLFlBQVksQ0FBQyxNQUFNLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDMUM7U0FDSjtRQUVELElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2xDLE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN2RyxZQUFZLENBQUMsYUFBYSxHQUFHLFNBQVMsUUFBUSxFQUFFLENBQUM7U0FDcEQ7UUFFRCxJQUFJO1lBQ0EsTUFBTSxRQUFRLEdBQUcsTUFBTSxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssRUFBRSxFQUFFO2dCQUN0RCxNQUFNO2dCQUNOLE9BQU8sRUFBRSxZQUFZO2dCQUNyQixJQUFJO2dCQUNKLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVM7YUFDckQsQ0FBQyxDQUFDO1lBRUgsT0FBTyxRQUFRLENBQUM7U0FDbkI7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNWLE1BQU0sR0FBRyxZQUFZLEtBQUssSUFBSSxHQUFHLENBQUMsSUFBSSxLQUFLLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztTQUN4RjtnQkFBUztZQUNOLElBQUksT0FBTyxFQUFFO2dCQUNULFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUN6QjtTQUNKO0lBQ0wsQ0FBQztJQUVEOzs7O09BSUc7SUFDSyxrQkFBa0IsQ0FBQyxXQUFzQjtRQUM3QyxPQUFPLFdBQVcsSUFBSSxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNwRixDQUFDOztBQTdsQkQ7OztHQUdHO0FBQ3FCLDJCQUFVLEdBQWUsSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyJ9