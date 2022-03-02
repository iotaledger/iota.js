import { MqttClient } from "@iota/mqtt.js";

const MQTT_ENDPOINT = "mqtt://localhost:1883";

async function run() {
    const mqttClient = new MqttClient(MQTT_ENDPOINT);

    mqttClient.statusChanged(data => console.log("Status", data));

    mqttClient.milestonesLatest((topic, data) => console.log(topic, data));

    mqttClient.milestonesConfirmed((topic, data) => console.log(topic, data));

    mqttClient.messageMetadata("ec7c73e61295aba1c6ae82b06fb34964e22a8b719c008d42f8c9807fd4c8df2d", (topic, data) =>
        console.log(topic, data)
    );

    mqttClient.output("0".repeat(68), (topic, data) => console.log(topic, data));

    mqttClient.messagesRaw((topic, data) => console.log(topic, data));

    mqttClient.messages((topic, data, raw) => console.log(topic, data));

    mqttClient.tagged("aa", (topic, data, raw) => console.log(topic, data));

    mqttClient.taggedRaw("aa", (topic, data) => console.log(topic, data));

    mqttClient.messagesMetadata((topic, data) => console.log(topic, data));
}

run()
    .then(() => console.log("Done"))
    .catch(err => console.error(err));
