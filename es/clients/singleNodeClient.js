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
            var writeStream, messageBytes, nonce, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        writeStream = new writeStream_1.WriteStream();
                        message_1.serializeMessage(writeStream, message);
                        messageBytes = writeStream.finalBytes();
                        if (messageBytes.length > message_1.MAX_MESSAGE_LENGTH) {
                            throw new Error("The message length is " + messageBytes.length + ", which exceeds the maximum size of " + message_1.MAX_MESSAGE_LENGTH);
                        }
                        if (!(!message.nonce || message.nonce.length === 0)) return [3 /*break*/, 6];
                        if (!this._powProvider) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.populatePowInfo()];
                    case 1:
                        _a.sent();
                        if (!(this._networkId && this._minPowScore)) return [3 /*break*/, 3];
                        bigIntHelper_1.BigIntHelper.write8(this._networkId, messageBytes, 0);
                        message.networkId = this._networkId.toString();
                        return [4 /*yield*/, this._powProvider.pow(messageBytes, this._minPowScore)];
                    case 2:
                        nonce = _a.sent();
                        message.nonce = nonce.toString(10);
                        return [3 /*break*/, 4];
                    case 3: throw new Error(this._networkId ? "minPowScore is missing" : "networkId is missing");
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        message.nonce = "0";
                        _a.label = 6;
                    case 6: return [4 /*yield*/, this.fetchJson("post", "messages", message)];
                    case 7:
                        response = _a.sent();
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
            var nonce, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (message.length > message_1.MAX_MESSAGE_LENGTH) {
                            throw new Error("The message length is " + message.length + ", which exceeds the maximum size of " + message_1.MAX_MESSAGE_LENGTH);
                        }
                        if (!(this._powProvider && arrayHelper_1.ArrayHelper.equal(message.slice(-8), SingleNodeClient.NONCE_ZERO))) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.populatePowInfo()];
                    case 1:
                        _a.sent();
                        if (!(this._networkId && this._minPowScore)) return [3 /*break*/, 3];
                        bigIntHelper_1.BigIntHelper.write8(this._networkId, message, 0);
                        return [4 /*yield*/, this._powProvider.pow(message, this._minPowScore)];
                    case 2:
                        nonce = _a.sent();
                        bigIntHelper_1.BigIntHelper.write8(nonce, message, message.length - 8);
                        return [3 /*break*/, 4];
                    case 3: throw new Error(this._networkId ? "minPowScore is missing" : "networkId is missing");
                    case 4: return [4 /*yield*/, this.fetchBinary("post", "messages", message)];
                    case 5:
                        response = _a.sent();
                        return [2 /*return*/, response.messageId];
                }
            });
        });
    };
    /**
     * Find messages by index.
     * @param indexationKey The index value.
     * @returns The messageId.
     */
    SingleNodeClient.prototype.messagesFind = function (indexationKey) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetchJson("get", "messages?index=" + encodeURIComponent(indexationKey))];
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
            var response, errorMessage, errorCode, responseData, _a, text, match, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.fetchWithTimeout(method, "" + this._basePath + route, { "Content-Type": "application/json" }, requestData ? JSON.stringify(requestData) : undefined)];
                    case 1:
                        response = _c.sent();
                        if (!response.ok) return [3 /*break*/, 5];
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, response.json()];
                    case 3:
                        responseData = _c.sent();
                        if (responseData.error) {
                            errorMessage = responseData.error.message;
                            errorCode = responseData.error.code;
                        }
                        else {
                            return [2 /*return*/, responseData.data];
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        _a = _c.sent();
                        return [3 /*break*/, 5];
                    case 5:
                        if (!!errorMessage) return [3 /*break*/, 9];
                        _c.label = 6;
                    case 6:
                        _c.trys.push([6, 8, , 9]);
                        return [4 /*yield*/, response.text()];
                    case 7:
                        text = _c.sent();
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
                        return [3 /*break*/, 9];
                    case 8:
                        _b = _c.sent();
                        return [3 /*break*/, 9];
                    case 9: throw new clientError_1.ClientError(errorMessage !== null && errorMessage !== void 0 ? errorMessage : response.statusText, route, response.status, errorCode !== null && errorCode !== void 0 ? errorCode : response.status.toString());
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
            var controller, timerId, finalHeaders, header, userPass, header, response, err_1;
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
                        finalHeaders = new Headers();
                        if (headers) {
                            for (header in headers) {
                                finalHeaders.set(header, headers[header]);
                            }
                        }
                        if (this._userName && this._password) {
                            userPass = converter_1.Converter.bytesToBase64(converter_1.Converter.utf8ToBytes(this._userName + ":" + this._password));
                            finalHeaders.set("Authorization", "Basic " + userPass);
                        }
                        if (this._headers) {
                            for (header in this._headers) {
                                finalHeaders.set(header, this._headers[header]);
                            }
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
     * @internal
     */
    SingleNodeClient.prototype.populatePowInfo = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var nodeInfo, networkIdBytes;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(!this._networkId || !this._minPowScore)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.info()];
                    case 1:
                        nodeInfo = _b.sent();
                        networkIdBytes = blake2b_1.Blake2b.sum256(converter_1.Converter.utf8ToBytes(nodeInfo.networkId));
                        this._networkId = bigIntHelper_1.BigIntHelper.read8(networkIdBytes, 0);
                        this._minPowScore = (_a = nodeInfo.minPowScore) !== null && _a !== void 0 ? _a : 100;
                        _b.label = 2;
                    case 2: return [2 /*return*/];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2luZ2xlTm9kZUNsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGllbnRzL3NpbmdsZU5vZGVDbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0JBQStCO0FBQy9CLHNDQUFzQztBQUN0Qyw2Q0FBeUU7QUFDekUsNkNBQTRDO0FBaUI1QyxvREFBbUQ7QUFDbkQsc0RBQXFEO0FBQ3JELGdEQUErQztBQUMvQyxvREFBbUQ7QUFDbkQsNkNBQTRDO0FBRzVDOztHQUVHO0FBQ0g7SUE2REk7Ozs7T0FJRztJQUNILDBCQUFZLFFBQWdCLEVBQUUsT0FBaUM7O1FBQzNELElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDWCxNQUFNLElBQUksS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUM7U0FDcEQ7UUFDRCxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxTQUFTLFNBQUcsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLFFBQVEsbUNBQUksVUFBVSxDQUFDO1FBQ2pELElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLFdBQVcsQ0FBQztRQUN6QyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxPQUFPLENBQUM7UUFDakMsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsUUFBUSxDQUFDO1FBQ25DLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLFFBQVEsQ0FBQztRQUNuQyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxPQUFP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