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
            let minPoWScore = 0;
            if (this._powProvider) {
                // If there is a local pow provider and no networkId or parent message ids
                // we must populate them, so that the they are not filled in by the
                // node causing invalid pow calculation
                const powInfo = yield this.getPoWInfo();
                minPoWScore = powInfo.minPoWScore;
                if (!message.parentMessageIds || message.parentMessageIds.length === 0) {
                    const tips = yield this.tips();
                    message.parentMessageIds = tips.tipMessageIds;
                }
                if (!message.networkId || message.networkId.length === 0) {
                    message.networkId = powInfo.networkId.toString();
                }
            }
            const writeStream = new writeStream_1.WriteStream();
            message_1.serializeMessage(writeStream, message);
            const messageBytes = writeStream.finalBytes();
            if (messageBytes.length > message_1.MAX_MESSAGE_LENGTH) {
                throw new Error(`The message length is ${messageBytes.length}, which exceeds the maximum size of ${message_1.MAX_MESSAGE_LENGTH}`);
            }
            if (this._powProvider) {
                const nonce = yield this._powProvider.pow(messageBytes, minPoWScore);
                message.nonce = nonce.toString(10);
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