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
exports.SingleNodeClient = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
const message_1 = require("../binary/message");
const blake2b_1 = require("../crypto/blake2b");
const arrayHelper_1 = require("../utils/arrayHelper");
const bigIntHelper_1 = require("../utils/bigIntHelper");
const converter_1 = require("../utils/converter");
const writeStream_1 = require("../utils/writeStream");
const clientError_1 = require("./clientError");
/**
 * Client for API communication.
 */
class SingleNodeClient {
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
    health() {
        return __awaiter(this, void 0, void 0, function* () {
            const status = yield this.fetchStatus("/health");
            if (status === 200) {
                return true;
            }
            else if (status === 503) {
                return false;
            }
            throw new clientError_1.ClientError("Unexpected response code", "/health", status);
        });
    }
    /**
     * Get the info about the node.
     * @returns The node information.
     */
    info() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fetchJson("get", "info");
        });
    }
    /**
     * Get the tips from the node.
     * @returns The tips.
     */
    tips() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fetchJson("get", "tips");
        });
    }
    /**
     * Get the message data by id.
     * @param messageId The message to get the data for.
     * @returns The message data.
     */
    message(messageId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fetchJson("get", `messages/${messageId}`);
        });
    }
    /**
     * Get the message metadata by id.
     * @param messageId The message to get the metadata for.
     * @returns The message metadata.
     */
    messageMetadata(messageId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fetchJson("get", `messages/${messageId}/metadata`);
        });
    }
    /**
     * Get the message raw data by id.
     * @param messageId The message to get the data for.
     * @returns The message raw data.
     */
    messageRaw(messageId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fetchBinary("get", `messages/${messageId}/raw`);
        });
    }
    /**
     * Submit message.
     * @param message The message to submit.
     * @returns The messageId.
     */
    messageSubmit(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const writeStream = new writeStream_1.WriteStream();
            message_1.serializeMessage(writeStream, message);
            const messageBytes = writeStream.finalBytes();
            if (messageBytes.length > message_1.MAX_MESSAGE_LENGTH) {
                throw new Error(`The message length is ${messageBytes.length}, which exceeds the maximum size of ${message_1.MAX_MESSAGE_LENGTH}`);
            }
            if (!message.nonce || message.nonce.length === 0) {
                if (this._powProvider) {
                    const { networkId, minPoWScore } = yield this.getPoWInfo();
                    bigIntHelper_1.BigIntHelper.write8(networkId, messageBytes, 0);
                    message.networkId = networkId.toString();
                    const nonce = yield this._powProvider.pow(messageBytes, minPoWScore);
                    message.nonce = nonce.toString(10);
                }
                else {
                    message.nonce = "0";
                }
            }
            const response = yield this.fetchJson("post", "messages", message);
            return response.messageId;
        });
    }
    /**
     * Submit message in raw format.
     * @param message The message to submit.
     * @returns The messageId.
     */
    messageSubmitRaw(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (message.length > message_1.MAX_MESSAGE_LENGTH) {
                throw new Error(`The message length is ${message.length}, which exceeds the maximum size of ${message_1.MAX_MESSAGE_LENGTH}`);
            }
            if (this._powProvider && arrayHelper_1.ArrayHelper.equal(message.slice(-8), SingleNodeClient.NONCE_ZERO)) {
                const { networkId, minPoWScore } = yield this.getPoWInfo();
                bigIntHelper_1.BigIntHelper.write8(networkId, message, 0);
                const nonce = yield this._powProvider.pow(message, minPoWScore);
                bigIntHelper_1.BigIntHelper.write8(nonce, message, message.length - 8);
            }
            const response = yield this.fetchBinary("post", "messages", message);
            return response.messageId;
        });
    }
    /**
     * Find messages by index.
     * @param indexationKey The index value as a byte array or UTF8 string.
     * @returns The messageId.
     */
    messagesFind(indexationKey) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fetchJson("get", `messages?index=${typeof indexationKey === "string"
                ? converter_1.Converter.utf8ToHex(indexationKey)
                : converter_1.Converter.bytesToHex(indexationKey)}`);
        });
    }
    /**
     * Get the children of a message.
     * @param messageId The id of the message to get the children for.
     * @returns The messages children.
     */
    messageChildren(messageId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fetchJson("get", `messages/${messageId}/children`);
        });
    }
    /**
     * Get the message that was included in the ledger for a transaction.
     * @param transactionId The id of the transaction to get the included message for.
     * @returns The message.
     */
    transactionIncludedMessage(transactionId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fetchJson("get", `transactions/${transactionId}/included-message`);
        });
    }
    /**
     * Find an output by its identifier.
     * @param outputId The id of the output to get.
     * @returns The output details.
     */
    output(outputId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fetchJson("get", `outputs/${outputId}`);
        });
    }
    /**
     * Get the address details.
     * @param addressBech32 The address to get the details for.
     * @returns The address details.
     */
    address(addressBech32) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fetchJson("get", `addresses/${addressBech32}`);
        });
    }
    /**
     * Get the address outputs.
     * @param addressBech32 The address to get the outputs for.
     * @param type Filter the type of outputs you are looking up, defaults to all.
     * @param includeSpent Filter the type of outputs you are looking up, defaults to false.
     * @returns The address outputs.
     */
    addressOutputs(addressBech32, type, includeSpent) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryParams = [];
            if (type !== undefined) {
                queryParams.push(`type=${type}`);
            }
            if (includeSpent !== undefined) {
                queryParams.push(`include-spent=${includeSpent}`);
            }
            return this.fetchJson("get", `addresses/${addressBech32}/outputs${this.combineQueryParams(queryParams)}`);
        });
    }
    /**
     * Get the address detail using ed25519 address.
     * @param addressEd25519 The address to get the details for.
     * @returns The address details.
     */
    addressEd25519(addressEd25519) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!converter_1.Converter.isHex(addressEd25519)) {
                throw new Error("The supplied address does not appear to be hex format");
            }
            return this.fetchJson("get", `addresses/ed25519/${addressEd25519}`);
        });
    }
    /**
     * Get the address outputs using ed25519 address.
     * @param addressEd25519 The address to get the outputs for.
     * @param type Filter the type of outputs you are looking up, defaults to all.
     * @param includeSpent Filter the type of outputs you are looking up, defaults to false.
     * @returns The address outputs.
     */
    addressEd25519Outputs(addressEd25519, type, includeSpent) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!converter_1.Converter.isHex(addressEd25519)) {
                throw new Error("The supplied address does not appear to be hex format");
            }
            const queryParams = [];
            if (type !== undefined) {
                queryParams.push(`type=${type}`);
            }
            if (includeSpent !== undefined) {
                queryParams.push(`include-spent=${includeSpent}`);
            }
            return this.fetchJson("get", `addresses/ed25519/${addressEd25519}/outputs${this.combineQueryParams(queryParams)}`);
        });
    }
    /**
     * Get the requested milestone.
     * @param index The index of the milestone to get.
     * @returns The milestone details.
     */
    milestone(index) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fetchJson("get", `milestones/${index}`);
        });
    }
    /**
     * Get the requested milestone utxo changes.
     * @param index The index of the milestone to request the changes for.
     * @returns The milestone utxo changes details.
     */
    milestoneUtxoChanges(index) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fetchJson("get", `milestones/${index}/utxo-changes`);
        });
    }
    /**
     * Get the current treasury output.
     * @returns The details for the treasury.
     */
    treasury() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fetchJson("get", "treasury");
        });
    }
    /**
     * Get all the stored receipts or those for a given migrated at index.
     * @param migratedAt The index the receipts were migrated at, if not supplied returns all stored receipts.
     * @returns The stored receipts.
     */
    receipts(migratedAt) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fetchJson("get", `receipts${migratedAt !== undefined ? `/${migratedAt}` : ""}`);
        });
    }
    /**
     * Get the list of peers.
     * @returns The list of peers.
     */
    peers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fetchJson("get", "peers");
        });
    }
    /**
     * Add a new peer.
     * @param multiAddress The address of the peer to add.
     * @param alias An optional alias for the peer.
     * @returns The details for the created peer.
     */
    peerAdd(multiAddress, alias) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fetchJson("post", "peers", {
                multiAddress,
                alias
            });
        });
    }
    /**
     * Delete a peer.
     * @param peerId The peer to delete.
     * @returns Nothing.
     */
    peerDelete(peerId) {
        return __awaiter(this, void 0, void 0, function* () {
            // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
            return this.fetchJson("delete", `peers/${peerId}`);
        });
    }
    /**
     * Get a peer.
     * @param peerId The peer to delete.
     * @returns The details for the created peer.
     */
    peer(peerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fetchJson("get", `peers/${peerId}`);
        });
    }
    /**
     * Perform a request and just return the status.
     * @param route The route of the request.
     * @returns The response.
     */
    fetchStatus(route) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.fetchWithTimeout("get", route);
            return response.status;
        });
    }
    /**
     * Perform a request in json format.
     * @param method The http method.
     * @param route The route of the request.
     * @param requestData Request to send to the endpoint.
     * @returns The response.
     */
    fetchJson(method, route, requestData) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.fetchWithTimeout(method, `${this._basePath}${route}`, { "Content-Type": "application/json" }, requestData ? JSON.stringify(requestData) : undefined);
            let errorMessage;
            let errorCode;
            if (response.ok) {
                if (response.status === 204) {
                    // No content
                    return {};
                }
                try {
                    const responseData = yield response.json();
                    if (responseData.error) {
                        errorMessage = responseData.error.message;
                        errorCode = responseData.error.code;
                    }
                    else {
                        return responseData.data;
                    }
                }
                catch (_a) {
                }
            }
            if (!errorMessage) {
                try {
                    const json = yield response.json();
                    if (json.error) {
                        errorMessage = json.error.message;
                        errorCode = json.error.code;
                    }
                }
                catch (_b) { }
            }
            if (!errorMessage) {
                try {
                    const text = yield response.text();
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
                catch (_c) { }
            }
            throw new clientError_1.ClientError(errorMessage !== null && errorMessage !== void 0 ? errorMessage : response.statusText, route, response.status, errorCode !== null && errorCode !== void 0 ? errorCode : response.status.toString());
        });
    }
    /**
     * Perform a request for binary data.
     * @param method The http method.
     * @param route The route of the request.
     * @param requestData Request to send to the endpoint.
     * @returns The response.
     */
    fetchBinary(method, route, requestData) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.fetchWithTimeout(method, `${this._basePath}${route}`, { "Content-Type": "application/octet-stream" }, requestData);
            let responseData;
            if (response.ok) {
                if (method === "get") {
                    return new Uint8Array(yield response.arrayBuffer());
                }
                responseData = yield response.json();
                if (!(responseData === null || responseData === void 0 ? void 0 : responseData.error)) {
                    return responseData === null || responseData === void 0 ? void 0 : responseData.data;
                }
            }
            if (!responseData) {
                responseData = yield response.json();
            }
            throw new clientError_1.ClientError((_b = (_a = responseData === null || responseData === void 0 ? void 0 : responseData.error) === null || _a === void 0 ? void 0 : _a.message) !== null && _b !== void 0 ? _b : response.statusText, route, response.status, (_c = responseData === null || responseData === void 0 ? void 0 : responseData.error) === null || _c === void 0 ? void 0 : _c.code);
        });
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
    fetchWithTimeout(method, route, headers, body) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const userPass = converter_1.Converter.bytesToBase64(converter_1.Converter.utf8ToBytes(`${this._userName}:${this._password}`));
                finalHeaders.Authorization = `Basic ${userPass}`;
            }
            try {
                const response = yield fetch(`${this._endpoint}${route}`, {
                    method,
                    headers: finalHeaders,
                    body,
                    signal: controller ? controller.signal : undefined
                });
                return response;
            }
            catch (err) {
                throw err.name === "AbortError" ? new Error("Timeout") : err;
            }
            finally {
                if (timerId) {
                    clearTimeout(timerId);
                }
            }
        });
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
    getPoWInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            const nodeInfo = yield this.info();
            const networkIdBytes = blake2b_1.Blake2b.sum256(converter_1.Converter.utf8ToBytes(nodeInfo.networkId));
            return {
                networkId: bigIntHelper_1.BigIntHelper.read8(networkIdBytes, 0),
                minPoWScore: nodeInfo.minPoWScore
            };
        });
    }
}
exports.SingleNodeClient = SingleNodeClient;
/**
 * A zero nonce.
 * @internal
 */
SingleNodeClient.NONCE_ZERO = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2luZ2xlTm9kZUNsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGllbnRzL3NpbmdsZU5vZGVDbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsK0JBQStCO0FBQy9CLHNDQUFzQztBQUN0QywrQ0FBeUU7QUFDekUsK0NBQTRDO0FBbUI1QyxzREFBbUQ7QUFDbkQsd0RBQXFEO0FBQ3JELGtEQUErQztBQUMvQyxzREFBbUQ7QUFDbkQsK0NBQTRDO0FBRzVDOztHQUVHO0FBQ0gsTUFBYSxnQkFBZ0I7SUFpRHpCOzs7O09BSUc7SUFDSCxZQUFZLFFBQWdCLEVBQUUsT0FBaUM7O1FBQzNELElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDWCxNQUFNLElBQUksS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUM7U0FDcEQ7UUFDRCxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBQSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsUUFBUSxtQ0FBSSxVQUFVLENBQUM7UUFDakQsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsV0FBVyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLE9BQU8sQ0FBQztRQUNqQyxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxRQUFRLENBQUM7UUFDbkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsUUFBUSxDQUFDO1FBQ25DLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLE9BQU8sQ0FBQztRQUVq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