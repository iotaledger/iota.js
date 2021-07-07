# MQTT

This package provides mqtt support.

## Install

```shell
npm install @iota/mqtt.js
```

## MQTT Operations

You can create a MQTT client which once connected can stream the following feeds.

* milestonesLatest
* milestonesConfirmed
* messageMetadata - Metadata updates for a specified messageId
* output - Output updates for a specified outputId
* addressOutputs - Address output updates for a specified address
* address25519Outputs - Address output updates for a specified ed25519 address
* messagesRaw - All messages in binary form
* messages - All messaged decoded to objects
* indexRaw - All messages for a specified indexation key in binary form
* index - All messages for a specified indexation key in object form
* messagesMetadata - All metadata updates


## Usage


```js
import { MqttClient } from "@iota/mqtt.js";

const mqttClient = new MqttClient(MQTT_ENDPOINT);

mqttClient.messages((topic, data, raw) => console.log(topic, data))
```

## Additional Examples

Please find other examples in the [./examples](./examples) folder.
* Mqtt - Using mqtt to read streaming messages.
* Browser Mqtt - Using mqtt to read streaming messages in the browser.