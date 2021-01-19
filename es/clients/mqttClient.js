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
     * @param endpoint The endpoint to connect to.
     * @param keepAliveTimeoutSeconds Timeout to reconnect if no messages received.
     */
    function MqttClient(endpoint, keepAliveTimeoutSeconds) {
        if (keepAliveTimeoutSeconds === void 0) { keepAliveTimeoutSeconds = 30; }
        this._endpoint = endpoint;
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
     * Subscribe to the latest solid milestone updates.
     * @param callback The callback which is called when new data arrives.
     * @returns A subscription Id which can be used to unsubscribe.
     */
    MqttClient.prototype.milestonesSolid = function (callback) {
        return this.internalSubscribe("milestones/solid", true, callback);
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
        return this.internalSubscribe("messages/indexation/" + index, false, function (topic, raw) {
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
        return this.internalSubscribe("messages/indexation/" + index, false, function (topic, raw) {
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
                    message: "Subscribe to topic " + topic + " failed on " + this._endpoint,
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
                    message: "Unsubscribe from topic " + topic + " failed on " + this._endpoint,
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
                this._client = mqtt.connect(this._endpoint, {
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
                                message: "Connection complete " + _this._endpoint,
                                state: _this.calculateState()
                            });
                        }
                    }
                    catch (err) {
                        _this.triggerStatusCallbacks({
                            type: "error",
                            message: "Subscribe to topics failed on " + _this._endpoint,
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
                        message: "Error on " + _this._endpoint,
                        state: _this.calculateState(),
                        error: err
                    });
                });
            }
            catch (err) {
                this.triggerStatusCallbacks({
                    type: "connect",
                    message: "Connection failed to " + this._endpoint,
                    state: this.calculateState(),
                    error: err
                });
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
                message: "Disconnect complete " + this._endpoint,
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
    return MqttClient;
}());
exports.MqttClient = MqttClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXF0dENsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGllbnRzL21xdHRDbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtCQUErQjtBQUMvQixzQ0FBc0M7QUFDdEMseUNBQTZCO0FBQzdCLDZDQUF1RDtBQU92RCxnREFBK0M7QUFDL0Msc0RBQXFEO0FBQ3JELGtEQUFpRDtBQUVqRDs7R0FFRztBQUNIO0lBbUVJOzs7O09BSUc7SUFDSCxvQkFBWSxRQUFnQixFQUFFLHVCQUFvQztRQUFwQyx3Q0FBQSxFQUFBLDRCQUFvQztRQUM5RCxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUMxQixJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsd0JBQXdCLEdBQUcsdUJBQXVCLENBQUM7SUFDNUQsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxxQ0FBZ0IsR0FBdkIsVUFDSSxRQUErRDtRQUMvRCxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxvQ0FBZSxHQUF0QixVQUNJLFFBQStEO1FBQy9ELE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLGtCQUFrQixFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxvQ0FBZSxHQUF0QixVQUF1QixTQUFpQixFQUNwQyxRQUF5RDtRQUN6RCxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFZLFNBQVMsY0FBVyxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztJ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