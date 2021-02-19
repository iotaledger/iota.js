import { MqttClient } from "@iota/iota.js";

const MQTT_ENDPOINT = "mqtt://127.0.0.1:1883";

async function run() {
    const mqttClient = new MqttClient(MQTT_ENDPOINT);

    // mqttClient.statusChanged(data => console.log("Status", data));

    // mqttClient.milestonesLatest((topic, data) => console.log(topic, data))

    // mqttClient.milestonesSolid((topic, data) => console.log(topic, data))

    // mqttClient.messageMetadata("ec7c73e61295aba1c6ae82b06fb34964e22a8b719c008d42f8c9807fd4c8df2d", (topic, data) => console.log(topic, data))

    // mqttClient.output("0".repeat(68), (topic, data) => console.log(topic, data))

    // mqttClient.addressOutputs("6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92", (topic, data) => console.log(topic, data))

    // mqttClient.messagesRaw((topic, data) => console.log(topic, data))

    // mqttClient.messages((topic, data, raw) => console.log(topic, data))

    mqttClient.index("aa", (topic, data, raw) => console.log(topic, data))

    mqttClient.indexRaw("aa", (topic, data) => console.log(topic, data))

    // mqttClient.messagesMetadata((topic, data) => console.log(topic, data))
}

run()
    .then(() => console.log("Done"))
    .catch((err) => console.error(err));