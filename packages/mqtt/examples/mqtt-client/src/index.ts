import { MqttClient } from "@iota/mqtt.js";

const MQTT_ENDPOINT = "ws://localhost:14265/api/plugins/mqtt/v1";

async function run() {
    const mqttClient = new MqttClient(MQTT_ENDPOINT);

    mqttClient.statusChanged(data => console.log("Status", data));

    mqttClient.milestonesLatest((topic, data) => console.log(topic, data));

    mqttClient.milestonesConfirmed((topic, data) => console.log(topic, data));

    mqttClient.blocksMetadata("ec7c73e61295aba1c6ae82b06fb34964e22a8b719c008d42f8c9807fd4c8df2d", (topic, data) =>
        console.log(topic, data)
    );

    mqttClient.output("0".repeat(68), (topic, data) => console.log(topic, data));

    mqttClient.blocksRaw((topic, data) => console.log(topic, data));

    mqttClient.blocks((topic, data) => console.log(topic, data));

    mqttClient.blocksTagged("aa", (topic, data) => console.log(topic, data));

    mqttClient.blocksTaggedRaw("aa", (topic, data) => console.log(topic, data));

    mqttClient.blocksReferenced((topic, data) => console.log(topic, data));
}

run()
    .then(() => console.log("Done"))
    .catch(err => console.error(err));
