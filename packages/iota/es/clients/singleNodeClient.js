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
        var _a, _b, _c;
        if (!endpoint) {
            throw new Error("The endpoint can not be empty");
        }
        this._endpoint = endpoint.replace(/\/+$/, "");
        this._basePath = (_a = options === null || options === void 0 ? void 0 : options.basePath) !== null && _a !== void 0 ? _a : "/api/v1/";
        this._powProvider = options === null || options === void 0 ? void 0 : options.powProvider;
        this._timeout = options === null || options === void 0 ? void 0 : options.timeout;
        this._userName = options === null || options === void 0 ? void 0 : options.userName;
        this._password = options === null || options === void 0 ? void 0 : options.password;
        this._headers = options === null || options === void 0 ? void 0 : options.headers;
        if (this._userName && this._password && !this._endpoint.startsWith("https")) {
            throw new Error("Basic authentication requires the endpoint to be https");
        }
        if (this._userName && this._password && (((_b = this._headers) === null || _b === void 0 ? void 0 : _b.authorization) || ((_c = this._headers) === null || _c === void 0 ? void 0 : _c.Authorization))) {
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
        return this.fetchJson("get", "info");
    }
    /**
     * Get the tips from the node.
     * @returns The tips.
     */
    async tips() {
        return this.fetchJson("get", "tips");
    }
    /**
     * Get the message data by id.
     * @param messageId The message to get the data for.
     * @returns The message data.
     */
    async message(messageId) {
        return this.fetchJson("get", `messages/${messageId}`);
    }
    /**
     * Get the message metadata by id.
     * @param messageId The message to get the metadata for.
     * @returns The message metadata.
     */
    async messageMetadata(messageId) {
        return this.fetchJson("get", `messages/${messageId}/metadata`);
    }
    /**
     * Get the message raw data by id.
     * @param messageId The message to get the data for.
     * @returns The message raw data.
     */
    async messageRaw(messageId) {
        return this.fetchBinary("get", `messages/${messageId}/raw`);
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
        const response = await this.fetchJson("post", "messages", message);
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
        const response = await this.fetchBinary("post", "messages", message);
        return response.messageId;
    }
    /**
     * Find messages by index.
     * @param indexationKey The index value as a byte array or UTF8 string.
     * @returns The messageId.
     */
    async messagesFind(indexationKey) {
        return this.fetchJson("get", `messages?index=${typeof indexationKey === "string"
            ? Converter.utf8ToHex(indexationKey)
            : Converter.bytesToHex(indexationKey)}`);
    }
    /**
     * Get the children of a message.
     * @param messageId The id of the message to get the children for.
     * @returns The messages children.
     */
    async messageChildren(messageId) {
        return this.fetchJson("get", `messages/${messageId}/children`);
    }
    /**
     * Get the message that was included in the ledger for a transaction.
     * @param transactionId The id of the transaction to get the included message for.
     * @returns The message.
     */
    async transactionIncludedMessage(transactionId) {
        return this.fetchJson("get", `transactions/${transactionId}/included-message`);
    }
    /**
     * Find an output by its identifier.
     * @param outputId The id of the output to get.
     * @returns The output details.
     */
    async output(outputId) {
        return this.fetchJson("get", `outputs/${outputId}`);
    }
    /**
     * Find outputs by type.
     * @param type The type of the output to get.
     * @param issuer The issuer of the output.
     * @param sender The sender of the output.
     * @param index The index associated with the output.
     * @returns The outputs with the requested parameters.
     */
    async outputs(type, issuer, sender, index) {
        const queryParams = [];
        if (type !== undefined) {
            queryParams.push(`type=${type}`);
        }
        if (issuer !== undefined) {
            queryParams.push(`issuer=${issuer}`);
        }
        if (sender !== undefined) {
            queryParams.push(`sender=${sender}`);
        }
        if (index !== undefined) {
            queryParams.push(`index=${index}`);
        }
        return this.fetchJson("get", `outputs${this.combineQueryParams(queryParams)}`);
    }
    /**
     * Get the address details.
     * @param addressBech32 The address to get the details for.
     * @returns The address details.
     */
    async address(addressBech32) {
        return this.fetchJson("get", `addresses/${addressBech32}`);
    }
    /**
     * Get the address outputs.
     * @param addressBech32 The address to get the outputs for.
     * @param type Filter the type of outputs you are looking up, defaults to all.
     * @returns The address outputs.
     */
    async addressOutputs(addressBech32, type) {
        const queryParams = [];
        if (type !== undefined) {
            queryParams.push(`type=${type}`);
        }
        return this.fetchJson("get", `addresses/${addressBech32}/outputs${this.combineQueryParams(queryParams)}`);
    }
    /**
     * Get the address detail using ed25519 address.
     * @param addressEd25519 The address to get the details for.
     * @returns The address details.
     */
    async addressEd25519(addressEd25519) {
        if (!Converter.isHex(addressEd25519)) {
            throw new Error("The supplied address does not appear to be hex format");
        }
        return this.fetchJson("get", `addresses/ed25519/${addressEd25519}`);
    }
    /**
     * Get the address outputs using ed25519 address.
     * @param addressEd25519 The address to get the outputs for.
     * @param type Filter the type of outputs you are looking up, defaults to all.
     * @returns The address outputs.
     */
    async addressEd25519Outputs(addressEd25519, type) {
        if (!Converter.isHex(addressEd25519)) {
            throw new Error("The supplied address does not appear to be hex format");
        }
        const queryParams = [];
        if (type !== undefined) {
            queryParams.push(`type=${type}`);
        }
        return this.fetchJson("get", `addresses/ed25519/${addressEd25519}/outputs${this.combineQueryParams(queryParams)}`);
    }
    /**
     * Get the address outputs for an alias address.
     * @param addressAlias The address to get the outputs for.
     * @param type Filter the type of outputs you are looking up, defaults to all.
     * @returns The address outputs.
     */
    async addressAliasOutputs(addressAlias, type) {
        if (!Converter.isHex(addressAlias)) {
            throw new Error("The supplied address does not appear to be hex format");
        }
        const queryParams = [];
        if (type !== undefined) {
            queryParams.push(`type=${type}`);
        }
        return this.fetchJson("get", `addresses/alias/${addressAlias}/outputs${this.combineQueryParams(queryParams)}`);
    }
    /**
     * Get the address outputs for an NFT address.
     * @param addressNft The address to get the outputs for.
     * @param type Filter the type of outputs you are looking up, defaults to all.
     * @returns The address outputs.
     */
    async addressNftOutputs(addressNft, type) {
        if (!Converter.isHex(addressNft)) {
            throw new Error("The supplied address does not appear to be hex format");
        }
        const queryParams = [];
        if (type !== undefined) {
            queryParams.push(`type=${type}`);
        }
        return this.fetchJson("get", `addresses/nft/${addressNft}/outputs${this.combineQueryParams(queryParams)}`);
    }
    /**
     * Get the outputs for an alias.
     * @param aliasId The alias to get the outputs for.
     * @returns The outputs.
     */
    async alias(aliasId) {
        return this.fetchJson("get", `aliases/${aliasId}`);
    }
    /**
     * Get the outputs for an NFT.
     * @param nftId The NFT to get the outputs for.
     * @returns The outputs.
     */
    async nft(nftId) {
        return this.fetchJson("get", `nft/${nftId}`);
    }
    /**
     * Get the outputs for a foundry.
     * @param foundryId The foundry to get the outputs for.
     * @returns The outputs.
     */
    async foundry(foundryId) {
        return this.fetchJson("get", `foundries/${foundryId}`);
    }
    /**
     * Get the requested milestone.
     * @param index The index of the milestone to get.
     * @returns The milestone details.
     */
    async milestone(index) {
        return this.fetchJson("get", `milestones/${index}`);
    }
    /**
     * Get the requested milestone utxo changes.
     * @param index The index of the milestone to request the changes for.
     * @returns The milestone utxo changes details.
     */
    async milestoneUtxoChanges(index) {
        return this.fetchJson("get", `milestones/${index}/utxo-changes`);
    }
    /**
     * Get the current treasury output.
     * @returns The details for the treasury.
     */
    async treasury() {
        return this.fetchJson("get", "treasury");
    }
    /**
     * Get all the stored receipts or those for a given migrated at index.
     * @param migratedAt The index the receipts were migrated at, if not supplied returns all stored receipts.
     * @returns The stored receipts.
     */
    async receipts(migratedAt) {
        return this.fetchJson("get", `receipts${migratedAt !== undefined ? `/${migratedAt}` : ""}`);
    }
    /**
     * Get the list of peers.
     * @returns The list of peers.
     */
    async peers() {
        return this.fetchJson("get", "peers");
    }
    /**
     * Add a new peer.
     * @param multiAddress The address of the peer to add.
     * @param alias An optional alias for the peer.
     * @returns The details for the created peer.
     */
    async peerAdd(multiAddress, alias) {
        return this.fetchJson("post", "peers", {
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
        return this.fetchJson("delete", `peers/${peerId}`);
    }
    /**
     * Get a peer.
     * @param peerId The peer to delete.
     * @returns The details for the created peer.
     */
    async peer(peerId) {
        return this.fetchJson("get", `peers/${peerId}`);
    }
    /**
     * Perform a request and just return the status.
     * @param route The route of the request.
     * @returns The response.
     */
    async fetchStatus(route) {
        const response = await this.fetchWithTimeout("get", route);
        return response.status;
    }
    /**
     * Perform a request in json format.
     * @param method The http method.
     * @param route The route of the request.
     * @param requestData Request to send to the endpoint.
     * @returns The response.
     */
    async fetchJson(method, route, requestData) {
        const response = await this.fetchWithTimeout(method, `${this._basePath}${route}`, { "Content-Type": "application/json" }, requestData ? JSON.stringify(requestData) : undefined);
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
                    return responseData.data;
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
     * @param method The http method.
     * @param route The route of the request.
     * @param requestData Request to send to the endpoint.
     * @returns The response.
     */
    async fetchBinary(method, route, requestData) {
        var _a, _b, _c;
        const response = await this.fetchWithTimeout(method, `${this._basePath}${route}`, { "Content-Type": "application/octet-stream" }, requestData);
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
        return queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2luZ2xlTm9kZUNsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGllbnRzL3NpbmdsZU5vZGVDbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsK0JBQStCO0FBQy9CLHNDQUFzQztBQUN0QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRSxPQUFPLE1BQXNCLE1BQU0sYUFBYSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBb0J6RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzVDOztHQUVHO0FBQ0gsTUFBTSxPQUFPLGdCQUFnQjtJQWlEekI7Ozs7T0FJRztJQUNILFlBQVksUUFBZ0IsRUFBRSxPQUFpQzs7UUFDM0QsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNYLE1BQU0sSUFBSSxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQztTQUNwRDtRQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFBLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxRQUFRLG1DQUFJLFVBQVUsQ0FBQztRQUNqRCxJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxXQUFXLENBQUM7UUFDekMsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsT0FBTyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLFFB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