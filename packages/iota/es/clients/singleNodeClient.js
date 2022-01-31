// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { ArrayHelper, Blake2b } from "@iota/crypto.js";
import { BigIntHelper, Converter, WriteStream } from "@iota/util.js";
import bigInt from "big-integer";
import { MAX_MESSAGE_LENGTH, serializeMessage } from "../binary/message";
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
        var _a, _b, _c, _d;
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
        if (this._userName && this._password && !this._endpoint.startsWith("https")) {
            throw new Error("Basic authentication requires the endpoint to be https");
        }
        if (this._userName && this._password && (((_c = this._headers) === null || _c === void 0 ? void 0 : _c.authorization) || ((_d = this._headers) === null || _d === void 0 ? void 0 : _d.Authorization))) {
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
        let minPoWScore = 0;
        if (this._powProvider) {
            // If there is a local pow provider and no networkId or parent message ids
            // we must populate them, so that the they are not filled in by the
            // node causing invalid pow calculation
            const powInfo = await this.getPoWInfo();
            minPoWScore = powInfo.minPoWScore;
            if (!message.parentMessageIds || message.parentMessageIds.length === 0) {
                const tips = await this.tips();
                message.parentMessageIds = tips.tipMessageIds;
            }
            if (!message.networkId || message.networkId.length === 0) {
                message.networkId = powInfo.networkId.toString();
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
        if (message.length > MAX_MESSAGE_LENGTH) {
            throw new Error(`The message length is ${message.length}, which exceeds the maximum size of ${MAX_MESSAGE_LENGTH}`);
        }
        if (this._powProvider && ArrayHelper.equal(message.slice(-8), SingleNodeClient.NONCE_ZERO)) {
            const { networkId, minPoWScore } = await this.getPoWInfo();
            BigIntHelper.write8(networkId, message, 0);
            const nonce = await this._powProvider.pow(message, minPoWScore);
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
     * Get the bech 32 human readable part.
     * @returns The bech 32 human readable part.
     */
    async bech32Hrp() {
        if (this._bech32Hrp === undefined) {
            const info = await this.info();
            this._bech32Hrp = info.bech32HRP;
        }
        return this._bech32Hrp;
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
        return this.fetchJson(this._basePluginPath, method, `${basePluginPath}${methodPath}${this.combineQueryParams(queryParams)}`, request, false);
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
     * Perform a request in json format.
     * @param basePath The base path for the request.
     * @param method The http method.
     * @param route The route of the request.
     * @param requestData Request to send to the endpoint.
     * @param responseIsWrapped The response is wrapped in a data envelope.
     * @returns The response.
     * @internal
     */
    async fetchJson(basePath, method, route, requestData, responseIsWrapped = true) {
        const response = await this.fetchWithTimeout(method, `${basePath}${route}`, { "Content-Type": "application/json" }, requestData ? JSON.stringify(requestData) : undefined);
        let errorMessage;
        let errorCode;
        if (response.ok) {
            if (response.status === 204) {
                // No content
                return {};
            }
            try {
                if (responseIsWrapped) {
                    const responseData = await response.json();
                    if (responseData.error) {
                        errorMessage = responseData.error.message;
                        errorCode = responseData.error.code;
                    }
                    else {
                        return responseData.data;
                    }
                }
                else {
                    const responseData = await response.json();
                    if (responseData.error) {
                        errorMessage = responseData.error.message;
                        errorCode = responseData.error.code;
                    }
                    else {
                        return responseData;
                    }
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
    /**
     * Get the pow info from the node.
     * @returns The networkId and the minPoWScore.
     * @internal
     */
    async getPoWInfo() {
        const nodeInfo = await this.info();
        const networkIdBytes = Blake2b.sum256(Converter.utf8ToBytes(nodeInfo.networkId));
        return {
            networkId: BigIntHelper.read8(networkIdBytes, 0),
            minPoWScore: nodeInfo.minPoWScore
        };
    }
}
/**
 * A zero nonce.
 * @internal
 */
SingleNodeClient.NONCE_ZERO = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2luZ2xlTm9kZUNsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGllbnRzL3NpbmdsZU5vZGVDbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsK0JBQStCO0FBQy9CLHNDQUFzQztBQUN0QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRSxPQUFPLE1BQXNCLE1BQU0sYUFBYSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBZ0J6RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzVDOztHQUVHO0FBQ0gsTUFBTSxPQUFPLGdCQUFnQjtJQTZEekI7Ozs7T0FJRztJQUNILFlBQVksUUFBZ0IsRUFBRSxPQUFpQzs7UUFDM0QsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNYLE1BQU0sSUFBSSxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQztTQUNwRDtRQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFBLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxRQUFRLG1DQUFJLFVBQVUsQ0FBQztRQUNqRCxJQUFJLENBQUMsZUFBZSxHQUFHLE1BQUEsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLGNBQWMsbUNBQUksZUFBZSxDQUFDO1FBQ2xFLElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLFdBQVcsQ0FBQztRQUN6QyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sYUFBUCxPQUFPLHVC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