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
const mqtt = __importStar(require("mqtt"));
const message_1 = require("../binary/message");
const converter_1 = require("../utils/converter");
const randomHelper_1 = require("../utils/randomHelper");
const readStream_1 = require("../utils/readStream");
/**
 * MQTT Client implementation for pub/sub communication.
 */
class MqttClient {
    /**
     * Create a new instace of MqttClient.
     * @param endpoints The endpoint or endpoints list to connect to.
     * @param keepAliveTimeoutSeconds Timeout to reconnect if no messages received.
     */
    constructor(endpoints, keepAliveTimeoutSeconds = 30) {
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
    milestonesLatest(callback) {
        return this.internalSubscribe("milestones/latest", true, callback);
    }
    /**
     * Subscribe to the latest confirmed milestone updates.
     * @param callback The callback which is called when new data arrives.
     * @returns A subscription Id which can be used to unsubscribe.
     */
    milestonesConfirmed(callback) {
        return this.internalSubscribe("milestones/confirmed", true, callback);
    }
    /**
     * Subscribe to metadata updates for a specific message.
     * @param messageId The message to monitor.
     * @param callback The callback which is called when new data arrives.
     * @returns A subscription Id which can be used to unsubscribe.
     */
    messageMetadata(messageId, callback) {
        return this.internalSubscribe(`messages/${messageId}/metadata`, true, callback);
    }
    /**
     * Subscribe to updates for a specific output.
     * @param outputId The output to monitor.
     * @param callback The callback which is called when new data arrives.
     * @returns A subscription Id which can be used to unsubscribe.
     */
    output(outputId, callback) {
        return this.internalSubscribe(`outputs/${outputId}`, true, callback);
    }
    /**
     * Subscribe to the address for output updates.
     * @param addressBech32 The address to monitor.
     * @param callback The callback which is called when new data arrives.
     * @returns A subscription Id which can be used to unsubscribe.
     */
    addressOutputs(addressBech32, callback) {
        return this.internalSubscribe(`addresses/${addressBech32}/outputs`, true, callback);
    }
    /**
     * Subscribe to the ed25519 address for output updates.
     * @param addressEd25519 The address to monitor.
     * @param callback The callback which is called when new data arrives.
     * @returns A subscription Id which can be used to unsubscribe.
     */
    addressEd25519Outputs(addressEd25519, callback) {
        return this.internalSubscribe(`addresses/ed25519/${addressEd25519}/outputs`, true, callback);
    }
    /**
     * Subscribe to get all messages in binary form.
     * @param callback The callback which is called when new data arrives.
     * @returns A subscription Id which can be used to unsubscribe.
     */
    messagesRaw(callback) {
        return this.internalSubscribe("messages", false, (topic, raw) => {
            callback(topic, raw);
        });
    }
    /**
     * Subscribe to get all messages in object form.
     * @param callback The callback which is called when new data arrives.
     * @returns A subscription Id which can be used to unsubscribe.
     */
    messages(callback) {
        return this.internalSubscribe("messages", false, (topic, raw) => {
            callback(topic, message_1.deserializeMessage(new readStream_1.ReadStream(raw)), raw);
        });
    }
    /**
     * Subscribe to get all messages for the specified index in binary form.
     * @param index The index to monitor.
     * @param callback The callback which is called when new data arrives.
     * @returns A subscription Id which can be used to unsubscribe.
     */
    indexRaw(index, callback) {
        return this.internalSubscribe(`messages/indexation/${typeof index === "string"
            ? converter_1.Converter.utf8ToHex(index)
            : converter_1.Converter.bytesToHex(index)}`, false, (topic, raw) => {
            callback(topic, raw);
        });
    }
    /**
     * Subscribe to get all messages for the specified index in object form.
     * @param index The index to monitor.
     * @param callback The callback which is called when new data arrives.
     * @returns A subscription Id which can be used to unsubscribe.
     */
    index(index, callback) {
        return this.internalSubscribe(`messages/indexation/${typeof index === "string"
            ? converter_1.Converter.utf8ToHex(index)
            : converter_1.Converter.bytesToHex(index)}`, false, (topic, raw) => {
            callback(topic, message_1.deserializeMessage(new readStream_1.ReadStream(raw)), raw);
        });
    }
    /**
     * Subscribe to get the metadata for all the messages.
     * @param callback The callback which is called when new data arrives.
     * @returns A subscription Id which can be used to unsubscribe.
     */
    messagesMetadata(callback) {
        return this.internalSubscribe("messages/referenced", true, callback);
    }
    /**
     * Subscribe to message updates for a specific transactionId.
     * @param transactionId The message to monitor.
     * @param callback The callback which is called when new data arrives.
     * @returns A subscription Id which can be used to unsubscribe.
     */
    transactionIncludedMessageRaw(transactionId, callback) {
        return this.internalSubscribe(`transactions/${transactionId}/included-message`, false, callback);
    }
    /**
     * Subscribe to message updates for a specific transactionId.
     * @param transactionId The message to monitor.
     * @param callback The callback which is called when new data arrives.
     * @returns A subscription Id which can be used to unsubscribe.
     */
    transactionIncludedMessage(transactionId, callback) {
        return this.internalSubscribe(`transactions/${transactionId}/included-message`, false, (topic, raw) => {
            callback(topic, message_1.deserializeMessage(new readStream_1.ReadStream(raw)), raw);
        });
    }
    /**
     * Subscribe to another type of message as raw data.
     * @param customTopic The topic to subscribe to.
     * @param callback The callback which is called when new data arrives.
     * @returns A subscription Id which can be used to unsubscribe.
     */
    subscribeRaw(customTopic, callback) {
        return this.internalSubscribe(customTopic, false, callback);
    }
    /**
     * Subscribe to another type of message as json.
     * @param customTopic The topic to subscribe to.
     * @param callback The callback which is called when new data arrives.
     * @returns A subscription Id which can be used to unsubscribe.
     */
    subscribeJson(customTopic, callback) {
        return this.internalSubscribe(customTopic, true, callback);
    }
    /**
     * Remove a subscription.
     * @param subscriptionId The subscription to remove.
     */
    unsubscribe(subscriptionId) {
        this.triggerStatusCallbacks({
            type: "subscription-remove",
            message: subscriptionId,
            state: this.calculateState()
        });
        if (this._statusSubscriptions[subscriptionId]) {
            delete this._statusSubscriptions[subscriptionId];
        }
        else {
            const topics = Object.keys(this._subscriptions);
            for (let i = 0; i < topics.length; i++) {
                const topic = topics[i];
                for (let j = 0; j < this._subscriptions[topic].subscriptionCallbacks.length; j++) {
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
    }
    /**
     * Subscribe to changes in the client state.
     * @param callback Callback called when the state has changed.
     * @returns A subscription Id which can be used to unsubscribe.
     */
    statusChanged(callback) {
        const subscriptionId = converter_1.Converter.bytesToHex(randomHelper_1.RandomHelper.generate(32));
        this._statusSubscriptions[subscriptionId] = callback;
        return subscriptionId;
    }
    /**
     * Subscribe to another type of message.
     * @param customTopic The topic to subscribe to.
     * @param isJson Should we deserialize the data as JSON.
     * @param callback The callback which is called when new data arrives.
     * @returns A subscription Id which can be used to unsubscribe.
     * @internal
     */
    internalSubscribe(customTopic, isJson, callback) {
        let isNewTopic = false;
        if (!this._subscriptions[customTopic]) {
            this._subscriptions[customTopic] = {
                isJson,
                subscriptionCallbacks: []
            };
            isNewTopic = true;
        }
        const subscriptionId = converter_1.Converter.bytesToHex(randomHelper_1.RandomHelper.generate(32));
        this._subscriptions[customTopic].subscriptionCallbacks.push({
            subscriptionId,
            callback
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
    }
    /**
     * Subscribe to a new topic on the client.
     * @param topic The topic to subscribe to.
     * @internal
     */
    mqttSubscribe(topic) {
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
                    message: `Subscribe to topic ${topic} failed on ${this._endpoints[this._endpointsIndex]}`,
                    state: this.calculateState(),
                    error: err
                });
            }
        }
    }
    /**
     * Unsubscribe from a topic on the client.
     * @param topic The topic to unsubscribe from.
     * @internal
     */
    mqttUnsubscribe(topic) {
        if (this._client) {
            try {
                this._client.unsubscribe(topic);
            }
            catch (err) {
                this.triggerStatusCallbacks({
                    type: "error",
                    message: `Unsubscribe from topic ${topic} failed on ${this._endpoints[this._endpointsIndex]}`,
                    state: this.calculateState(),
                    error: err
                });
            }
        }
    }
    /**
     * Connect the client.
     * @internal
     */
    mqttConnect() {
        if (!this._client) {
            try {
                this._client = mqtt.connect(this._endpoints[this._endpointsIndex], {
                    keepalive: 0,
                    reconnectPeriod: this._keepAliveTimeoutSeconds * 1000
                });
                this._client.on("connect", () => {
                    // On a successful connection we want to subscribe to
                    // all the subscription topics.
                    try {
                        if (this._client) {
                            this._client.subscribe(Object.keys(this._subscriptions));
                            this.startKeepAlive();
                            this.triggerStatusCallbacks({
                                type: "connect",
                                message: `Connection complete ${this._endpoints[this._endpointsIndex]}`,
                                state: this.calculateState()
                            });
                        }
                    }
                    catch (err) {
                        this.triggerStatusCallbacks({
                            type: "error",
                            message: `Subscribe to topics failed on ${this._endpoints[this._endpointsIndex]}`,
                            state: this.calculateState(),
                            error: err
                        });
                    }
                });
                this._client.on("message", (topic, message) => {
                    this._lastMessageTime = Date.now();
                    this.triggerCallbacks(topic, message);
                });
                this._client.on("error", err => {
                    this.triggerStatusCallbacks({
                        type: "error",
                        message: `Error on ${this._endpoints[this._endpointsIndex]}`,
                        state: this.calculateState(),
                        error: err
                    });
                    this.nextClient();
                });
            }
            catch (err) {
                this.triggerStatusCallbacks({
                    type: "connect",
                    message: `Connection failed to ${this._endpoints[this._endpointsIndex]}`,
                    state: this.calculateState(),
                    error: err
                });
                this.nextClient();
            }
        }
    }
    /**
     * Disconnect the client.
     * @internal
     */
    mqttDisconnect() {
        this.stopKeepAlive();
        if (this._client) {
            const localClient = this._client;
            this._client = undefined;
            try {
                localClient.unsubscribe(Object.keys(this._subscriptions));
                localClient.end();
            }
            catch (_a) { }
            this.triggerStatusCallbacks({
                type: "disconnect",
                message: `Disconnect complete ${this._endpoints[this._endpointsIndex]}`,
                state: this.calculateState()
            });
        }
    }
    /**
     * Trigger the callbacks for the specified topic.
     * @param topic The topic to call the callbacks for.
     * @param data The data to send to the callbacks.
     * @internal
     */
    triggerCallbacks(topic, data) {
        if (this._subscriptions[topic]) {
            let decodedData = data;
            if (this._subscriptions[topic].isJson) {
                try {
                    decodedData = JSON.parse(data.toString());
                }
                catch (err) {
                    this.triggerStatusCallbacks({
                        type: "error",
                        message: `Error decoding JSON for topic ${topic}`,
                        state: this.calculateState(),
                        error: err
                    });
                }
            }
            for (let i = 0; i < this._subscriptions[topic].subscriptionCallbacks.length; i++) {
                try {
                    this._subscriptions[topic].subscriptionCallbacks[i].callback(topic, decodedData);
                }
                catch (err) {
                    this.triggerStatusCallbacks({
                        type: "error",
                        message: `Triggering callback failed for topic ${topic} on subscription ${this._subscriptions[topic].subscriptionCallbacks[i].subscriptionId}`,
                        state: this.calculateState(),
                        error: err
                    });
                }
            }
        }
    }
    /**
     * Trigger the callbacks for the status.
     * @param status The status to send to the callbacks.
     * @internal
     */
    triggerStatusCallbacks(status) {
        const subscriptionIds = Object.keys(this._statusSubscriptions);
        for (let i = 0; i < subscriptionIds.length; i++) {
            this._statusSubscriptions[subscriptionIds[i]](status);
        }
    }
    /**
     * Start the keep alive timer.
     * @internal
     */
    startKeepAlive() {
        this.stopKeepAlive();
        this._lastMessageTime = Date.now();
        this._timerId = setInterval(() => this.keepAlive(), ((this._keepAliveTimeoutSeconds / 2) * 1000));
    }
    /**
     * Stop the keep alive timer.
     * @internal
     */
    stopKeepAlive() {
        if (this._timerId !== undefined) {
            clearInterval(this._timerId);
            this._timerId = undefined;
        }
    }
    /**
     * Keep the connection alive.
     * @internal
     */
    keepAlive() {
        if (Date.now() - this._lastMessageTime > (this._keepAliveTimeoutSeconds * 1000)) {
            this.mqttDisconnect();
            this.nextClient();
            this.mqttConnect();
        }
    }
    /**
     * Calculate the state of the client.
     * @returns The client state.
     * @internal
     */
    calculateState() {
        let state = "disconnected";
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
    }
    /**
     * If there has been a problem switch to the next client endpoint.
     */
    nextClient() {
        this._endpointsIndex++;
        if (this._endpointsIndex >= this._endpoints.length) {
            this._endpointsIndex = 0;
        }
    }
}
exports.MqttClient = MqttClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXF0dENsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGllbnRzL21xdHRDbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtCQUErQjtBQUMvQixzQ0FBc0M7QUFDdEMsMkNBQTZCO0FBQzdCLCtDQUF1RDtBQU92RCxrREFBK0M7QUFDL0Msd0RBQXFEO0FBQ3JELG9EQUFpRDtBQUVqRDs7R0FFRztBQUNILE1BQWEsVUFBVTtJQXlFbkI7Ozs7T0FJRztJQUNILFlBQVksU0FBNEIsRUFBRSwwQkFBa0MsRUFBRTtRQUMxRSxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsd0JBQXdCLEdBQUcsdUJBQXVCLENBQUM7SUFDNUQsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxnQkFBZ0IsQ0FDbkIsUUFBK0Q7UUFDL0QsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksbUJBQW1CLENBQ3RCLFFBQStEO1FBQy9ELE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLHNCQUFzQixFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxlQUFlLENBQUMsU0FBaUIsRUFDcEMs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