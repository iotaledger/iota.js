// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, deserializeMessage, RandomHelper, ReadStream } from "@iota/iota.js";
import * as mqtt from "mqtt";
/**
 * MQTT Client implementation for pub/sub communication.
 */
export class MqttClient {
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
            callback(topic, deserializeMessage(new ReadStream(raw)), raw);
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
            ? Converter.utf8ToHex(index)
            : Converter.bytesToHex(index)}`, false, (topic, raw) => {
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
            ? Converter.utf8ToHex(index)
            : Converter.bytesToHex(index)}`, false, (topic, raw) => {
            callback(topic, deserializeMessage(new ReadStream(raw)), raw);
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
            callback(topic, deserializeMessage(new ReadStream(raw)), raw);
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
        const subscriptionId = Converter.bytesToHex(RandomHelper.generate(32));
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
        const subscriptionId = Converter.bytesToHex(RandomHelper.generate(32));
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
            catch { }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXF0dENsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGllbnRzL21xdHRDbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsK0JBQStCO0FBQy9CLHNDQUFzQztBQUN0QyxPQUFPLEVBQUUsU0FBUyxFQUFFLGtCQUFrQixFQUErQyxZQUFZLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JJLE9BQU8sS0FBSyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBSzdCOztHQUVHO0FBQ0gsTUFBTSxPQUFPLFVBQVU7SUF5RW5COzs7O09BSUc7SUFDSCxZQUFZLFNBQTRCLEVBQUUsMEJBQWtDLEVBQUU7UUFDMUUsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLG9CQUFvQixHQUFHLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLHdCQUF3QixHQUFHLHVCQUF1QixDQUFDO0lBQzVELENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksZ0JBQWdCLENBQ25CLFFBQStEO1FBQy9ELE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLG1CQUFtQixFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLG1CQUFtQixDQUN0QixRQUErRDtRQUMvRCxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUVEOzs7OztPQUtH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