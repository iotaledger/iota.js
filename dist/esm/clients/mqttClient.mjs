// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import * as mqtt from "mqtt";
import { deserializeMessage } from "../binary/message.mjs";
import { Converter } from "../utils/converter.mjs";
import { RandomHelper } from "../utils/randomHelper.mjs";
import { ReadStream } from "../utils/readStream.mjs";
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
    return this.internalSubscribe(`messages/indexation/${typeof index === "string" ? Converter.utf8ToHex(index) : Converter.bytesToHex(index)}`, false, (topic, raw) => {
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
    return this.internalSubscribe(`messages/indexation/${typeof index === "string" ? Converter.utf8ToHex(index) : Converter.bytesToHex(index)}`, false, (topic, raw) => {
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
    } else {
      const topics = Object.keys(this._subscriptions);

      for (let i = 0; i < topics.length; i++) {
        const topic = topics[i];

        for (let j = 0; j < this._subscriptions[topic].subscriptionCallbacks.length; j++) {
          if (this._subscriptions[topic].subscriptionCallbacks[j].subscriptionId === subscriptionId) {
            this._subscriptions[topic].subscriptionCallbacks.splice(j, 1);

            if (this._subscriptions[topic].subscriptionCallbacks.length === 0) {
              delete this._subscriptions[topic]; // This is the last subscriber to this topic
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


  mqttUnsubscribe(topic) {
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


  mqttDisconnect() {
    this.stopKeepAlive();

    if (this._client) {
      const localClient = this._client;
      this._client = undefined;

      try {
        localClient.unsubscribe(Object.keys(this._subscriptions));
        localClient.end();
      } catch {}

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
    this._timerId = setInterval(() => this.keepAlive(), this._keepAliveTimeoutSeconds / 2 * 1000);
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


  calculateState() {
    let state = "disconnected";

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


  nextClient() {
    this._endpointsIndex++;

    if (this._endpointsIndex >= this._endpoints.length) {
      this._endpointsIndex = 0;
    }
  }

}
//# sourceMappingURL=mqttClient.mjs.map
