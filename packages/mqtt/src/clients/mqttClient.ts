// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { deserializeBlock, deserializeMilestonePayload, IBlock, IBlockMetadata, IMilestonePayload, IOutputResponse, IReceiptsResponse } from "@iota/iota.js";
import { Converter, RandomHelper, ReadStream } from "@iota/util.js";
import * as mqtt from "mqtt";
import type { IMqttMilestoneResponse } from "../models/api/IMqttMilestoneResponse";
import type { IMqttClient } from "../models/IMqttClient";
import type { IMqttStatus } from "../models/IMqttStatus";

/**
 * MQTT Client implementation for pub/sub communication.
 */
export class MqttClient implements IMqttClient {
    /**
     * What is the endpoint for the client.
     * @internal
     */
    private readonly _endpoints: string[];

    /**
     * What is the current endpoint we are using for the client.
     * @internal
     */
    private _endpointsIndex: number;

    /**
     * Timeout to reconnect if no messages received.
     * @internal
     */
    private readonly _keepAliveTimeoutSeconds: number;

    /**
     * The communication client.
     * @internal
     */
    private _client?: mqtt.MqttClient;

    /**
     * The last time a message was received.
     * @internal
     */
    private _lastMessageTime: number;

    /**
     * The keep alive timer.
     * @internal
     */
    private _timerId?: NodeJS.Timeout;

    /**
     * The callback for different events.
     * @internal
     */
    private readonly _subscriptions: {
        [topic: string]: {
            /**
             * Should we deserialize the data as JSON.
             */
            isJson: boolean;

            /**
             * The callback for the subscriptions.
             */
            subscriptionCallbacks: {
                /**
                 * The id of the subscription.
                 */
                subscriptionId: string;

                /**
                 * The callback for the subscription.
                 * @param event The event for the subscription.
                 * @param data The data for the event.
                 */
                callback(event: string, data: unknown): void;
            }[];
        };
    };

    /**
     * The callbacks for status.
     * @internal
     */
    private readonly _statusSubscriptions: { [subscriptionId: string]: (data: IMqttStatus) => void };

    /**
     * Create a new instace of MqttClient.
     * @param endpoints The endpoint or endpoints list to connect to.
     * @param keepAliveTimeoutSeconds Timeout to reconnect if no messages received.
     */
    constructor(endpoints: string | string[], keepAliveTimeoutSeconds: number = 30) {
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
    public milestonesLatest(callback: (topic: string, data: IMqttMilestoneResponse) => void): string {
        return this.internalSubscribe("milestone-info/latest", true, callback);
    }

    /**
     * Subscribe to the latest confirmed milestone updates.
     * @param callback The callback which is called when new data arrives.
     * @returns A subscription Id which can be used to unsubscribe.
     */
    public milestonesConfirmed(callback: (topic: string, data: IMqttMilestoneResponse) => void): string {
        return this.internalSubscribe("milestone-info/confirmed", true, callback);
    }

    /**
     * Subscribe to get all blocks in binary form.
     * @param callback The callback which is called when new data arrives.
     * @returns A subscription Id which can be used to unsubscribe.
     */
    public blocksRaw(callback: (topic: string, data: Uint8Array) => void): string {
        return this.internalSubscribe<Uint8Array>("blocks", false, callback);
    }

    /**
     * Subscribe to get all blocks in object form.
     * @param callback The callback which is called when new data arrives.
     * @returns A subscription Id which can be used to unsubscribe.
     */
    public blocks(callback: (topic: string, data: IBlock) => void): string {
        return this.internalSubscribe<Uint8Array>("blocks", false, (topic, raw) => {
            callback(topic, deserializeBlock(new ReadStream(raw)));
        });
    }

    /**
     * Subscribe to get the metadata for all the blocks.
     * @param callback The callback which is called when new data arrives.
     * @returns A subscription Id which can be used to unsubscribe.
     */
    public blocksReferenced(callback: (topic: string, data: IBlockMetadata) => void): string {
        return this.internalSubscribe<IBlockMetadata>("block-metadata/referenced", true, callback);
    }

    /**
     * Subscribe to all transaction blocks in their raw form.
     * @param callback The callback which is called when new data arrives.
     * @returns A subscription Id which can be used to unsubscribe.
     */
    public blocksTransactionRaw(callback: (topic: string, data: Uint8Array) => void): string {
        return this.internalSubscribe<Uint8Array>("blocks/transaction", false, callback);
    }

    /**
     * Subscribe to all transaction blocks.
     * @param callback The callback which is called when new data arrives.
     * @returns A subscription Id which can be used to unsubscribe.
     */
    public blocksTransaction(callback: (topic: string, data: IBlock) => void): string {
        return this.internalSubscribe<Uint8Array>("blocks/transaction", false, (topic, raw) => {
            callback(topic, deserializeBlock(new ReadStream(raw)));
        });
    }

    /**
     * Subscribe to transaction blocks with tagged data in their raw form.
     * @param tag The tag to monitor as bytes or in hex, undefined for all blocks.
     * @param callback The callback which is called when new data arrives.
     * @returns A subscription Id which can be used to unsubscribe.
     */
    public blocksTransactionTaggedDataRaw(
        tag: Uint8Array | string | undefined,
        callback: (topic: string, data: Uint8Array) => void): string {
        let subTag = "";

        if (typeof tag === "string") {
            subTag = `/${tag}`;
        } else if (tag instanceof Uint8Array) {
            subTag = `/${Converter.bytesToHex(tag)}`;
        }

        return this.internalSubscribe<Uint8Array>(`blocks/transaction/tagged-data${subTag}`, false, callback);
    }

    /**
     * Subscribe to all transaction blocks with tagged data.
     * @param tag The tag to monitor as bytes or in hex, undefined for all blocks.
     * @param callback The callback which is called when new data arrives.
     * @returns A subscription Id which can be used to unsubscribe.
     */
    public blocksTransactionTaggedData(
        tag: Uint8Array | string | undefined,
        callback: (topic: string, data: IBlock) => void): string {
        let subTag = "";

        if (typeof tag === "string") {
            subTag = `/${tag}`;
        } else if (tag instanceof Uint8Array) {
            subTag = `/${Converter.bytesToHex(tag)}`;
        }

        return this.internalSubscribe<Uint8Array>(`blocks/transaction/tagged-data${subTag}`, false, (topic, raw) => {
            callback(topic, deserializeBlock(new ReadStream(raw)));
        });
    }

    /**
     * Subscribe to all milestone payloads in their raw form.
     * @param callback The callback which is called when new data arrives.
     * @returns A subscription Id which can be used to unsubscribe.
     */
    public milestoneRaw(callback: (topic: string, data: Uint8Array) => void): string {
        return this.internalSubscribe<Uint8Array>("milestones", false, callback);
    }

    /**
     * Subscribe to all milestone payloads.
     * @param callback The callback which is called when new data arrives.
     * @returns A subscription Id which can be used to unsubscribe.
     */
    public milestone(callback: (topic: string, data: IMilestonePayload) => void): string {
        return this.internalSubscribe<Uint8Array>("milestones", false, (topic, raw) => {
            callback(topic, deserializeMilestonePayload(new ReadStream(raw)));
        });
    }

    /**
     * Subscribe to get all blocks for the specified tag in binary form.
     * @param tag The tag to monitor as bytes or in hex, undefined for all blocks.
     * @param callback The callback which is called when new data arrives.
     * @returns A subscription Id which can be used to unsubscribe.
     */
    public blocksTaggedRaw(
        tag: Uint8Array | string | undefined,
        callback: (topic: string, data: Uint8Array) => void): string {
        let subTag = "";

        if (typeof tag === "string") {
            subTag = `/${tag}`;
        } else if (tag instanceof Uint8Array) {
            subTag = `/${Converter.bytesToHex(tag)}`;
        }

        return this.internalSubscribe<Uint8Array>(`blocks/tagged-data${subTag}`, false, callback);
    }

    /**
     * Subscribe to get all blocks for the specified tag in object form.
     * @param tag The tag to monitor as bytes or in hex, undefined for all blocks.
     * @param callback The callback which is called when new data arrives.
     * @returns A subscription Id which can be used to unsubscribe.
     */
    public blocksTagged(
        tag: Uint8Array | string | undefined,
        callback: (topic: string, data: IBlock) => void): string {
        let subTag = "";

        if (typeof tag === "string") {
            subTag = `/${tag}`;
        } else if (tag instanceof Uint8Array) {
            subTag = `/${Converter.bytesToHex(tag)}`;
        }

        return this.internalSubscribe<Uint8Array>(`blocks/tagged-data${subTag}`, false, (topic, raw) => {
            callback(topic, deserializeBlock(new ReadStream(raw)));
        });
    }

    /**
     * Subscribe to metadata updates for a specific block.
     * @param blockId The block to monitor.
     * @param callback The callback which is called when new data arrives.
     * @returns A subscription Id which can be used to unsubscribe.
     */
    public blocksMetadata(blockId: string, callback: (topic: string, data: IBlockMetadata) => void): string {
        return this.internalSubscribe(`block-metadata/${blockId}`, true, callback);
    }

    /**
     * Subscribe to block updates for a specific transactionId.
     * @param transactionId The block to monitor.
     * @param callback The callback which is called when new data arrives.
     * @returns A subscription Id which can be used to unsubscribe.
     */
    public transactionIncludedBlockRaw(
        transactionId: string,
        callback: (topic: string, data: Uint8Array) => void
    ): string {
        return this.internalSubscribe(`transactions/${transactionId}/included-block`, false, callback);
    }

    /**
     * Subscribe to block updates for a specific transactionId.
     * @param transactionId The block to monitor.
     * @param callback The callback which is called when new data arrives.
     * @returns A subscription Id which can be used to unsubscribe.
     */
    public transactionIncludedBlock(
        transactionId: string,
        callback: (topic: string, data: IBlock) => void
    ): string {
        return this.internalSubscribe<Uint8Array>(`transactions/${transactionId}/included-block`, false,
            (topic, raw) => {
                callback(topic, deserializeBlock(new ReadStream(raw)));
            });
    }

    /**
     * Subscribe to updates for a specific output.
     * @param outputId The output to monitor.
     * @param callback The callback which is called when new data arrives.
     * @returns A subscription Id which can be used to unsubscribe.
     */
    public output(outputId: string, callback: (topic: string, data: IOutputResponse) => void): string {
        return this.internalSubscribe(`outputs/${outputId}`, true, callback);
    }

    /**
     * Subscribe to updates for an nft output.
     * @param nftId The Nft output to monitor.
     * @param callback The callback which is called when new data arrives.
     * @returns A subscription Id which can be used to unsubscribe.
     */
    public nft(nftId: string, callback: (topic: string, data: IOutputResponse) => void): string {
        return this.internalSubscribe(`outputs/nfts/${nftId}`, true, callback);
    }

    /**
     * Subscribe to updates for an alias output.
     * @param aliasId The alias output to monitor.
     * @param callback The callback which is called when new data arrives.
     * @returns A subscription Id which can be used to unsubscribe.
     */
    public alias(aliasId: string, callback: (topic: string, data: IOutputResponse) => void): string {
        return this.internalSubscribe(`outputs/aliases/${aliasId}`, true, callback);
    }

    /**
     * Subscribe to updates for a foundry output.
     * @param foundryId The foundry output to monitor.
     * @param callback The callback which is called when new data arrives.
     * @returns A subscription Id which can be used to unsubscribe.
     */
    public foundry(foundryId: string, callback: (topic: string, data: IOutputResponse) => void): string {
        return this.internalSubscribe(`outputs/foundries/${foundryId}`, true, callback);
    }

    /**
     * Subscribe to the output with specific unlock condition and address.
     * @param condition The condition to monitor.
     * @param addressBech32 The address to monitor.
     * @param callback The callback which is called when new data arrives.
     * @returns A subscription Id which can be used to unsubscribe.
     */
    public outputByConditionAndAddress(
        condition: string,
        addressBech32: string,
        callback: (topic: string, data: IOutputResponse) => void
    ): string {
        return this.internalSubscribe(`outputs/unlock/${condition}/${addressBech32}`, true, callback);
    }

    /**
     * Subscribe to the spent outputs with specific unlock condition and address.
     * @param condition The condition to monitor.
     * @param addressBech32 The address to monitor.
     * @param callback The callback which is called when new data arrives.
     * @returns A subscription Id which can be used to unsubscribe.
     */
    public outputSpentByConditionAndAddress(
        condition: string,
        addressBech32: string,
        callback: (topic: string, data: IOutputResponse) => void
    ): string {
        return this.internalSubscribe(`outputs/unlock/${condition}/${addressBech32}/spent`, true, callback);
    }

    /**
     * Subscribe to the receive all receipts.
     * @param callback The callback which is called when new data arrives.
     * @returns A subscription Id which can be used to unsubscribe.
     */
    public receipts(callback: (topic: string, data: IReceiptsResponse) => void): string {
        return this.internalSubscribe<IReceiptsResponse>("receipts", true, callback);
    }

    /**
     * Subscribe to another type of message as raw data.
     * @param customTopic The topic to subscribe to.
     * @param callback The callback which is called when new data arrives.
     * @returns A subscription Id which can be used to unsubscribe.
     */
    public subscribeRaw(customTopic: string, callback: (topic: string, data: Uint8Array) => void): string {
        return this.internalSubscribe(customTopic, false, callback);
    }

    /**
     * Subscribe to another type of message as json.
     * @param customTopic The topic to subscribe to.
     * @param callback The callback which is called when new data arrives.
     * @returns A subscription Id which can be used to unsubscribe.
     */
    public subscribeJson<T>(customTopic: string, callback: (topic: string, data: T) => void): string {
        return this.internalSubscribe<T>(customTopic, true, callback);
    }

    /**
     * Remove a subscription.
     * @param subscriptionId The subscription to remove.
     */
    public unsubscribe(subscriptionId: string): void {
        this.triggerStatusCallbacks({
            type: "subscription-remove",
            message: subscriptionId,
            state: this.calculateState()
        });

        if (this._statusSubscriptions[subscriptionId]) {
            delete this._statusSubscriptions[subscriptionId];
        } else {
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
    public statusChanged(callback: (data: IMqttStatus) => void): string {
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
    private internalSubscribe<T>(
        customTopic: string,
        isJson: boolean,
        callback: (topic: string, data: T) => void
    ): string {
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
    private mqttSubscribe(topic: string): void {
        if (!this._client) {
            // There is no client so we need to connect,
            // the new topic is already in the subscriptions so
            // it will automatically get subscribed to.
            this.mqttConnect();
        } else {
            // There is already a client so just subscribe to the new topic.
            try {
                this._client.subscribe(topic);
            } catch (err) {
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
    private mqttUnsubscribe(topic: string): void {
        if (this._client) {
            try {
                this._client.unsubscribe(topic);
            } catch (err) {
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
    private mqttConnect(): void {
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
                    } catch (err) {
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
            } catch (err) {
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
    private mqttDisconnect(): void {
        this.stopKeepAlive();
        if (this._client) {
            const localClient = this._client;
            this._client = undefined;

            try {
                localClient.unsubscribe(Object.keys(this._subscriptions));
                localClient.end();
            } catch { }

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
    private triggerCallbacks(topic: string, data: Buffer | unknown): void {
        if (this._subscriptions[topic]) {
            let decodedData = data;
            if (this._subscriptions[topic].isJson) {
                try {
                    decodedData = JSON.parse((data as Buffer).toString());
                } catch (err) {
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
                } catch (err) {
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
    private triggerStatusCallbacks(status: IMqttStatus): void {
        const subscriptionIds = Object.keys(this._statusSubscriptions);
        for (let i = 0; i < subscriptionIds.length; i++) {
            this._statusSubscriptions[subscriptionIds[i]](status);
        }
    }

    /**
     * Start the keep alive timer.
     * @internal
     */
    private startKeepAlive(): void {
        this.stopKeepAlive();
        this._lastMessageTime = Date.now();
        this._timerId = setInterval(() => this.keepAlive(), (this._keepAliveTimeoutSeconds / 2) * 1000);
    }

    /**
     * Stop the keep alive timer.
     * @internal
     */
    private stopKeepAlive(): void {
        if (this._timerId !== undefined) {
            clearInterval(this._timerId);
            this._timerId = undefined;
        }
    }

    /**
     * Keep the connection alive.
     * @internal
     */
    private keepAlive(): void {
        if (Date.now() - this._lastMessageTime > this._keepAliveTimeoutSeconds * 1000) {
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
    private calculateState(): "disconnected" | "connected" | "disconnecting" | "connecting" {
        let state: "disconnected" | "connected" | "disconnecting" | "connecting" = "disconnected";

        if (this._client) {
            if (this._client.connected) {
                state = "connected";
            } else if (this._client.disconnecting) {
                state = "disconnecting";
            } else if (this._client.reconnecting) {
                state = "connecting";
            }
        }

        return state;
    }

    /**
     * If there has been a problem switch to the next client endpoint.
     */
    private nextClient(): void {
        this._endpointsIndex++;
        if (this._endpointsIndex >= this._endpoints.length) {
            this._endpointsIndex = 0;
        }
    }
}

