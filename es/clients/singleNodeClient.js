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
var bech32Helper_1 = require("../utils/bech32Helper");
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
        var _a;
        if (!endpoint) {
            throw new Error("The endpoint can not be empty");
        }
        this._endpoint = endpoint.replace(/\/+$/, "");
        this._basePath = (_a = options === null || options === void 0 ? void 0 : options.basePath) !== null && _a !== void 0 ? _a : "/api/v1/";
        this._powProvider = options === null || options === void 0 ? void 0 : options.powProvider;
        this._minPowScore = options === null || options === void 0 ? void 0 : options.overrideMinPow;
        this._timeout = options === null || options === void 0 ? void 0 : options.timeout;
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
                if (!bech32Helper_1.Bech32Helper.matches(addressBech32)) {
                    throw new Error("The supplied address does not appear to be bech32 format");
                }
                return [2 /*return*/, this.fetchJson("get", "addresses/" + addressBech32)];
            });
        });
    };
    /**
     * Get the address outputs.
     * @param addressBech32 The address to get the outputs for.
     * @returns The address outputs.
     */
    SingleNodeClient.prototype.addressOutputs = function (addressBech32) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!bech32Helper_1.Bech32Helper.matches(addressBech32)) {
                    throw new Error("The supplied address does not appear to be bech32 format");
                }
                return [2 /*return*/, this.fetchJson("get", "addresses/" + addressBech32 + "/outputs")];
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
     * @returns The address outputs.
     */
    SingleNodeClient.prototype.addressEd25519Outputs = function (addressEd25519) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!converter_1.Converter.isHex(addressEd25519)) {
                    throw new Error("The supplied address does not appear to be hex format");
                }
                return [2 /*return*/, this.fetchJson("get", "addresses/ed25519/" + addressEd25519 + "/outputs")];
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
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var response, responseData;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.fetchWithTimeout(method, "" + this._basePath + route, { "Content-Type": "application/json" }, requestData ? JSON.stringify(requestData) : undefined)];
                    case 1:
                        response = _d.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        responseData = _d.sent();
                        if (response.ok && !responseData.error) {
                            return [2 /*return*/, responseData.data];
                        }
                        throw new clientError_1.ClientError((_b = (_a = responseData.error) === null || _a === void 0 ? void 0 : _a.message) !== null && _b !== void 0 ? _b : response.statusText, route, response.status, (_c = responseData.error) === null || _c === void 0 ? void 0 : _c.code);
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
            var controller, timerId, response, err_1;
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
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, fetch("" + this._endpoint + route, {
                                method: method,
                                headers: headers,
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
     * Get the pow info from the node.
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
                        networkIdBytes = blake2b_1.Blake2b.sum256(converter_1.Converter.asciiToBytes(nodeInfo.networkId));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2luZ2xlTm9kZUNsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGllbnRzL3NpbmdsZU5vZGVDbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0JBQStCO0FBQy9CLHNDQUFzQztBQUN0Qyw2Q0FBeUU7QUFDekUsNkNBQTRDO0FBZ0I1QyxvREFBbUQ7QUFDbkQsc0RBQXFEO0FBQ3JELHNEQUFxRDtBQUNyRCxnREFBK0M7QUFDL0Msb0RBQW1EO0FBQ25ELDZDQUE0QztBQUc1Qzs7R0FFRztBQUNIO0lBMkNJOzs7O09BSUc7SUFDSCwwQkFBWSxRQUFnQixFQUFFLE9BQWlDOztRQUMzRCxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ1gsTUFBTSxJQUFJLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1NBQ3BEO1FBQ0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsU0FBUyxTQUFHLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxRQUFRLG1DQUFJLFVBQVUsQ0FBQztRQUNqRCxJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxXQUFXLENBQUM7UUFDekMsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsY0FBYyxDQUFDO1FBQzVDLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLE9BQU8sQ0FBQztJQUNyQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ1UsaUNBQU0sR0FBbkI7Ozs7OzRCQUNtQixxQkFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxFQUFBOzt3QkFBMUMsTUFBTSxHQUFHLFNBQWlD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