"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MqttClient = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
var mqtt = __importStar(require("mqtt"));
var message_1 = require("../binary/message");
var converter_1 = require("../utils/converter");
var randomHelper_1 = require("../utils/randomHelper");
var readStream_1 = require("../utils/readStream");
/**
 * MQTT Client implementation for pub/sub communication.
 */
var MqttClient = /** @class */ (function () {
    /**
     * Create a new instace of MqttClient.
     * @param endpoints The endpoint or endpoints list to connect to.
     * @param keepAliveTimeoutSeconds Timeout to reconnect if no messages received.
     */
    function MqttClient(endpoints, keepAliveTimeoutSeconds) {
        if (keepAliveTimeoutSeconds === void 0) { keepAliveTimeoutSeconds = 30; }
        this._endpoints = Array.isArray(endpoints) ? endpoints : [endpoints];
        this._endpointsIndex = 0;
        this._subscriptions = {};
        this._statusSubscriptions = {};
        this._lastMessageTime = -1;
        this._keepAliveTimeoutSeconds = keepAliveTimeoutSeconds;
    }
    /**
     * Subscribe to the latest milestone updates.
     * @param callback The callback which is called when new data arrives.
     * @returns A subscription Id which can be used to unsubscribe.
     */
    MqttClient.prototype.milestonesLatest = function (callback) {
        return this.internalSubscribe("milestones/latest", true, callback);
    };
    /**
     * Subscribe to the latest confirmed milestone updates.
     * @param callback The callback which is called when new data arrives.
     * @returns A subscription Id which can be used to unsubscribe.
     */
    MqttClient.prototype.milestonesConfirmed = function (callback) {
        return this.internalSubscribe("milestones/confirmed", true, callback);
    };
    /**
     * Subscribe to metadata updates for a specific message.
     * @param messageId The message to monitor.
     * @param callback The callback which is called when new data arrives.
     * @returns A subscription Id which can be used to unsubscribe.
     */
    MqttClient.prototype.messageMetadata = function (messageId, callback) {
        return this.internalSubscribe("messages/" + messageId + "/metadata", true, callback);
    };
    /**
     * Subscribe to updates for a specific output.
     * @param outputId The output to monitor.
     * @param callback The callback which is called when new data arrives.
     * @returns A subscription Id which can be used to unsubscribe.
     */
    MqttClient.prototype.output = function (outputId, callback) {
        return this.internalSubscribe("outputs/" + outputId, true, callback);
    };
    /**
     * Subscribe to the address for output updates.
     * @param addressBech32 The address to monitor.
     * @param callback The callback which is called when new data arrives.
     * @returns A subscription Id which can be used to unsubscribe.
     */
    MqttClient.prototype.addressOutputs = function (addressBech32, callback) {
        return this.internalSubscribe("addresses/" + addressBech32 + "/outputs", true, callback);
    };
    /**
     * Subscribe to the ed25519 address for output updates.
     * @param addressEd25519 The address to monitor.
     * @param callback The callback which is called when new data arrives.
     * @returns A subscription Id which can be used to unsubscribe.
     */
    MqttClient.prototype.addressEd25519Outputs = function (addressEd25519, callback) {
        return this.internalSubscribe("addresses/ed25519/" + addressEd25519 + "/outputs", true, callback);
    };
    /**
     * Subscribe to get all messages in binary form.
     * @param callback The callback which is called when new data arrives.
     * @returns A subscription Id which can be used to unsubscribe.
     */
    MqttClient.prototype.messagesRaw = function (callback) {
        return this.internalSubscribe("messages", false, function (topic, raw) {
            callback(topic, raw);
        });
    };
    /**
     * Subscribe to get all messages in object form.
     * @param callback The callback which is called when new data arrives.
     * @returns A subscription Id which can be used to unsubscribe.
     */
    MqttClient.prototype.messages = function (callback) {
        return this.internalSubscribe("messages", false, function (topic, raw) {
            callback(topic, message_1.deserializeMessage(new readStream_1.ReadStream(raw)), raw);
        });
    };
    /**
     * Subscribe to get all messages for the specified index in binary form.
     * @param index The index to monitor.
     * @param callback The callback which is called when new data arrives.
     * @returns A subscription Id which can be used to unsubscribe.
     */
    MqttClient.prototype.indexRaw = function (index, callback) {
        return this.internalSubscribe("messages/indexation/" + (typeof index === "string"
            ? converter_1.Converter.utf8ToHex(index)
            : converter_1.Converter.bytesToHex(index)), false, function (topic, raw) {
            callback(topic, raw);
        });
    };
    /**
     * Subscribe to get all messages for the specified index in object form.
     * @param index The index to monitor.
     * @param callback The callback which is called when new data arrives.
     * @returns A subscription Id which can be used to unsubscribe.
     */
    MqttClient.prototype.index = function (index, callback) {
        return this.internalSubscribe("messages/indexation/" + (typeof index === "string"
            ? converter_1.Converter.utf8ToHex(index)
            : converter_1.Converter.bytesToHex(index)), false, function (topic, raw) {
            callback(topic, message_1.deserializeMessage(new readStream_1.ReadStream(raw)), raw);
        });
    };
    /**
     * Subscribe to get the metadata for all the messages.
     * @param callback The callback which is called when new data arrives.
     * @returns A subscription Id which can be used to unsubscribe.
     */
    MqttClient.prototype.messagesMetadata = function (callback) {
        return this.internalSubscribe("messages/referenced", true, callback);
    };
    /**
     * Subscribe to message updates for a specific transactionId.
     * @param transactionId The message to monitor.
     * @param callback The callback which is called when new data arrives.
     * @returns A subscription Id which can be used to unsubscribe.
     */
    MqttClient.prototype.transactionIncludedMessageRaw = function (transactionId, callback) {
        return this.internalSubscribe("transactions/" + transactionId + "/included-message", false, callback);
    };
    /**
     * Subscribe to message updates for a specific transactionId.
     * @param transactionId The message to monitor.
     * @param callback The callback which is called when new data arrives.
     * @returns A subscription Id which can be used to unsubscribe.
     */
    MqttClient.prototype.transactionIncludedMessage = function (transactionId, callback) {
        return this.internalSubscribe("transactions/" + transactionId + "/included-message", false, function (topic, raw) {
            callback(topic, message_1.deserializeMessage(new readStream_1.ReadStream(raw)), raw);
        });
    };
    /**
     * Subscribe to another type of message as raw data.
     * @param customTopic The topic to subscribe to.
     * @param callback The callback which is called when new data arrives.
     * @returns A subscription Id which can be used to unsubscribe.
     */
    MqttClient.prototype.subscribeRaw = function (customTopic, callback) {
        return this.internalSubscribe(customTopic, false, callback);
    };
    /**
     * Subscribe to another type of message as json.
     * @param customTopic The topic to subscribe to.
     * @param callback The callback which is called when new data arrives.
     * @returns A subscription Id which can be used to unsubscribe.
     */
    MqttClient.prototype.subscribeJson = function (customTopic, callback) {
        return this.internalSubscribe(customTopic, true, callback);
    };
    /**
     * Remove a subscription.
     * @param subscriptionId The subscription to remove.
     */
    MqttClient.prototype.unsubscribe = function (subscriptionId) {
        this.triggerStatusCallbacks({
            type: "subscription-remove",
            message: subscriptionId,
            state: this.calculateState()
        });
        if (this._statusSubscriptions[subscriptionId]) {
            delete this._statusSubscriptions[subscriptionId];
        }
        else {
            var topics = Object.keys(this._subscriptions);
            for (var i = 0; i < topics.length; i++) {
                var topic = topics[i];
                for (var j = 0; j < this._subscriptions[topic].subscriptionCallbacks.length; j++) {
                    if (this._subscriptions[topic].subscriptionCallbacks[j].subscriptionId === subscriptionId) {
                        this._subscriptions[topic].subscriptionCallbacks.splice(j, 1);
                        if (this._subscriptions[topic].subscriptionCallbacks.length === 0) {
                            delete this._subscriptions[topic];
                            // This is the last subscriber to this topic
                            // so unsubscribe from the actual client.
                            this.mqttUnsubscribe(topic);
                        }
                        return;
                    }
                }
            }
        }
    };
    /**
     * Subscribe to changes in the client state.
     * @param callback Callback called when the state has changed.
     * @returns A subscription Id which can be used to unsubscribe.
     */
    MqttClient.prototype.statusChanged = function (callback) {
        var subscriptionId = converter_1.Converter.bytesToHex(randomHelper_1.RandomHelper.generate(32));
        this._statusSubscriptions[subscriptionId] = callback;
        return subscriptionId;
    };
    /**
     * Subscribe to another type of message.
     * @param customTopic The topic to subscribe to.
     * @param isJson Should we deserialize the data as JSON.
     * @param callback The callback which is called when new data arrives.
     * @returns A subscription Id which can be used to unsubscribe.
     * @internal
     */
    MqttClient.prototype.internalSubscribe = function (customTopic, isJson, callback) {
        var isNewTopic = false;
        if (!this._subscriptions[customTopic]) {
            this._subscriptions[customTopic] = {
                isJson: isJson,
                subscriptionCallbacks: []
            };
            isNewTopic = true;
        }
        var subscriptionId = converter_1.Converter.bytesToHex(randomHelper_1.RandomHelper.generate(32));
        this._subscriptions[customTopic].subscriptionCallbacks.push({
            subscriptionId: subscriptionId,
            callback: callback
        });
        this.triggerStatusCallbacks({
            type: "subscription-add",
            message: subscriptionId,
            state: this.calculateState()
        });
        if (isNewTopic) {
            this.mqttSubscribe(customTopic);
        }
        return subscriptionId;
    };
    /**
     * Subscribe to a new topic on the client.
     * @param topic The topic to subscribe to.
     * @internal
     */
    MqttClient.prototype.mqttSubscribe = function (topic) {
        if (!this._client) {
            // There is no client so we need to connect,
            // the new topic is already in the subscriptions so
            // it will automatically get subscribed to.
            this.mqttConnect();
        }
        else {
            // There is already a client so just subscribe to the new topic.
            try {
                this._client.subscribe(topic);
            }
            catch (err) {
                this.triggerStatusCallbacks({
                    type: "error",
                    message: "Subscribe to topic " + topic + " failed on " + this._endpoints[this._endpointsIndex],
                    state: this.calculateState(),
                    error: err
                });
            }
        }
    };
    /**
     * Unsubscribe from a topic on the client.
     * @param topic The topic to unsubscribe from.
     * @internal
     */
    MqttClient.prototype.mqttUnsubscribe = function (topic) {
        if (this._client) {
            try {
                this._client.unsubscribe(topic);
            }
            catch (err) {
                this.triggerStatusCallbacks({
                    type: "error",
                    message: "Unsubscribe from topic " + topic + " failed on " + this._endpoints[this._endpointsIndex],
                    state: this.calculateState(),
                    error: err
                });
            }
        }
    };
    /**
     * Connect the client.
     * @internal
     */
    MqttClient.prototype.mqttConnect = function () {
        var _this = this;
        if (!this._client) {
            try {
                this._client = mqtt.connect(this._endpoints[this._endpointsIndex], {
                    keepalive: 0,
                    reconnectPeriod: this._keepAliveTimeoutSeconds * 1000
                });
                this._client.on("connect", function () {
                    // On a successful connection we want to subscribe to
                    // all the subscription topics.
                    try {
                        if (_this._client) {
                            _this._client.subscribe(Object.keys(_this._subscriptions));
                            _this.startKeepAlive();
                            _this.triggerStatusCallbacks({
                                type: "connect",
                                message: "Connection complete " + _this._endpoints[_this._endpointsIndex],
                                state: _this.calculateState()
                            });
                        }
                    }
                    catch (err) {
                        _this.triggerStatusCallbacks({
                            type: "error",
                            message: "Subscribe to topics failed on " + _this._endpoints[_this._endpointsIndex],
                            state: _this.calculateState(),
                            error: err
                        });
                    }
                });
                this._client.on("message", function (topic, message) {
                    _this._lastMessageTime = Date.now();
                    _this.triggerCallbacks(topic, message);
                });
                this._client.on("error", function (err) {
                    _this.triggerStatusCallbacks({
                        type: "error",
                        message: "Error on " + _this._endpoints[_this._endpointsIndex],
                        state: _this.calculateState(),
                        error: err
                    });
                    _this.nextClient();
                });
            }
            catch (err) {
                this.triggerStatusCallbacks({
                    type: "connect",
                    message: "Connection failed to " + this._endpoints[this._endpointsIndex],
                    state: this.calculateState(),
                    error: err
                });
                this.nextClient();
            }
        }
    };
    /**
     * Disconnect the client.
     * @internal
     */
    MqttClient.prototype.mqttDisconnect = function () {
        this.stopKeepAlive();
        if (this._client) {
            var localClient = this._client;
            this._client = undefined;
            try {
                localClient.unsubscribe(Object.keys(this._subscriptions));
                localClient.end();
            }
            catch (_a) { }
            this.triggerStatusCallbacks({
                type: "disconnect",
                message: "Disconnect complete " + this._endpoints[this._endpointsIndex],
                state: this.calculateState()
            });
        }
    };
    /**
     * Trigger the callbacks for the specified topic.
     * @param topic The topic to call the callbacks for.
     * @param data The data to send to the callbacks.
     * @internal
     */
    MqttClient.prototype.triggerCallbacks = function (topic, data) {
        if (this._subscriptions[topic]) {
            var decodedData = data;
            if (this._subscriptions[topic].isJson) {
                try {
                    decodedData = JSON.parse(data.toString());
                }
                catch (err) {
                    this.triggerStatusCallbacks({
                        type: "error",
                        message: "Error decoding JSON for topic " + topic,
                        state: this.calculateState(),
                        error: err
                    });
                }
            }
            for (var i = 0; i < this._subscriptions[topic].subscriptionCallbacks.length; i++) {
                try {
                    this._subscriptions[topic].subscriptionCallbacks[i].callback(topic, decodedData);
                }
                catch (err) {
                    this.triggerStatusCallbacks({
                        type: "error",
                        message: "Triggering callback failed for topic " + topic + " on subscription " + this._subscriptions[topic].subscriptionCallbacks[i].subscriptionId,
                        state: this.calculateState(),
                        error: err
                    });
                }
            }
        }
    };
    /**
     * Trigger the callbacks for the status.
     * @param status The status to send to the callbacks.
     * @internal
     */
    MqttClient.prototype.triggerStatusCallbacks = function (status) {
        var subscriptionIds = Object.keys(this._statusSubscriptions);
        for (var i = 0; i < subscriptionIds.length; i++) {
            this._statusSubscriptions[subscriptionIds[i]](status);
        }
    };
    /**
     * Start the keep alive timer.
     * @internal
     */
    MqttClient.prototype.startKeepAlive = function () {
        var _this = this;
        this.stopKeepAlive();
        this._lastMessageTime = Date.now();
        this._timerId = setInterval(function () { return _this.keepAlive(); }, ((this._keepAliveTimeoutSeconds / 2) * 1000));
    };
    /**
     * Stop the keep alive timer.
     * @internal
     */
    MqttClient.prototype.stopKeepAlive = function () {
        if (this._timerId !== undefined) {
            clearInterval(this._timerId);
            this._timerId = undefined;
        }
    };
    /**
     * Keep the connection alive.
     * @internal
     */
    MqttClient.prototype.keepAlive = function () {
        if (Date.now() - this._lastMessageTime > (this._keepAliveTimeoutSeconds * 1000)) {
            this.mqttDisconnect();
            this.nextClient();
            this.mqttConnect();
        }
    };
    /**
     * Calculate the state of the client.
     * @returns The client state.
     * @internal
     */
    MqttClient.prototype.calculateState = function () {
        var state = "disconnected";
        if (this._client) {
            if (this._client.connected) {
                state = "connected";
            }
            else if (this._client.disconnecting) {
                state = "disconnecting";
            }
            else if (this._client.reconnecting) {
                state = "connecting";
            }
        }
        return state;
    };
    /**
     * If there has been a problem switch to the next client endpoint.
     */
    MqttClient.prototype.nextClient = function () {
        this._endpointsIndex++;
        if (this._endpointsIndex >= this._endpoints.length) {
            this._endpointsIndex = 0;
        }
    };
    return MqttClient;
}());
exports.MqttClient = MqttClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXF0dENsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGllbnRzL21xdHRDbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtCQUErQjtBQUMvQixzQ0FBc0M7QUFDdEMseUNBQTZCO0FBQzdCLDZDQUF1RDtBQU92RCxnREFBK0M7QUFDL0Msc0RBQXFEO0FBQ3JELGtEQUFpRDtBQUVqRDs7R0FFRztBQUNIO0lBeUVJOzs7O09BSUc7SUFDSCxvQkFBWSxTQUE0QixFQUFFLHVCQUFvQztRQUFwQyx3Q0FBQSxFQUFBLDRCQUFvQztRQUMxRSxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsd0JBQXdCLEdBQUcsdUJBQXVCLENBQUM7SUFDNUQsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxxQ0FBZ0IsR0FBdkIsVUFDSSxRQUErRDtRQUMvRCxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSx3Q0FBbUIsR0FBMUIsVUFDSSxRQUErRDtRQUMvRCxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksb0NB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