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
const util_js_1 = require("@iota/util.js");
const API_ENDPOINT = "http://localhost:14265/";
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new iota_js_1.SingleNodeClient(API_ENDPOINT);
        const myTag = util_js_1.Converter.utf8ToBytes("MY-DATA-TAG");
        const messageIds = [];
        for (let i = 0; i < 10; i++) {
            console.log("Sending Data");
            const sendResult = yield (0, iota_js_1.sendData)(client, myTag, util_js_1.Converter.utf8ToBytes(`This is data ${i} 🚀`));
            console.log("Received Message Id", sendResult.messageId);
            // console.log(`https://explorer.iota.org/mainnet/message/${sendResult.messageId}`);
            messageIds.push(sendResult.messageId);
        }
        console.log();
        for (let i = 0; i < messageIds.length; i++) {
            console.log("Retrieveing Data");
            const firstResult = yield (0, iota_js_1.retrieveData)(client, messageIds[i]);
            if (firstResult) {
                console.log("Message");
                console.log("\tTag: ", util_js_1.Converter.bytesToUtf8(firstResult.tag));
                console.log("\tData: ", firstResult.data ? util_js_1.Converter.bytesToUtf8(firstResult.data) : "None");
            }
        }
    });
}
run()
    .then(() => console.log("Done"))
    .catch(err => console.error(err));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBeUU7QUFDekUsMkNBQTBDO0FBRTFDLGtEQUFrRDtBQUNsRCxNQUFNLFlBQVksR0FBRyx5QkFBeUIsQ0FBQztBQUUvQyxTQUFlLEdBQUc7O1FBQ2QsTUFBTSxNQUFNLEdBQUcsSUFBSSwwQkFBZ0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVsRCxNQUFNLEtBQUssR0FBRyxtQkFBUyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUVuRCxNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFFdEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQzVCLE1BQU0sVUFBVSxHQUFHLE1BQU0sSUFBQSxrQkFBUSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsbUJBQVMsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNoRyxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN6RCxvRkFBb0Y7WUFDcEYsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDekM7UUFFRCxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7UUFFZCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN4QyxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFFaEMsTUFBTSxXQUFXLEdBQUcsTUFBTSxJQUFBLHNCQUFZLEVBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlELElBQUksV0FBVyxFQUFFO2dCQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLG1CQUFTLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUMvRCxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxtQkFBUyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ2hHO1NBQ0o7SUFDTCxDQUFDO0NBQUE7QUFFRCxHQUFHLEVBQUU7S0FDQSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUMvQixLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMifQ==