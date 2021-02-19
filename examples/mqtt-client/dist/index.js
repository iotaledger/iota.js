"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const iota_js_1 = require("@iota/iota.js");
const MQTT_ENDPOINT = "mqtt://127.0.0.1:1883";
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const mqttClient = new iota_js_1.MqttClient(MQTT_ENDPOINT);
        // mqttClient.statusChanged(data => console.log("Status", data));
        // mqttClient.milestonesLatest((topic, data) => console.log(topic, data))
        // mqttClient.milestonesSolid((topic, data) => console.log(topic, data))
        // mqttClient.messageMetadata("ec7c73e61295aba1c6ae82b06fb34964e22a8b719c008d42f8c9807fd4c8df2d", (topic, data) => console.log(topic, data))
        // mqttClient.output("0".repeat(68), (topic, data) => console.log(topic, data))
        // mqttClient.addressOutputs("6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92", (topic, data) => console.log(topic, data))
        // mqttClient.messagesRaw((topic, data) => console.log(topic, data))
        // mqttClient.messages((topic, data, raw) => console.log(topic, data))
        mqttClient.index("aa", (topic, data, raw) => console.log(topic, data));
        mqttClient.indexRaw("aa", (topic, data) => console.log(topic, data));
        // mqttClient.messagesMetadata((topic, data) => console.log(topic, data))
    });
}
run()
    .then(() => console.log("Done"))
    .catch((err) => console.error(err));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBMkM7QUFFM0MsTUFBTSxhQUFhLEdBQUcsdUJBQXVCLENBQUM7QUFFOUMsU0FBZSxHQUFHOztRQUNkLE1BQU0sVUFBVSxHQUFHLElBQUksb0JBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUVqRCxpRUFBaUU7UUFFakUseUVBQXlFO1FBRXpFLHdFQUF3RTtRQUV4RSw0SUFBNEk7UUFFNUksK0VBQStFO1FBRS9FLDJJQUEySTtRQUUzSSxvRUFBb0U7UUFFcEUsc0VBQXNFO1FBRXRFLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUE7UUFFdEUsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFBO1FBRXBFLHlFQUF5RTtJQUM3RSxDQUFDO0NBQUE7QUFFRCxHQUFHLEVBQUU7S0FDQSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUMvQixLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyJ9