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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingleNodeClient = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
var message_1 = require("../binary/message");
var blake2b_1 = require("../crypto/blake2b");
var arrayHelper_1 = require("../utils/arrayHelper");
var bigIntHelper_1 = require("../utils/bigIntHelper");
var converter_1 = require("../utils/converter");
var writeStream_1 = require("../utils/writeStream");
var clientError_1 = require("./clientError");
/**
 * Client for API communication.
 */
var SingleNodeClient = /** @class */ (function () {
    /**
     * Create a new instance of client.
     * @param endpoint The endpoint.
     * @param options Options for the client.
     */
    function SingleNodeClient(endpoint, options) {
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
    SingleNodeClient.prototype.health = function () {
        return __awaiter(this, void 0, void 0, function () {
            var status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetchStatus("/health")];
                    case 1:
                        status = _a.sent();
                        if (status === 200) {
                            return [2 /*return*/, true];
                        }
                        else if (status === 503) {
                            return [2 /*return*/, false];
                        }
                        throw new clientError_1.ClientError("Unexpected response code", "/health", status);
                }
            });
        });
    };
    /**
     * Get the info about the node.
     * @returns The node information.
     */
    SingleNodeClient.prototype.info = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetchJson("get", "info")];
            });
        });
    };
    /**
     * Get the tips from the node.
     * @returns The tips.
     */
    SingleNodeClient.prototype.tips = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetchJson("get", "tips")];
            });
        });
    };
    /**
     * Get the message data by id.
     * @param messageId The message to get the data for.
     * @returns The message data.
     */
    SingleNodeClient.prototype.message = function (messageId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetchJson("get", "messages/" + messageId)];
            });
        });
    };
    /**
     * Get the message metadata by id.
     * @param messageId The message to get the metadata for.
     * @returns The message metadata.
     */
    SingleNodeClient.prototype.messageMetadata = function (messageId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetchJson("get", "messages/" + messageId + "/metadata")];
            });
        });
    };
    /**
     * Get the message raw data by id.
     * @param messageId The message to get the data for.
     * @returns The message raw data.
     */
    SingleNodeClient.prototype.messageRaw = function (messageId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetchBinary("get", "messages/" + messageId + "/raw")];
            });
        });
    };
    /**
     * Submit message.
     * @param message The message to submit.
     * @returns The messageId.
     */
    SingleNodeClient.prototype.messageSubmit = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var writeStream, messageBytes, _a, networkId, minPoWScore, nonce, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        writeStream = new writeStream_1.WriteStream();
                        message_1.serializeMessage(writeStream, message);
                        messageBytes = writeStream.finalBytes();
                        if (messageBytes.length > message_1.MAX_MESSAGE_LENGTH) {
                            throw new Error("The message length is " + messageBytes.length + ", which exceeds the maximum size of " + message_1.MAX_MESSAGE_LENGTH);
                        }
                        if (!(!message.nonce || message.nonce.length === 0)) return [3 /*break*/, 4];
                        if (!this._powProvider) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getPoWInfo()];
                    case 1:
                        _a = _b.sent(), networkId = _a.networkId, minPoWScore = _a.minPoWScore;
                        bigIntHelper_1.BigIntHelper.write8(networkId, messageBytes, 0);
                        message.networkId = networkId.toString();
                        return [4 /*yield*/, this._powProvider.pow(messageBytes, minPoWScore)];
                    case 2:
                        nonce = _b.sent();
                        message.nonce = nonce.toString(10);
                        return [3 /*break*/, 4];
                    case 3:
                        message.nonce = "0";
                        _b.label = 4;
                    case 4: return [4 /*yield*/, this.fetchJson("post", "messages", message)];
                    case 5:
                        response = _b.sent();
                        return [2 /*return*/, response.messageId];
                }
            });
        });
    };
    /**
     * Submit message in raw format.
     * @param message The message to submit.
     * @returns The messageId.
     */
    SingleNodeClient.prototype.messageSubmitRaw = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, networkId, minPoWScore, nonce, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (message.length > message_1.MAX_MESSAGE_LENGTH) {
                            throw new Error("The message length is " + message.length + ", which exceeds the maximum size of " + message_1.MAX_MESSAGE_LENGTH);
                        }
                        if (!(this._powProvider && arrayHelper_1.ArrayHelper.equal(message.slice(-8), SingleNodeClient.NONCE_ZERO))) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getPoWInfo()];
                    case 1:
                        _a = _b.sent(), networkId = _a.networkId, minPoWScore = _a.minPoWScore;
                        bigIntHelper_1.BigIntHelper.write8(networkId, message, 0);
                        return [4 /*yield*/, this._powProvider.pow(message, minPoWScore)];
                    case 2:
                        nonce = _b.sent();
                        bigIntHelper_1.BigIntHelper.write8(nonce, message, message.length - 8);
                        _b.label = 3;
                    case 3: return [4 /*yield*/, this.fetchBinary("post", "messages", message)];
                    case 4:
                        response = _b.sent();
                        return [2 /*return*/, response.messageId];
                }
            });
        });
    };
    /**
     * Find messages by index.
     * @param indexationKey The index value as a byte array or UTF8 string.
     * @returns The messageId.
     */
    SingleNodeClient.prototype.messagesFind = function (indexationKey) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetchJson("get", "messages?index=" + (typeof indexationKey === "string"
                        ? converter_1.Converter.utf8ToHex(indexationKey)
                        : converter_1.Converter.bytesToHex(indexationKey)))];
            });
        });
    };
    /**
     * Get the children of a message.
     * @param messageId The id of the message to get the children for.
     * @returns The messages children.
     */
    SingleNodeClient.prototype.messageChildren = function (messageId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetchJson("get", "messages/" + messageId + "/children")];
            });
        });
    };
    /**
     * Get the message that was included in the ledger for a transaction.
     * @param transactionId The id of the transaction to get the included message for.
     * @returns The message.
     */
    SingleNodeClient.prototype.transactionIncludedMessage = function (transactionId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetchJson("get", "transactions/" + transactionId + "/included-message")];
            });
        });
    };
    /**
     * Find an output by its identifier.
     * @param outputId The id of the output to get.
     * @returns The output details.
     */
    SingleNodeClient.prototype.output = function (outputId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetchJson("get", "outputs/" + outputId)];
            });
        });
    };
    /**
     * Get the address details.
     * @param addressBech32 The address to get the details for.
     * @returns The address details.
     */
    SingleNodeClient.prototype.address = function (addressBech32) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetchJson("get", "addresses/" + addressBech32)];
            });
        });
    };
    /**
     * Get the address outputs.
     * @param addressBech32 The address to get the outputs for.
     * @param type Filter the type of outputs you are looking up, defaults to all.
     * @param includeSpent Filter the type of outputs you are looking up, defaults to false.
     * @returns The address outputs.
     */
    SingleNodeClient.prototype.addressOutputs = function (addressBech32, type, includeSpent) {
        return __awaiter(this, void 0, void 0, function () {
            var queryParams;
            return __generator(this, function (_a) {
                queryParams = [];
                if (type !== undefined) {
                    queryParams.push("type=" + type);
                }
                if (includeSpent !== undefined) {
                    queryParams.push("include-spent=" + includeSpent);
                }
                return [2 /*return*/, this.fetchJson("get", "addresses/" + addressBech32 + "/outputs" + this.combineQueryParams(queryParams))];
            });
        });
    };
    /**
     * Get the address detail using ed25519 address.
     * @param addressEd25519 The address to get the details for.
     * @returns The address details.
     */
    SingleNodeClient.prototype.addressEd25519 = function (addressEd25519) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!converter_1.Converter.isHex(addressEd25519)) {
                    throw new Error("The supplied address does not appear to be hex format");
                }
                return [2 /*return*/, this.fetchJson("get", "addresses/ed25519/" + addressEd25519)];
            });
        });
    };
    /**
     * Get the address outputs using ed25519 address.
     * @param addressEd25519 The address to get the outputs for.
     * @param type Filter the type of outputs you are looking up, defaults to all.
     * @param includeSpent Filter the type of outputs you are looking up, defaults to false.
     * @returns The address outputs.
     */
    SingleNodeClient.prototype.addressEd25519Outputs = function (addressEd25519, type, includeSpent) {
        return __awaiter(this, void 0, void 0, function () {
            var queryParams;
            return __generator(this, function (_a) {
                if (!converter_1.Converter.isHex(addressEd25519)) {
                    throw new Error("The supplied address does not appear to be hex format");
                }
                queryParams = [];
                if (type !== undefined) {
                    queryParams.push("type=" + type);
                }
                if (includeSpent !== undefined) {
                    queryParams.push("include-spent=" + includeSpent);
                }
                return [2 /*return*/, this.fetchJson("get", "addresses/ed25519/" + addressEd25519 + "/outputs" + this.combineQueryParams(queryParams))];
            });
        });
    };
    /**
     * Get the requested milestone.
     * @param index The index of the milestone to get.
     * @returns The milestone details.
     */
    SingleNodeClient.prototype.milestone = function (index) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetchJson("get", "milestones/" + index)];
            });
        });
    };
    /**
     * Get the requested milestone utxo changes.
     * @param index The index of the milestone to request the changes for.
     * @returns The milestone utxo changes details.
     */
    SingleNodeClient.prototype.milestoneUtxoChanges = function (index) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetchJson("get", "milestones/" + index + "/utxo-changes")];
            });
        });
    };
    /**
     * Get the current treasury output.
     * @returns The details for the treasury.
     */
    SingleNodeClient.prototype.treasury = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetchJson("get", "treasury")];
            });
        });
    };
    /**
     * Get all the stored receipts or those for a given migrated at index.
     * @param migratedAt The index the receipts were migrated at, if not supplied returns all stored receipts.
     * @returns The stored receipts.
     */
    SingleNodeClient.prototype.receipts = function (migratedAt) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetchJson("get", "receipts" + (migratedAt !== undefined ? "/" + migratedAt : ""))];
            });
        });
    };
    /**
     * Get the list of peers.
     * @returns The list of peers.
     */
    SingleNodeClient.prototype.peers = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetchJson("get", "peers")];
            });
        });
    };
    /**
     * Add a new peer.
     * @param multiAddress The address of the peer to add.
     * @param alias An optional alias for the peer.
     * @returns The details for the created peer.
     */
    SingleNodeClient.prototype.peerAdd = function (multiAddress, alias) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetchJson("post", "peers", {
                        multiAddress: multiAddress,
                        alias: alias
                    })];
            });
        });
    };
    /**
     * Delete a peer.
     * @param peerId The peer to delete.
     * @returns Nothing.
     */
    SingleNodeClient.prototype.peerDelete = function (peerId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
                return [2 /*return*/, this.fetchJson("delete", "peers/" + peerId)];
            });
        });
    };
    /**
     * Get a peer.
     * @param peerId The peer to delete.
     * @returns The details for the created peer.
     */
    SingleNodeClient.prototype.peer = function (peerId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetchJson("get", "peers/" + peerId)];
            });
        });
    };
    /**
     * Perform a request and just return the status.
     * @param route The route of the request.
     * @returns The response.
     * @internal
     */
    SingleNodeClient.prototype.fetchStatus = function (route) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetchWithTimeout("get", route)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.status];
                }
            });
        });
    };
    /**
     * Perform a request in json format.
     * @param method The http method.
     * @param route The route of the request.
     * @param requestData Request to send to the endpoint.
     * @returns The response.
     * @internal
     */
    SingleNodeClient.prototype.fetchJson = function (method, route, requestData) {
        return __awaiter(this, void 0, void 0, function () {
            var response, errorMessage, errorCode, responseData, _a, json, _b, text, match, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.fetchWithTimeout(method, "" + this._basePath + route, { "Content-Type": "application/json" }, requestData ? JSON.stringify(requestData) : undefined)];
                    case 1:
                        response = _d.sent();
                        if (!response.ok) return [3 /*break*/, 5];
                        if (response.status === 204) {
                            // No content
                            return [2 /*return*/, {}];
                        }
                        _d.label = 2;
                    case 2:
                        _d.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, response.json()];
                    case 3:
                        responseData = _d.sent();
                        if (responseData.error) {
                            errorMessage = responseData.error.message;
                            errorCode = responseData.error.code;
                        }
                        else {
                            return [2 /*return*/, responseData.data];
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        _a = _d.sent();
                        return [3 /*break*/, 5];
                    case 5:
                        if (!!errorMessage) return [3 /*break*/, 9];
                        _d.label = 6;
                    case 6:
                        _d.trys.push([6, 8, , 9]);
                        return [4 /*yield*/, response.json()];
                    case 7:
                        json = _d.sent();
                        if (json.error) {
                            errorMessage = json.error.message;
                            errorCode = json.error.code;
                        }
                        return [3 /*break*/, 9];
                    case 8:
                        _b = _d.sent();
                        return [3 /*break*/, 9];
                    case 9:
                        if (!!errorMessage) return [3 /*break*/, 13];
                        _d.label = 10;
                    case 10:
                        _d.trys.push([10, 12, , 13]);
                        return [4 /*yield*/, response.text()];
                    case 11:
                        text = _d.sent();
                        if (text.length > 0) {
                            match = /code=(\d+), message=(.*)/.exec(text);
                            if ((match === null || match === void 0 ? void 0 : match.length) === 3) {
                                errorCode = match[1];
                                errorMessage = match[2];
                            }
                            else {
                                errorMessage = text;
                            }
                        }
                        return [3 /*break*/, 13];
                    case 12:
                        _c = _d.sent();
                        return [3 /*break*/, 13];
                    case 13: throw new clientError_1.ClientError(errorMessage !== null && errorMessage !== void 0 ? errorMessage : response.statusText, route, response.status, errorCode !== null && errorCode !== void 0 ? errorCode : response.status.toString());
                }
            });
        });
    };
    /**
     * Perform a request for binary data.
     * @param method The http method.
     * @param route The route of the request.
     * @param requestData Request to send to the endpoint.
     * @returns The response.
     * @internal
     */
    SingleNodeClient.prototype.fetchBinary = function (method, route, requestData) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var response, responseData, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, this.fetchWithTimeout(method, "" + this._basePath + route, { "Content-Type": "application/octet-stream" }, requestData)];
                    case 1:
                        response = _e.sent();
                        if (!response.ok) return [3 /*break*/, 5];
                        if (!(method === "get")) return [3 /*break*/, 3];
                        _d = Uint8Array.bind;
                        return [4 /*yield*/, response.arrayBuffer()];
                    case 2: return [2 /*return*/, new (_d.apply(Uint8Array, [void 0, _e.sent()]))()];
                    case 3: return [4 /*yield*/, response.json()];
                    case 4:
                        responseData = _e.sent();
                        if (!(responseData === null || responseData === void 0 ? void 0 : responseData.error)) {
                            return [2 /*return*/, responseData === null || responseData === void 0 ? void 0 : responseData.data];
                        }
                        _e.label = 5;
                    case 5:
                        if (!!responseData) return [3 /*break*/, 7];
                        return [4 /*yield*/, response.json()];
                    case 6:
                        responseData = _e.sent();
                        _e.label = 7;
                    case 7: throw new clientError_1.ClientError((_b = (_a = responseData === null || responseData === void 0 ? void 0 : responseData.error) === null || _a === void 0 ? void 0 : _a.message) !== null && _b !== void 0 ? _b : response.statusText, route, response.status, (_c = responseData === null || responseData === void 0 ? void 0 : responseData.error) === null || _c === void 0 ? void 0 : _c.code);
                }
            });
        });
    };
    /**
     * Perform a fetch request.
     * @param method The http method.
     * @param route The route of the request.
     * @param headers The headers for the request.
     * @param requestData Request to send to the endpoint.
     * @returns The response.
     * @internal
     */
    SingleNodeClient.prototype.fetchWithTimeout = function (method, route, headers, body) {
        return __awaiter(this, void 0, void 0, function () {
            var controller, timerId, finalHeaders, header, header, userPass, response, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._timeout !== undefined) {
                            controller = new AbortController();
                            timerId = setTimeout(function () {
                                if (controller) {
                                    controller.abort();
                                }
                            }, this._timeout);
                        }
                        finalHeaders = {};
                        if (this._headers) {
                            for (header in this._headers) {
                                finalHeaders[header] = this._headers[header];
                            }
                        }
                        if (headers) {
                            for (header in headers) {
                                finalHeaders[header] = headers[header];
                            }
                        }
                        if (this._userName && this._password) {
                            userPass = converter_1.Converter.bytesToBase64(converter_1.Converter.utf8ToBytes(this._userName + ":" + this._password));
                            finalHeaders.Authorization = "Basic " + userPass;
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, fetch("" + this._endpoint + route, {
                                method: method,
                                headers: finalHeaders,
                                body: body,
                                signal: controller ? controller.signal : undefined
                            })];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response];
                    case 3:
                        err_1 = _a.sent();
                        throw err_1.name === "AbortError" ? new Error("Timeout") : err_1;
                    case 4:
                        if (timerId) {
                            clearTimeout(timerId);
                        }
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Combine the query params.
     * @param queryParams The quer params to combine.
     * @returns The combined query params.
     */
    SingleNodeClient.prototype.combineQueryParams = function (queryParams) {
        return queryParams.length > 0 ? "?" + queryParams.join("&") : "";
    };
    /**
     * Get the pow info from the node.
     * @returns The networkId and the minPoWScore.
     * @internal
     */
    SingleNodeClient.prototype.getPoWInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var nodeInfo, networkIdBytes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.info()];
                    case 1:
                        nodeInfo = _a.sent();
                        networkIdBytes = blake2b_1.Blake2b.sum256(converter_1.Converter.utf8ToBytes(nodeInfo.networkId));
                        return [2 /*return*/, {
                                networkId: bigIntHelper_1.BigIntHelper.read8(networkIdBytes, 0),
                                minPoWScore: nodeInfo.minPoWScore
                            }];
                }
            });
        });
    };
    /**
     * A zero nonce.
     * @internal
     */
    SingleNodeClient.NONCE_ZERO = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);
    return SingleNodeClient;
}());
exports.SingleNodeClient = SingleNodeClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2luZ2xlTm9kZUNsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGllbnRzL3NpbmdsZU5vZGVDbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0JBQStCO0FBQy9CLHNDQUFzQztBQUN0Qyw2Q0FBeUU7QUFDekUsNkNBQTRDO0FBbUI1QyxvREFBbUQ7QUFDbkQsc0RBQXFEO0FBQ3JELGdEQUErQztBQUMvQyxvREFBbUQ7QUFDbkQsNkNBQTRDO0FBRzVDOztHQUVHO0FBQ0g7SUFpREk7Ozs7T0FJRztJQUNILDBCQUFZLFFBQWdCLEVBQUUsT0FBaUM7O1FBQzNELElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDWCxNQUFNLElBQUksS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUM7U0FDcEQ7UUFDRCxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBQSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsUUFBUSxtQ0FBSSxVQUFVLENBQUM7UUFDakQsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsV0FBVyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLE9BQU8sQ0FBQztRQUNqQyxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxRQUFRLENBQUM7UUFDbkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsUUFBUSxDQUFDO1FBQ25DLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLE9BQU8sQ0FBQztRQUVqQyxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3pFLE1BQU0sSUFBSSxLQUFLLENBQUMsd0RBQXdELENBQUMsQ0FBQztTQUM3RTtRQUVELElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQSxNQUFBLElBQUksQ0FBQyxRQUFRLDBDQUFFLGFBQWEsTUFBSSxNQUFBLElBQUksQ0FBQyxRQUFRLDBDQUFFLGFBQWEsQ0FBQSxDQUFDLEVBQUU7WUFDcEcsTUFBTSxJQUFJLEtBQUssQ0FBQyw0REFBNEQsQ0FBQyxDQUFDO1NBQ2pGO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRztJQUNVLGlDQUFNLEdBQW5COzs7Ozs0QkFDbUIscUJBQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsRUFBQTs7d0JBQTFDLE1BQU0sR0FBRyxTQUFpQzt3QkFFaEQsSUFBSSxNQUFNLEtBQUssR0FBRyxFQUFFOzRCQUNoQixzQkFBTyxJQUFJLEVBQUM7eUJBQ2Y7NkJBQU0sSUFBSSxNQUFNLEtBQUssR0FBRyxFQUFFOzRCQUN2QixzQkFBTyxLQUFLLEVBQUM7eUJBQ2hCO3dCQUVELE1BQU0sSUFBSSx5QkFBVyxDQUFDLDBCQUEwQixFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQzs7OztLQUN4RTtJQUVEOzs7T0FHRztJQUNVLCtCQUFJLEdBQWpCOzs7Z0JBQ0ksc0JBQU8sSUFBSSxDQUFDLFNBQVMsQ0FBbUIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxFQUFDOzs7S0FDMUQ7SUFFRDs7O09BR0c7SUFDVSwrQkFBSSxHQUFqQjs7O2dCQUNJLHNCQUFPLElBQUksQ0FBQyxTQUFTLENBQXVCLEtBQUssRUFBRSxNQUFNLENBQUMsRUFBQzs7O0tBQzlEO0lBRUQ7Ozs7T0FJRztJQUNVLGtDQUFPLEdBQXBCLFVBQXFCLFNBQWlCOzs7Z0JBQ2xDLHNCQUFPLElBQUksQ0FBQyxTQUFTLENBQWtCLEtBQUssRUFBRSxjQUFZLFNBQVcsQ0FBQyxFQUFDOzs7S0FDMUU7SUFFRDs7OztPQUlHO0lBQ1UsMENBQWUsR0FBNUIsVUFBNkIsU0FBaUI7OztnQkFDMUMsc0JBQU8sSUFBSSxDQUFDLFNBQVMsQ0FBMEIsS0FBSyxFQUFFLGNBQVksU0FBUyxjQUFXLENBQUMsRUFBQzs7O0tBQzNGO0lBRUQ7Ozs7T0FJRztJQUNVLHFDQUFVLEdBQXZCLFVBQXdCLFNBQWlCOzs7Z0JBQ3JDLHNCQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLGNBQVksU0FBUyxTQUFNLENBQUMsRUFBQzs7O0tBQy9EO0lBRUQ7Ozs7T0FJRztJQUNVLHdDQUFhLEdBQTFCLFVBQTJCLE9BQWlCOzs7Ozs7d0JBQ2xDLFdBQVcsR0FBRyxJQUFJLHlCQUFXLEVBQUUsQ0FBQzt3QkFDdEMsMEJBQWdCLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO3dCQUNqQyxZQUFZLEdBQUcsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDO3dCQUU5QyxJQUFJLFlBQVksQ0FBQyxNQUFNLEdBQUcsNEJBQWtCLEVBQUU7NEJBQzFDLE1BQU0sSUFBSSxLQUFLLENBQUMsMkJBQXlCLFlBQVksQ0FBQyxNQUFNLDRDQUNqQiw0QkFBb0IsQ0FBQyxDQUFDO3lCQUNwRTs2QkFFRyxDQUFBLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUEsRUFBNUMsd0JBQTRDOzZCQUN4QyxJQUFJLENBQUMsWUFBWSxFQUFqQix3QkFBaUI7d0JBQ2tCLHFCQUFNLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBQTs7d0JBQXBELEtBQTZCLFNBQXVCLEVBQWxELFNBQVMsZUFBQSxFQUFFLFdBQVcsaUJBQUE7d0JBQzlCLDJCQUFZLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUM7d0JBQ2hELE9BQU8sQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO3dCQUUzQixxQkFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsV0FBVyxDQUFDLEVBQUE7O3dCQUE5RCxLQUFLLEdBQUcsU0FBc0Q7d0JBQ3BFLE9BQU8sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7O3dCQUVuQyxPQUFPLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQzs7NEJBSVgscUJBQU0sSUFBSSxDQUFDLFNBQVMsQ0FBK0IsTUFBTSxFQUFFLFVBQVUsRUFBRSxPQUFPLENBQUMsRUFBQTs7d0JBQTFGLFFBQVEsR0FBRyxTQUErRTt3QkFFaEcsc0JBQU8sUUFBUSxDQUFDLFNBQVMsRUFBQzs7OztLQUM3QjtJQUVEOzs7O09BSUc7SUFDVSwyQ0FBZ0IsR0FBN0IsVUFBOEIsT0FBbUI7Ozs7Ozt3QkFDN0MsSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLDRCQUFrQixFQUFFOzRCQUNyQyxNQUFNLElBQUksS0FBSyxDQUFDLDJCQUF5QixPQUFPLENBQUMsTUFBTSw0Q0FDWiw0QkFBb0IsQ0FBQyxDQUFDO3lCQUNwRTs2QkFDRyxDQUFBLElBQUksQ0FBQyxZQUFZLElBQUkseUJBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFBLEVBQXRGLHdCQUFzRjt3QkFDbkQscUJBQU0sSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFBOzt3QkFBcEQsS0FBNkIsU0FBdUIsRUFBbEQsU0FBUyxlQUFBLEVBQUUsV0FBVyxpQkFBQTt3QkFDOUIsMkJBQVksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQzt3QkFDN0IscUJBQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxFQUFBOzt3QkFBekQsS0FBSyxHQUFHLFNBQWlEO3dCQUMvRCwyQkFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7OzRCQUczQyxxQkFBTSxJQUFJLENBQUMsV0FBVyxDQUFxQixNQUFNLEVBQUUsVUFBVSxFQUFFLE9BQU8sQ0FBQyxFQUFBOzt3QkFBbEYsUUFBUSxHQUFHLFNBQXVFO3dCQUV4RixzQkFBUSxRQUErQixDQUFDLFNBQVMsRUFBQzs7OztLQUNyRDtJQUVEOzs7O09BSUc7SUFDVSx1Q0FBWSxHQUF6QixVQUEwQixhQUFrQzs7O2dCQUN4RCxzQkFBTyxJQUFJLENBQUMsU0FBUyxDQUNqQixLQUFLLEVBQ0wscUJBQWtCLE9BQU8sYUFBYSxLQUFLLFFBQVE7d0JBQy9DLENBQUMsQ0FBQyxxQkFBUyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUM7d0JBQ3BDLENBQUMsQ0FBQyxxQkFBUyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBRSxDQUM5QyxFQUFDOzs7S0FDTDtJQUVEOzs7O09BSUc7SUFDVSwwQ0FBZSxHQUE1QixVQUE2QixTQUFpQjs7O2dCQUMxQyxzQkFBTyxJQUFJLENBQUMsU0FBUyxDQUNqQixLQUFLLEVBQ0wsY0FBWSxTQUFTLGNBQVcsQ0FDbkMsRUFBQzs7O0tBQ0w7SUFFRDs7OztPQUlHO0lBQ1UscURBQTBCLEdBQXZDLFVBQXdDLGFBQXFCOzs7Z0JBQ3pELHNCQUFPLElBQUksQ0FBQyxTQUFTLENBQ2pCLEtBQUssRUFDTCxrQkFBZ0IsYUFBYSxzQkFBbUIsQ0FDbkQsRUFBQzs7O0tBQ0w7SUFFRDs7OztPQUlHO0lBQ1UsaUNBQU0sR0FBbkIsVUFBb0IsUUFBZ0I7OztnQkFDaEMsc0JBQU8sSUFBSSxDQUFDLFNBQVMsQ0FDakIsS0FBSyxFQUNMLGFBQVcsUUFBVSxDQUN4QixFQUFDOzs7S0FDTDtJQUVEOzs7O09BSUc7SUFDVSxrQ0FBTyxHQUFwQixVQUFxQixhQUFxQjs7O2dCQUN0QyxzQkFBTyxJQUFJLENBQUMsU0FBUyxDQUNqQixLQUFLLEVBQ0wsZUFBYSxhQUFlLENBQy9CLEVBQUM7OztLQUNMO0lBRUQ7Ozs7OztPQU1HO0lBQ1UseUNBQWMsR0FBM0IsVUFBNEIsYUFBcUIsRUFBRSxJQUFhLEVBQUUsWUFBc0I7Ozs7Z0JBRTlFLFdBQVcsR0FBRyxFQUFFLENBQUM7Z0JBQ3ZCLElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtvQkFDcEIsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFRLElBQU0sQ0FBQyxDQUFDO2lCQUNwQztnQkFDRCxJQUFJLFlBQVksS0FBSyxTQUFTLEVBQUU7b0JBQzVCLFdBQVcsQ0FBQyxJQUFJLENBQUMsbUJBQWlCLFlBQWMsQ0FBQyxDQUFDO2lCQUNyRDtnQkFDRCxzQkFBTyxJQUFJLENBQUMsU0FBUyxDQUNqQixLQUFLLEVBQ0wsZUFBYSxhQUFhLGdCQUFXLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUcsQ0FDOUUsRUFBQzs7O0tBQ0w7SUFFRDs7OztPQUlHO0lBQ1UseUNBQWMsR0FBM0IsVUFBNEIsY0FBc0I7OztnQkFDOUMsSUFBSSxDQUFDLHFCQUFTLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxFQUFFO29CQUNsQyxNQUFNLElBQUksS0FBSyxDQUFDLHVEQUF1RCxDQUFDLENBQUM7aUJBQzVFO2dCQUNELHNCQUFPLElBQUksQ0FBQyxTQUFTLENBQ2pCLEtBQUssRUFDTCx1QkFBcUIsY0FBZ0IsQ0FDeEMsRUFBQzs7O0tBQ0w7SUFFRDs7Ozs7O09BTUc7SUFDVSxnREFBcUIsR0FBbEMsVUFBbUMsY0FBc0IsRUFBRSxJQUFhLEVBQUUsWUFBc0I7Ozs7Z0JBRTVGLElBQUksQ0FBQyxxQkFBUyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsRUFBRTtvQkFDbEMsTUFBTSxJQUFJLEtBQUssQ0FBQyx1REFBdUQsQ0FBQyxDQUFDO2lCQUM1RTtnQkFDSyxXQUFXLEdBQUcsRUFBRSxDQUFDO2dCQUN2QixJQUFJLElBQUksS0FBSyxTQUFTLEVBQUU7b0JBQ3BCLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBUSxJQUFNLENBQUMsQ0FBQztpQkFDcEM7Z0JBQ0QsSUFBSSxZQUFZLEtBQUssU0FBUyxFQUFFO29CQUM1QixXQUFXLENBQUMsSUFBSSxDQUFDLG1CQUFpQixZQUFjLENBQUMsQ0FBQztpQkFDckQ7Z0JBQ0Qsc0JBQU8sSUFBSSxDQUFDLFNBQVMsQ0FDakIsS0FBSyxFQUNMLHVCQUFxQixjQUFjLGdCQUFXLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUcsQ0FDdkYsRUFBQzs7O0tBQ0w7SUFFRDs7OztPQUlHO0lBQ1Usb0NBQVMsR0FBdEIsVUFBdUIsS0FBYTs7O2dCQUNoQyxzQkFBTyxJQUFJLENBQUMsU0FBUyxDQUNqQixLQUFLLEVBQ0wsZ0JBQWMsS0FBTyxDQUN4QixFQUFDOzs7S0FDTDtJQUVEOzs7O09BSUc7SUFDVSwrQ0FBb0IsR0FBakMsVUFBa0MsS0FBYTs7O2dCQUMzQyxzQkFBTyxJQUFJLENBQUMsU0FBUyxDQUNqQixLQUFLLEVBQ0wsZ0JBQWMsS0FBSyxrQkFBZSxDQUNyQyxFQUFDOzs7S0FDTDtJQUVEOzs7T0FHRztJQUNVLG1DQUFRLEdBQXJCOzs7Z0JBQ0ksc0JBQU8sSUFBSSxDQUFDLFNBQVMsQ0FDakIsS0FBSyxFQUNMLFVBQVUsQ0FDYixFQUFDOzs7S0FDTDtJQUVEOzs7O09BSUc7SUFDVSxtQ0FBUSxHQUFyQixVQUFzQixVQUFtQjs7O2dCQUNyQyxzQkFBTyxJQUFJLENBQUMsU0FBUyxDQUNqQixLQUFLLEVBQ0wsY0FBVyxVQUFVLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFJLFVBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFFLENBQ2hFLEVBQUM7OztLQUNMO0lBRUQ7OztPQUdHO0lBQ1UsZ0NBQUssR0FBbEI7OztnQkFDSSxzQkFBTyxJQUFJLENBQUMsU0FBUyxDQUNqQixLQUFLLEVBQ0wsT0FBTyxDQUNWLEVBQUM7OztLQUNMO0lBRUQ7Ozs7O09BS0c7SUFDVSxrQ0FBTyxHQUFwQixVQUFxQixZQUFvQixFQUFFLEtBQWM7OztnQkFDckQsc0JBQU8sSUFBSSxDQUFDLFNBQVMsQ0FJakIsTUFBTSxFQUNOLE9BQU8sRUFDUDt3QkFDSSxZQUFZLGNBQUE7d0JBQ1osS0FBSyxPQUFBO3FCQUNSLENBQ0osRUFBQzs7O0tBQ0w7SUFFRDs7OztPQUlHO0lBQ1UscUNBQVUsR0FBdkIsVUFBd0IsTUFBYzs7O2dCQUNsQyxtRUFBbUU7Z0JBQ25FLHNCQUFPLElBQUksQ0FBQyxTQUFTLENBQ2pCLFFBQVEsRUFDUixXQUFTLE1BQVEsQ0FDcEIsRUFBQzs7O0tBQ0w7SUFFRDs7OztPQUlHO0lBQ1UsK0JBQUksR0FBakIsVUFBa0IsTUFBYzs7O2dCQUM1QixzQkFBTyxJQUFJLENBQUMsU0FBUyxDQUNqQixLQUFLLEVBQ0wsV0FBUyxNQUFRLENBQ3BCLEVBQUM7OztLQUNMO0lBRUQ7Ozs7O09BS0c7SUFDVyxzQ0FBVyxHQUF6QixVQUEwQixLQUFhOzs7Ozs0QkFDbEIscUJBQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsRUFBQTs7d0JBQXBELFFBQVEsR0FBRyxTQUF5Qzt3QkFFMUQsc0JBQU8sUUFBUSxDQUFDLE1BQU0sRUFBQzs7OztLQUMxQjtJQUVEOzs7Ozs7O09BT0c7SUFDVyxvQ0FBUyxHQUF2QixVQUE4QixNQUFpQyxFQUFFLEtBQWEsRUFBRSxXQUFlOzs7Ozs0QkFDMUUscUJBQU0sSUFBSSxDQUFDLGdCQUFnQixDQUN4QyxNQUFNLEVBQ04sS0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQU8sRUFDM0IsRUFBRSxjQUFjLEVBQUUsa0JBQWtCLEVBQUUsRUFDdEMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQ3hELEVBQUE7O3dCQUxLLFFBQVEsR0FBRyxTQUtoQjs2QkFLRyxRQUFRLENBQUMsRUFBRSxFQUFYLHdCQUFXO3dCQUNYLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7NEJBQ3pCLGFBQWE7NEJBQ2Isc0JBQU8sRUFBTyxFQUFDO3lCQUNsQjs7Ozt3QkFFc0MscUJBQU0sUUFBUSxDQUFDLElBQUksRUFBRSxFQUFBOzt3QkFBbEQsWUFBWSxHQUFpQixTQUFxQjt3QkFFeEQsSUFBSSxZQUFZLENBQUMsS0FBSyxFQUFFOzRCQUNwQixZQUFZLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7NEJBQzFDLFNBQVMsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQzt5QkFDdkM7NkJBQU07NEJBQ0gsc0JBQU8sWUFBWSxDQUFDLElBQUksRUFBQzt5QkFDNUI7Ozs7Ozs2QkFLTCxDQUFDLFlBQVksRUFBYix3QkFBYTs7Ozt3QkFFSSxxQkFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQUE7O3dCQUE1QixJQUFJLEdBQUcsU0FBcUI7d0JBQ2xDLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTs0QkFDWixZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7NEJBQ2xDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQzt5QkFDL0I7Ozs7Ozs2QkFJTCxDQUFDLFlBQVksRUFBYix5QkFBYTs7Ozt3QkFFSSxxQkFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQUE7O3dCQUE1QixJQUFJLEdBQUcsU0FBcUI7d0JBQ2xDLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7NEJBQ1gsS0FBSyxHQUFHLDBCQUEwQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDcEQsSUFBSSxDQUFBLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxNQUFNLE1BQUssQ0FBQyxFQUFFO2dDQUNyQixTQUFTLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUNyQixZQUFZLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzZCQUMzQjtpQ0FBTTtnQ0FDSCxZQUFZLEdBQUcsSUFBSSxDQUFDOzZCQUN2Qjt5QkFDSjs7Ozs7NkJBSVQsTUFBTSxJQUFJLHlCQUFXLENBQ2pCLFlBQVksYUFBWixZQUFZLGNBQVosWUFBWSxHQUFJLFFBQVEsQ0FBQyxVQUFVLEVBQ25DLEtBQUssRUFDTCxRQUFRLENBQUMsTUFBTSxFQUNmLFNBQVMsYUFBVCxTQUFTLGNBQVQsU0FBUyxHQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQzFDLENBQUM7Ozs7S0FDTDtJQUVEOzs7Ozs7O09BT0c7SUFDVyxzQ0FBVyxHQUF6QixVQUNJLE1BQXNCLEVBQ3RCLEtBQWEsRUFDYixXQUF3Qjs7Ozs7OzRCQUNQLHFCQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FDeEMsTUFBTSxFQUNOLEtBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFPLEVBQzNCLEVBQUUsY0FBYyxFQUFFLDBCQUEwQixFQUFFLEVBQzlDLFdBQVcsQ0FDZCxFQUFBOzt3QkFMSyxRQUFRLEdBQUcsU0FLaEI7NkJBR0csUUFBUSxDQUFDLEVBQUUsRUFBWCx3QkFBVzs2QkFDUCxDQUFBLE1BQU0sS0FBSyxLQUFLLENBQUEsRUFBaEIsd0JBQWdCOzZCQUNMLFVBQVU7d0JBQUMscUJBQU0sUUFBUSxDQUFDLFdBQVcsRUFBRSxFQUFBOzRCQUFsRCxzQkFBTyxjQUFJLFVBQVUsV0FBQyxTQUE0QixLQUFDLEVBQUM7NEJBRXpDLHFCQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBQTs7d0JBQXBDLFlBQVksR0FBRyxTQUFxQixDQUFDO3dCQUVyQyxJQUFJLENBQUMsQ0FBQSxZQUFZLGFBQVosWUFBWSx1QkFBWixZQUFZLENBQUUsS0FBSyxDQUFBLEVBQUU7NEJBQ3RCLHNCQUFPLFlBQVksYUFBWixZQUFZLHVCQUFaLFlBQVksQ0FBRSxJQUFTLEVBQUM7eUJBQ2xDOzs7NkJBR0QsQ0FBQyxZQUFZLEVBQWIsd0JBQWE7d0JBQ0UscUJBQU0sUUFBUSxDQUFDLElBQUksRUFBRSxFQUFBOzt3QkFBcEMsWUFBWSxHQUFHLFNBQXFCLENBQUM7OzRCQUd6QyxNQUFNLElBQUkseUJBQVcsQ0FDakIsTUFBQSxNQUFBLFlBQVksYUFBWixZQUFZLHVCQUFaLFlBQVksQ0FBRSxLQUFLLDBDQUFFLE9BQU8sbUNBQUksUUFBUSxDQUFDLFVBQVUsRUFDbkQsS0FBSyxFQUNMLFFBQVEsQ0FBQyxNQUFNLEVBQ2YsTUFBQSxZQUFZLGFBQVosWUFBWSx1QkFBWixZQUFZLENBQUUsS0FBSywwQ0FBRSxJQUFJLENBQzVCLENBQUM7Ozs7S0FDTDtJQUVEOzs7Ozs7OztPQVFHO0lBQ1csMkNBQWdCLEdBQTlCLFVBQ0ksTUFBaUMsRUFDakMsS0FBYSxFQUNiLE9BQWtDLEVBQ2xDLElBQTBCOzs7Ozs7d0JBSTFCLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxTQUFTLEVBQUU7NEJBQzdCLFVBQVUsR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDOzRCQUNuQyxPQUFPLEdBQUcsVUFBVSxDQUNoQjtnQ0FDSSxJQUFJLFVBQVUsRUFBRTtvQ0FDWixVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7aUNBQ3RCOzRCQUNMLENBQUMsRUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7eUJBQ3RCO3dCQUVLLFlBQVksR0FBNkIsRUFBRSxDQUFDO3dCQUVsRCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7NEJBQ2YsS0FBVyxNQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtnQ0FDaEMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7NkJBQ2hEO3lCQUNKO3dCQUVELElBQUksT0FBTyxFQUFFOzRCQUNULEtBQVcsTUFBTSxJQUFJLE9BQU8sRUFBRTtnQ0FDMUIsWUFBWSxDQUFDLE1BQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQzs2QkFDMUM7eUJBQ0o7d0JBRUQsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7NEJBQzVCLFFBQVEsR0FBRyxxQkFBUyxDQUFDLGFBQWEsQ0FBQyxxQkFBUyxDQUFDLFdBQVcsQ0FBSSxJQUFJLENBQUMsU0FBUyxTQUFJLElBQUksQ0FBQyxTQUFXLENBQUMsQ0FBQyxDQUFDOzRCQUN2RyxZQUFZLENBQUMsYUFBYSxHQUFHLFdBQVMsUUFBVSxDQUFDO3lCQUNwRDs7Ozt3QkFHb0IscUJBQU0sS0FBSyxDQUN4QixLQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBTyxFQUMzQjtnQ0FDSSxNQUFNLFFBQUE7Z0NBQ04sT0FBTyxFQUFFLFlBQVk7Z0NBQ3JCLElBQUksTUFBQTtnQ0FDSixNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTOzZCQUNyRCxDQUNKLEVBQUE7O3dCQVJLLFFBQVEsR0FBRyxTQVFoQjt3QkFFRCxzQkFBTyxRQUFRLEVBQUM7Ozt3QkFFaEIsTUFBTSxLQUFHLENBQUMsSUFBSSxLQUFLLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUcsQ0FBQzs7d0JBRTdELElBQUksT0FBTyxFQUFFOzRCQUNULFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQzt5QkFDekI7Ozs7OztLQUVSO0lBRUQ7Ozs7T0FJRztJQUNLLDZDQUFrQixHQUExQixVQUEyQixXQUFxQjtRQUM1QyxPQUFPLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNyRSxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNXLHFDQUFVLEdBQXhCOzs7Ozs0QkFJcUIscUJBQU0sSUFBSSxDQUFDLElBQUksRUFBRSxFQUFBOzt3QkFBNUIsUUFBUSxHQUFHLFNBQWlCO3dCQUU1QixjQUFjLEdBQUcsaUJBQU8sQ0FBQyxNQUFNLENBQUMscUJBQVMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7d0JBRWpGLHNCQUFPO2dDQUNILFNBQVMsRUFBRSwyQkFBWSxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO2dDQUNoRCxXQUFXLEVBQUUsUUFBUSxDQUFDLFdBQVc7NkJBQ3BDLEVBQUM7Ozs7S0FDTDtJQTFuQkQ7OztPQUdHO0lBQ3FCLDJCQUFVLEdBQWUsSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQXVuQjlGLHVCQUFDO0NBQUEsQUE1bkJELElBNG5CQztBQTVuQlksNENBQWdCIn0=