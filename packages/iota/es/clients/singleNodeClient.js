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
        this._protocolVersion = (_c = options === null || options === void 0 ? void 0 : options.protocolVersion) !== null && _c !== void 0 ? _c : 1;
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
     * Get the bech 32 human readable part.
     * @returns The bech 32 human readable part.
     */
    async bech32Hrp() {
        var _a, _b;
        if (this._protocol === undefined) {
            await this.populateProtocolInfoCache();
        }
        return (_b = (_a = this._protocol) === null || _a === void 0 ? void 0 : _a.bech32HRP) !== null && _b !== void 0 ? _b : "";
    }
    /**
     * Get the network name.
     * @returns The network name.
     */
    async networkName() {
        var _a, _b;
        if (this._protocol === undefined) {
            await this.populateProtocolInfoCache();
        }
        return (_b = (_a = this._protocol) === null || _a === void 0 ? void 0 : _a.networkName) !== null && _b !== void 0 ? _b : "";
    }
    /**
     * Get the network id.
     * @returns The network id as the blake256 bytes.
     */
    async networkId() {
        var _a, _b;
        if (this._protocol === undefined) {
            await this.populateProtocolInfoCache();
        }
        return Blake2b.sum256(Converter.utf8ToBytes((_b = (_a = this._protocol) === null || _a === void 0 ? void 0 : _a.networkName) !== null && _b !== void 0 ? _b : ""));
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
            this._protocol = info.protocol;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2luZ2xlTm9kZUNsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGllbnRzL3NpbmdsZU5vZGVDbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsK0JBQStCO0FBQy9CLHNDQUFzQztBQUN0QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRSxPQUFPLE1BQU0sTUFBTSxhQUFhLENBQUM7QUFDakMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFpQnpFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHNUM7O0dBRUc7QUFDSCxNQUFNLE9BQU8sZ0JBQWdCO0lBbUV6Qjs7OztPQUlHO0lBQ0gsWUFBWSxRQUFnQixFQUFFLE9BQWlDOztRQUMzRCxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ1gsTUFBTSxJQUFJLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1NBQ3BEO1FBQ0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQUEsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLFFBQVEsbUNBQUksVUFBVSxDQUFDO1FBQ2pELElBQUksQ0FBQyxlQUFlLEdBQUcsTUFBQSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsY0FBYyxtQ0FBSSxlQUFlLENBQUM7UUFDbEUsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsV0FBVyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxhQUFQLE9BQU8sdUJB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