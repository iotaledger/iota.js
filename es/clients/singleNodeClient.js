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
     */
    function SingleNodeClient(endpoint, basePath, powProvider) {
        if (!endpoint) {
            throw new Error("The endpoint can not be empty");
        }
        this._endpoint = endpoint.replace(/\/+$/, "");
        this._basePath = basePath !== null && basePath !== void 0 ? basePath : "/api/v1/";
        this._powProvider = powProvider;
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
            var targetScore, writeStream, messageBytes, nonce, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(!message.nonce || message.nonce.length === 0)) return [3 /*break*/, 3];
                        if (!this._powProvider) return [3 /*break*/, 2];
                        targetScore = 100;
                        writeStream = new writeStream_1.WriteStream();
                        message_1.serializeMessage(writeStream, message);
                        messageBytes = writeStream.finalBytes();
                        return [4 /*yield*/, this._powProvider.pow(messageBytes, targetScore)];
                    case 1:
                        nonce = _a.sent();
                        message.nonce = nonce.toString(10);
                        return [3 /*break*/, 3];
                    case 2:
                        message.nonce = "0";
                        _a.label = 3;
                    case 3: return [4 /*yield*/, this.fetchJson("post", "messages", message)];
                    case 4:
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
            var targetScore, nonce, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(arrayHelper_1.ArrayHelper.equal(message.slice(-8), SingleNodeClient.NONCE_ZERO) && this._powProvider)) return [3 /*break*/, 2];
                        targetScore = 100;
                        return [4 /*yield*/, this._powProvider.pow(message, targetScore)];
                    case 1:
                        nonce = _a.sent();
                        bigIntHelper_1.BigIntHelper.write8(nonce, message, message.length - 8);
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.fetchBinary("post", "messages", message)];
                    case 3:
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2luZ2xlTm9kZUNsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGllbnRzL3NpbmdsZU5vZGVDbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0JBQStCO0FBQy9CLHNDQUFzQztBQUN0Qyw2Q0FBcUQ7QUFnQnJELG9EQUFtRDtBQUNuRCxzREFBcUQ7QUFDckQsc0RBQXFEO0FBQ3JELGdEQUErQztBQUMvQyxvREFBbUQ7QUFDbkQsNkNBQTRDO0FBRTVDOztHQUVHO0FBQ0g7SUF5Qkk7Ozs7O09BS0c7SUFDSCwwQkFBWSxRQUFnQixFQUFFLFFBQWlCLEVBQUUsV0FBMEI7UUFDdkUsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNYLE1BQU0sSUFBSSxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQztTQUNwRDtRQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxVQUFVLENBQUM7UUFDeEMsSUFBSSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUM7SUFDcEMsQ0FBQztJQUVEOzs7T0FHRztJQUNVLGlDQUFNLEdBQW5COzs7Ozs0QkFDbUIscUJBQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsRUFBQTs7d0JBQTFDLE1BQU0sR0FBRyxTQUFpQzt3QkFFaEQsSUFBSSxNQUFNLEtBQUssR0FBRyxFQUFFOzRCQUNoQixzQkFBTyxJQUFJLEVBQUM7eUJBQ2Y7NkJBQU0sSUFBSSxNQUFNLEtBQUssR0FBRyxFQUFFOzRCQUN2QixzQkFBTyxLQUFLLEVBQUM7eUJBQ2hCO3dCQUVELE1BQU0sSUFBSSx5QkFBVyxDQUFDLDBCQUEwQixFQUFFLFNBQVMsRUFBRSxNQUFNLENB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