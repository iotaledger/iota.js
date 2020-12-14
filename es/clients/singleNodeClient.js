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
     * @param basePath for the API defaults to /api/v1/
     * @param powProvider Optional local POW provider.
     * @param targetScore The target score for PoW.
     */
    function SingleNodeClient(endpoint, basePath, powProvider, targetScore) {
        if (!endpoint) {
            throw new Error("The endpoint can not be empty");
        }
        this._endpoint = endpoint.replace(/\/+$/, "");
        this._basePath = basePath !== null && basePath !== void 0 ? basePath : "/api/v1/";
        this._powProvider = powProvider;
        this._targetScore = targetScore !== null && targetScore !== void 0 ? targetScore : 100;
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
            var nodeInfo, networkIdBytes, networkId64, writeStream, messageBytes, nonce, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(!message.nonce || message.nonce.length === 0)) return [3 /*break*/, 4];
                        if (!this._powProvider) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.info()];
                    case 1:
                        nodeInfo = _a.sent();
                        networkIdBytes = blake2b_1.Blake2b.sum256(converter_1.Converter.asciiToBytes(nodeInfo.networkId));
                        networkId64 = bigIntHelper_1.BigIntHelper.read8(networkIdBytes, 0);
                        message.networkId = networkId64.toString();
                        writeStream = new writeStream_1.WriteStream();
                        message_1.serializeMessage(writeStream, message);
                        messageBytes = writeStream.finalBytes();
                        return [4 /*yield*/, this._powProvider.pow(messageBytes, this._targetScore)];
                    case 2:
                        nonce = _a.sent();
                        message.nonce = nonce.toString(10);
                        return [3 /*break*/, 4];
                    case 3:
                        message.nonce = "0";
                        _a.label = 4;
                    case 4: return [4 /*yield*/, this.fetchJson("post", "messages", message)];
                    case 5:
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
            var nodeInfo, networkIdBytes, networkId64, nonce, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(arrayHelper_1.ArrayHelper.equal(message.slice(-8), SingleNodeClient.NONCE_ZERO) && this._powProvider)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.info()];
                    case 1:
                        nodeInfo = _a.sent();
                        networkIdBytes = blake2b_1.Blake2b.sum256(converter_1.Converter.asciiToBytes(nodeInfo.networkId));
                        networkId64 = bigIntHelper_1.BigIntHelper.read8(networkIdBytes, 0);
                        bigIntHelper_1.BigIntHelper.write8(networkId64, message, 0);
                        return [4 /*yield*/, this._powProvider.pow(message, this._targetScore)];
                    case 2:
                        nonce = _a.sent();
                        bigIntHelper_1.BigIntHelper.write8(nonce, message, message.length - 8);
                        _a.label = 3;
                    case 3: return [4 /*yield*/, this.fetchBinary("post", "messages", message)];
                    case 4:
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
                    case 0: return [4 /*yield*/, fetch("" + this._endpoint + route, {
                            method: "get"
                        })];
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
                    case 0: return [4 /*yield*/, fetch("" + this._endpoint + this._basePath + route, {
                            method: method,
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: requestData ? JSON.stringify(requestData) : undefined
                        })];
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
                    case 0: return [4 /*yield*/, fetch("" + this._endpoint + this._basePath + route, {
                            method: method,
                            headers: {
                                "Content-Type": "application/octet-stream"
                            },
                            body: requestData
                        })];
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
     * A zero nonce.
     * @internal
     */
    SingleNodeClient.NONCE_ZERO = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);
    return SingleNodeClient;
}());
exports.SingleNodeClient = SingleNodeClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2luZ2xlTm9kZUNsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGllbnRzL3NpbmdsZU5vZGVDbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0JBQStCO0FBQy9CLHNDQUFzQztBQUN0Qyw2Q0FBcUQ7QUFDckQsNkNBQTRDO0FBZ0I1QyxvREFBbUQ7QUFDbkQsc0RBQXFEO0FBQ3JELHNEQUFxRDtBQUNyRCxnREFBK0M7QUFDL0Msb0RBQW1EO0FBQ25ELDZDQUE0QztBQUU1Qzs7R0FFRztBQUNIO0lBK0JJOzs7Ozs7T0FNRztJQUNILDBCQUFZLFFBQWdCLEVBQUUsUUFBaUIsRUFBRSxXQUEwQixFQUFFLFdBQW9CO1FBQzdGLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDWCxNQUFNLElBQUksS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUM7U0FDcEQ7UUFDRCxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksVUFBVSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxhQUFYLFdBQVcsY0FBWCxXQUFXLEdBQUksR0FBRyxDQUFDO0lBQzNDLENBQUM7SUFFRDs7O09BR0c7SUFDVSxpQ0FBTSxHQUFuQjs7Ozs7NEJBQ21CLHFCQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEVBQUE7O3dCQUExQyxNQUFNLEdBQUcsU0FBaUM7d0JBRWhELElBQUksTUFBTSxLQUFLLEdBQUcsRUFBRTs0QkFDaEIsc0JBQU8sSUFBSSxFQUFDO3lCQUNmOzZCQUFNLElBQUksTUFBTSxLQUFLLEdBQUcs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